import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../utils/supabase/client';
import { Play, Pause, RotateCcw, Send, SkipForward, Volume2, VolumeX, BarChart3, X } from 'lucide-react';
import LiveLeaderboard from './LiveLeaderboard';
import Hls from 'hls.js';

interface Question {
  id: number;
  question_number: number;
  video_timestamp: number;
  question_text: string;
  correct_answer: number;
  tolerance_percentage: number;
  scene_start_time: number;
  scene_end_time: number;
}

interface CompetitionGameProps {
  participant: {
    id: string;
    email: string;
    display_name: string;
    total_score: number;
    current_question: number;
    questions_skipped: number;
  };
  onScoreUpdate: (newScore: number) => void;
  onParticipantUpdate: (participant: {
    id: string;
    email: string;
    display_name: string;
    total_score: number;
    current_question: number;
    questions_skipped: number;
  }) => void;
}

export default function CompetitionGame({ participant, onScoreUpdate, onParticipantUpdate }: CompetitionGameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answer, setAnswer] = useState('');
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [canReplay, setCanReplay] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Refresh participant data from database on mount (handles page reloads)
  useEffect(() => {
    const refreshParticipantData = async () => {
      try {
        const { data, error } = await supabase
          .from('competition_participants')
          .select('*')
          .eq('id', participant.id)
          .single();

        if (data && !error) {
          console.log('Refreshed participant data:', data);
          onParticipantUpdate({
            id: data.id,
            email: data.email,
            display_name: data.display_name || '',
            total_score: data.total_score,
            current_question: data.current_question,
            questions_skipped: data.questions_skipped
          });
        }
      } catch (error) {
        console.error('Error refreshing participant data:', error);
      }
    };

    refreshParticipantData();
  }, []); // Run once on mount

  // Initialize video streaming with HLS.js
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use the correct HLS Playlist URL from Bunny Stream
    const videoSrc = 'https://vz-fe810c2e-df1.b-cdn.net/d20b4fee-5118-405f-8416-390121b7506e/playlist.m3u8';
    
    console.log('Loading HLS video from:', videoSrc);

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90,
        maxBufferLength: 30,
        maxBufferSize: 60 * 1000 * 1000, // 60MB
      });
      
      hlsRef.current = hls;
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS manifest loaded successfully, video ready');
        setIsLoading(false);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log('Network error, trying to recover...');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('Media error, trying to recover...');
              hls.recoverMediaError();
              break;
            default:
              console.log('Fatal error, cannot recover');
              setIsLoading(false);
              setFeedback({ type: 'error', message: 'Video streaming error. Please refresh the page.' });
              break;
          }
        }
      });

      return () => {
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari native HLS support
      console.log('Using native HLS support (Safari)');
      video.src = videoSrc;
      
      const handleLoadedMetadata = () => {
        console.log('Video metadata loaded (Safari)');
        setIsLoading(false);
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    } else {
      console.error('HLS not supported in this browser');
      setIsLoading(false);
      setFeedback({ type: 'error', message: 'Your browser does not support video streaming.' });
    }
  }, []);

  // Update timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load questions on component mount
  useEffect(() => {
    loadQuestions();
  }, []);

  // Set up video event listeners - only when questions are loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video || questions.length === 0) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      
      // Check if we've reached the end of a scene for ANY question
      // Allow participants to answer questions regardless of their current_question value
      const questionAtTime = questions.find(q => 
        currentTime >= q.scene_end_time - 0.2 && 
        currentTime <= q.scene_end_time + 0.5
      );

      // Log when we're getting close to question time
      if (questionAtTime && currentTime > questionAtTime.scene_end_time - 5) {
        console.log('Approaching question time:', currentTime.toFixed(2), 'Target:', questionAtTime.scene_end_time);
      }

      if (questionAtTime) {
        console.log('Found question at time:', currentTime, 'Question:', questionAtTime.question_number, 'Scene end time:', questionAtTime.scene_end_time);
      }

      if (questionAtTime && !showQuestion) {
        console.log('Pausing video at time:', currentTime, 'for question:', questionAtTime.question_number);
        video.pause();
        setIsVideoPlaying(false);
        setCurrentQuestion(questionAtTime);
        setShowQuestion(true);
        setCanReplay(true);
        // Clear any previous answer
        setAnswer('');
        setAttemptNumber(1);
        setFeedback(null);
      }
    };

    const handleLoadedData = () => {
      console.log('Video loaded. Participant current question:', participant.current_question);
      console.log('Available questions:', questions.length);
      
      // For the first question, start from the beginning of the video (0 seconds)
      // to allow users to see the full scene from the start
      if (participant.current_question === 1) {
        console.log('Starting from beginning of video for first question');
        video.currentTime = 0;
        // Set the current question for proper state management
        const firstQuestion = questions.find(q => q.question_number === 1);
        if (firstQuestion) {
          setCurrentQuestion(firstQuestion);
        }
      } else {
        // For subsequent questions, set video to the current question's scene start time
        const currentQuestionData = questions.find(q => q.question_number === participant.current_question);
        if (currentQuestionData) {
          console.log('Setting video time to:', currentQuestionData.scene_start_time, 'for question:', currentQuestionData.question_number);
          video.currentTime = currentQuestionData.scene_start_time;
          // Ensure the current question is set for proper state management
          setCurrentQuestion(currentQuestionData);
        } else {
          console.log('No question found for current question number:', participant.current_question);
        }
      }
      setIsLoading(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadeddata', handleLoadedData);

    // If video is already loaded, trigger the loadeddata handler
    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [questions, showQuestion, participant.current_question]);

  const loadQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('competition_questions')
        .select('*')
        .order('question_number');

      if (error) throw error;
      console.log('Loaded questions:', data?.length || 0, 'questions');
      console.log('First few questions:', data?.slice(0, 3));
      console.log('Question 1 details:', data?.find(q => q.question_number === 1));
      console.log('Question 2 details:', data?.find(q => q.question_number === 2));
      setQuestions(data || []);
    } catch (error) {
      console.error('Error loading questions:', error);
      setFeedback({ type: 'error', message: 'Failed to load questions' });
    }
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsVideoPlaying(true);
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const replayScene = () => {
    const video = videoRef.current;
    if (!video || !currentQuestion) return;

    // Pause video first to ensure clean state
    video.pause();
    setIsVideoPlaying(false);
    
    // Set video to the start of the current scene
    video.currentTime = currentQuestion.scene_start_time;
    
    // Hide the question overlay and reset replay state
    setShowQuestion(false);
    setCanReplay(false);
    
    // Wait for video to seek to position, then play
    const handleSeeked = () => {
      video.removeEventListener('seeked', handleSeeked);
      video.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(console.error);
    };
    
    video.addEventListener('seeked', handleSeeked);
  };

  const submitAnswer = async () => {
    if (!currentQuestion || !answer.trim()) {
      setFeedback({ type: 'error', message: 'Please enter an answer' });
      return;
    }

    const numericAnswer = parseFloat(answer.trim());
    if (isNaN(numericAnswer)) {
      setFeedback({ type: 'error', message: 'Please enter a valid number' });
      return;
    }

    console.log('Submitting answer:', numericAnswer, 'for question', currentQuestion.question_number);
    console.log('Participant state:', { id: participant.id, current_question: participant.current_question, total_score: participant.total_score });

    // Show processing feedback
    setFeedback({ type: 'info', message: 'Submitting your answer...' });

    try {
      // Verify participant is authenticated
      if (!participant.id) {
        throw new Error('Not authenticated. Please refresh and login again.');
      }

      // Check if answer is correct (within tolerance)
      const tolerance = (currentQuestion.tolerance_percentage / 100) * currentQuestion.correct_answer;
      const isCorrect = Math.abs(numericAnswer - currentQuestion.correct_answer) <= tolerance;
      
      console.log('Answer check:', { isCorrect, tolerance, correctAnswer: currentQuestion.correct_answer });
      
      // Calculate points based on attempt number
      let points = 0;
      if (isCorrect) {
        points = Math.max(0, 6 - attemptNumber); // 5,4,3,2,1,0 points
      }

      console.log('Points earned:', points, 'on attempt', attemptNumber);

      // Try to insert answer - if it fails due to duplicate, that's okay
      const { error: insertError } = await supabase
        .from('competition_answers')
        .insert({
          participant_id: participant.id,
          question_id: currentQuestion.id,
          attempt_number: attemptNumber,
          points_earned: points,
          is_correct: isCorrect,
          is_skipped: false
        });

      if (insertError) {
        console.error('Answer insert error:', insertError);
        // If duplicate key error, just log and continue (user already answered)
        if (insertError.code === '23505' || insertError.message?.includes('duplicate')) {
          console.log('Answer already exists, continuing anyway');
        } else {
          // For other errors, still continue but log them
          console.error('Non-duplicate error, but continuing:', insertError);
        }
      } else {
        console.log('Answer saved successfully');
      }

      if (isCorrect) {
        // Update participant score - always add points for correct answer
        const newScore = participant.total_score + points;
        
        // Calculate next question: if current question answered is >= participant.current_question,
        // move to the next question. Otherwise, keep current_question as is (answering old questions)
        let nextQuestion = participant.current_question;
        if (currentQuestion.question_number >= participant.current_question) {
          nextQuestion = currentQuestion.question_number + 1;
        }

        console.log('Updating participant with new score:', newScore, 'next question:', nextQuestion);

        const { error: updateError } = await supabase
          .from('competition_participants')
          .update({
            total_score: newScore,
            current_question: nextQuestion,
            last_activity: new Date().toISOString()
          })
          .eq('id', participant.id);

        if (updateError) {
          console.error('Update error:', updateError);
          throw updateError;
        }

        // Check if competition is completed
        if (nextQuestion > 22) {
          setFeedback({ 
            type: 'success', 
            message: `Correct! +${points} points. Congratulations! You've completed all questions!` 
          });
          
          onScoreUpdate(newScore);
          
          const updatedParticipant = {
            ...participant,
            total_score: newScore,
            current_question: nextQuestion
          };
          onParticipantUpdate(updatedParticipant);
          
          // Show completion message and stop video
          setTimeout(() => {
            setShowQuestion(false);
            setAnswer('');
            setAttemptNumber(1);
            setFeedback({ 
              type: 'success', 
              message: 'Competition completed! Check the leaderboard to see your final ranking.' 
            });
            
            const video = videoRef.current;
            if (video) {
              video.pause();
              setIsVideoPlaying(false);
            }
          }, 3000);
          
          return;
        }

        setFeedback({ 
          type: 'success', 
          message: `Correct! +${points} points. Moving to next question...` 
        });

        onScoreUpdate(newScore);
        
        // Update participant state with new question number
        const updatedParticipant = {
          ...participant,
          total_score: newScore,
          current_question: nextQuestion
        };
        onParticipantUpdate(updatedParticipant);
        
        // Continue video after 2 seconds
        setTimeout(() => {
          setShowQuestion(false);
          setAnswer('');
          setAttemptNumber(1);
          setFeedback(null);
          
          const video = videoRef.current;
          if (video) {
            // Find the next question to jump to its scene start time
            const nextQuestionData = questions.find(q => q.question_number === nextQuestion);
            if (nextQuestionData) {
              video.currentTime = nextQuestionData.scene_start_time;
            }
            video.play();
            setIsVideoPlaying(true);
          }
        }, 2000);

      } else {
        if (attemptNumber >= 5) {
          // Max attempts reached, move to next question if this is current or ahead
          let nextQuestion = participant.current_question;
          if (currentQuestion.question_number >= participant.current_question) {
            nextQuestion = currentQuestion.question_number + 1;
          }

          const { error: updateError } = await supabase
            .from('competition_participants')
            .update({
              current_question: nextQuestion,
              last_activity: new Date().toISOString()
            })
            .eq('id', participant.id);

          if (updateError) {
            console.error('Update error on max attempts:', updateError);
            throw updateError;
          }

          // Check if competition is completed
          if (nextQuestion > 22) {
            setFeedback({ 
              type: 'error', 
              message: `Incorrect. Correct answer: ${currentQuestion.correct_answer}. Congratulations! You've completed all questions!` 
            });
            
            const updatedParticipant = {
              ...participant,
              current_question: nextQuestion
            };
            onParticipantUpdate(updatedParticipant);
            
            // Show completion message and stop video
            setTimeout(() => {
              setShowQuestion(false);
              setAnswer('');
              setAttemptNumber(1);
              setFeedback({ 
                type: 'success', 
                message: 'Competition completed! Check the leaderboard to see your final ranking.' 
              });
              
              const video = videoRef.current;
              if (video) {
                video.pause();
                setIsVideoPlaying(false);
              }
            }, 3000);
            
            return;
          }

          setFeedback({ 
            type: 'error', 
            message: `Incorrect. Correct answer: ${currentQuestion.correct_answer}. Moving to next question...` 
          });

          // Update participant state with new question number
          const updatedParticipant = {
            ...participant,
            current_question: nextQuestion
          };
          onParticipantUpdate(updatedParticipant);

          setTimeout(() => {
            setShowQuestion(false);
            setAnswer('');
            setAttemptNumber(1);
            setFeedback(null);
            
            const video = videoRef.current;
            if (video) {
              // Find the next question to jump to its scene start time
              const nextQuestionData = questions.find(q => q.question_number === nextQuestion);
              if (nextQuestionData) {
                video.currentTime = nextQuestionData.scene_start_time;
              }
              video.play();
              setIsVideoPlaying(true);
            }
          }, 3000);

        } else {
          // Allow another attempt
          setAttemptNumber(attemptNumber + 1);
          setFeedback({ 
            type: 'error', 
            message: `Incorrect. Try again! (Attempt ${attemptNumber + 1}/5)` 
          });
          setAnswer('');
        }
      }

    } catch (error) {
      console.error('Error submitting answer:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      console.error('Participant ID:', participant?.id);
      console.error('Question ID:', currentQuestion?.id);
      console.error('Attempt Number:', attemptNumber);
      
      // Don't block user - show error briefly then continue
      const errorMessage = error instanceof Error ? error.message : 'Error submitting answer';
      setFeedback({ type: 'error', message: errorMessage + '. Continuing anyway...' });
      
      // Continue video after brief pause
      setTimeout(() => {
        setShowQuestion(false);
        setAnswer('');
        setAttemptNumber(1);
        setFeedback(null);
        
        const video = videoRef.current;
        if (video) {
          video.play();
          setIsVideoPlaying(true);
        }
      }, 2000);
    }
  };

  const skipQuestion = async () => {
    if (!currentQuestion) return;

    console.log('Skipping question:', currentQuestion.question_number);
    console.log('Participant state:', { id: participant.id, current_question: participant.current_question, questions_skipped: participant.questions_skipped });

    // Show processing feedback
    setFeedback({ type: 'info', message: 'Skipping question...' });

    try {
      // Verify participant is authenticated
      if (!participant.id) {
        throw new Error('Not authenticated. Please refresh and login again.');
      }

      // Apply skip penalty if over limit
      let penaltyPoints = 0;
      if (participant.questions_skipped >= 3) {
        penaltyPoints = -1;
      }

      console.log('Skip penalty:', penaltyPoints, 'Skip count:', participant.questions_skipped);

      // Save skip record
      const { error: answerError } = await supabase
        .from('competition_answers')
        .insert({
          participant_id: participant.id,
          question_id: currentQuestion.id,
          attempt_number: 1,
          points_earned: penaltyPoints,
          is_correct: false,
          is_skipped: true
        });

      if (answerError) {
        console.error('Error saving skip record:', answerError);
        throw answerError;
      }

      // Update participant
      const newScore = participant.total_score + penaltyPoints;
      const nextQuestion = participant.current_question + 1;
      const newSkipCount = participant.questions_skipped + 1;

      console.log('Updating participant:', { newScore, nextQuestion, newSkipCount });

      const { error: updateError } = await supabase
        .from('competition_participants')
        .update({
          total_score: newScore,
          current_question: nextQuestion,
          questions_skipped: newSkipCount,
          last_activity: new Date().toISOString()
        })
        .eq('id', participant.id);

      if (updateError) {
        console.error('Error updating participant:', updateError);
        throw updateError;
      }

      console.log('Skip successful, moving to question', nextQuestion);

      // Check if competition is completed
      if (nextQuestion > 22) {
        const penaltyMessage = penaltyPoints < 0 ? ` (${penaltyPoints} penalty)` : '';
        setFeedback({ 
          type: 'info', 
          message: `Question skipped${penaltyMessage}. Congratulations! You've completed all questions!` 
        });
        
        onScoreUpdate(newScore);
        
        const updatedParticipant = {
          ...participant,
          total_score: newScore,
          current_question: nextQuestion,
          questions_skipped: newSkipCount
        };
        onParticipantUpdate(updatedParticipant);
        
        // Show completion message and stop video
        setTimeout(() => {
          setShowQuestion(false);
          setAnswer('');
          setAttemptNumber(1);
          setFeedback({ 
            type: 'success', 
            message: 'Competition completed! Check the leaderboard to see your final ranking.' 
          });
          
          const video = videoRef.current;
          if (video) {
            video.pause();
            setIsVideoPlaying(false);
          }
        }, 3000);
        
        return;
      }

      const penaltyMessage = penaltyPoints < 0 ? ` (${penaltyPoints} penalty)` : '';
      setFeedback({ 
        type: 'info', 
        message: `Question skipped${penaltyMessage}. Moving to next question...` 
      });

      onScoreUpdate(newScore);

      // Update participant state with new question number and skip count
      const updatedParticipant = {
        ...participant,
        total_score: newScore,
        current_question: nextQuestion,
        questions_skipped: newSkipCount
      };
      onParticipantUpdate(updatedParticipant);

      setTimeout(() => {
        setShowQuestion(false);
        setAnswer('');
        setAttemptNumber(1);
        setFeedback(null);
        
        const video = videoRef.current;
        if (video) {
          // Find the next question to jump to its scene start time
          const nextQuestionData = questions.find(q => q.question_number === nextQuestion);
          if (nextQuestionData) {
            video.currentTime = nextQuestionData.scene_start_time;
          }
          video.play();
          setIsVideoPlaying(true);
        }
      }, 2000);

    } catch (error) {
      console.error('Error skipping question:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      console.error('Participant ID:', participant?.id);
      console.error('Question ID:', currentQuestion?.id);
      
      // Show specific error message
      const errorMessage = error instanceof Error ? error.message : 'Failed to skip question. Please try again.';
      setFeedback({ type: 'error', message: errorMessage });
    }
  };

  const resetCompetition = async () => {
    if (!confirm('Are you sure you want to reset the competition? This will clear all your progress and start over.')) {
      return;
    }

    try {
      // Reset participant data
      const { error: updateError } = await supabase
        .from('competition_participants')
        .update({
          total_score: 0,
          questions_skipped: 0,
          current_question: 1,
          last_activity: new Date().toISOString()
        })
        .eq('id', participant.id);

      if (updateError) throw updateError;

      // Delete all previous answers
      const { error: deleteError } = await supabase
        .from('competition_answers')
        .delete()
        .eq('participant_id', participant.id);

      if (deleteError) throw deleteError;

      // Update local state
      onScoreUpdate(0);
      onParticipantUpdate({
        ...participant,
        total_score: 0,
        questions_skipped: 0,
        current_question: 1
      });

      // Reset video and UI state
      const video = videoRef.current;
      if (video) {
        const firstQuestion = questions.find(q => q.question_number === 1);
        if (firstQuestion) {
          video.currentTime = firstQuestion.scene_start_time;
        }
        video.pause();
        setIsVideoPlaying(false);
      }

      setShowQuestion(false);
      setCurrentQuestion(null);
      setAnswer('');
      setAttemptNumber(1);
      setFeedback({ type: 'success', message: 'Competition reset successfully! Starting from the beginning.' });
      setCanReplay(false);

      // Clear feedback after a delay
      setTimeout(() => {
        setFeedback(null);
      }, 3000);

    } catch (error) {
      console.error('Error resetting competition:', error);
      setFeedback({ type: 'error', message: 'Failed to reset competition' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-phiga-light to-phiga-accent/20 dark:from-phiga-dark dark:to-phiga-main">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-phiga-dark/80 backdrop-blur-sm rounded-lg p-4 mb-6 border border-phiga-accent/20">
          <div className="flex justify-between items-center text-phiga-light">
            <div>
              <h1 className="text-2xl font-bold">PHIGA Competition</h1>
              <p className="text-phiga-light/70">{participant.display_name}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Competition Timer */}
              <div className="text-center">
                <div className="text-lg font-bold text-phiga-accent">
                  {(() => {
                    const now = new Date(currentTime.toLocaleString("en-US", {timeZone: "Africa/Cairo"}));
                    
                    // Competition starts TODAY at 6 PM Cairo time
                    const startTime = new Date(now);
                    startTime.setHours(19, 0, 0, 0); // 7 PM TODAY Cairo time
                    
                    // Competition ends at 11:30 PM Cairo time (4 hours 30 minutes later)
                    const endTime = new Date(startTime);
                    endTime.setHours(23, 30, 0, 0); // 11:30 PM TODAY Cairo time
                    
                    if (now < startTime) {
                      const timeToStart = startTime.getTime() - now.getTime();
                      const hours = Math.floor(timeToStart / (1000 * 60 * 60));
                      const minutes = Math.floor((timeToStart % (1000 * 60 * 60)) / (1000 * 60));
                      const seconds = Math.floor((timeToStart % (1000 * 60)) / 1000);
                      return `Starts in: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    } else if (now < endTime) {
                      const timeRemaining = endTime.getTime() - now.getTime();
                      const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
                      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
                      return `Time Left: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    } else {
                      return "Competition Ended";
                    }
                  })()}
                </div>
                <div className="text-xs text-phiga-light/70">Cairo Time</div>
              </div>
              
              <button
                onClick={() => setShowLeaderboard(true)}
                className="flex items-center gap-2 bg-phiga-accent text-phiga-dark px-4 py-2 rounded-lg hover:bg-phiga-accent/80 transition-colors font-semibold"
              >
                <BarChart3 size={20} />
                Leaderboard
              </button>
              <div className="text-right">
                <div className="text-2xl font-bold text-phiga-accent">{participant.total_score} pts</div>
                <div className="text-sm text-phiga-light/70">
                  Question {participant.current_question}/22 | Skips: {participant.questions_skipped}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden mb-6 shadow-2xl">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-phiga-dark/80 z-10">
              <div className="text-phiga-light text-lg">Loading video...</div>
            </div>
          )}
          
          <video
            ref={videoRef}
            className="w-full aspect-video"
            preload="metadata"
            crossOrigin="anonymous"
            style={{ 
              backgroundColor: 'transparent',
              objectFit: 'contain'
            }}
            onLoadedData={() => {
              // Ensure video shows first frame when loaded
              const video = videoRef.current;
              if (video) {
                video.currentTime = 0.1; // Set to a small time to show first frame
              }
            }}
          />

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlayPause}
                className="text-white hover:text-phiga-accent transition-colors"
              >
                {isVideoPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <button
                onClick={toggleMute}
                className="text-white hover:text-phiga-accent transition-colors"
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Question Panel - Now positioned below video instead of overlay */}
        {showQuestion && currentQuestion && (
          <div className="bg-phiga-dark/95 backdrop-blur-sm rounded-lg p-6 border border-phiga-accent/20 mb-6 shadow-2xl">
            <div className="text-phiga-light">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-phiga-accent">
                  Question {currentQuestion.question_number}
                </h2>
                <div className="text-sm text-phiga-light/70">
                  Attempt {attemptNumber}/5
                </div>
              </div>

              <div className="mb-6">
                <p className="text-phiga-light/90 leading-relaxed whitespace-pre-wrap">
                  {currentQuestion.question_text}
                </p>
              </div>

              {feedback && (
                <div className={`mb-4 p-3 rounded-md ${
                  feedback.type === 'success' ? 'bg-green-500/20 text-green-300' :
                  feedback.type === 'error' ? 'bg-red-500/20 text-red-300' :
                  'bg-blue-500/20 text-blue-300'
                }`}>
                  {feedback.message}
                </div>
              )}

              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="number"
                    step="any"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter your numerical answer"
                    className="w-full px-4 py-2 bg-phiga-light/10 border border-phiga-accent/30 rounded-md text-phiga-light placeholder-phiga-light/50 focus:outline-none focus:border-phiga-accent"
                    onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                  />
                </div>
                
                <button
                  onClick={submitAnswer}
                  disabled={!answer.trim()}
                  className="flex items-center gap-2 bg-phiga-accent text-phiga-dark px-6 py-2 rounded-md hover:bg-phiga-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                  Submit
                </button>
                
                <button
                  onClick={skipQuestion}
                  className="flex items-center gap-2 bg-phiga-light/20 text-phiga-light px-4 py-2 rounded-md hover:bg-phiga-light/30 transition-colors"
                >
                  <SkipForward size={16} />
                  Skip
                </button>
              </div>

              {participant.questions_skipped >= 3 && (
                <div className="mt-3 text-sm text-yellow-300">
                  ⚠️ Warning: Additional skips will result in -1 point penalty
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-phiga-dark rounded-lg border border-phiga-accent/20 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-phiga-accent/20">
              <h2 className="text-xl font-bold text-phiga-accent">Live Leaderboard</h2>
              <button
                onClick={() => setShowLeaderboard(false)}
                className="text-phiga-light hover:text-phiga-accent transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-80px)]">
              <LiveLeaderboard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
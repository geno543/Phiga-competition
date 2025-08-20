import React, { useState, useEffect } from 'react';
import { FiUsers, FiKey, FiMail, FiCheck, FiX, FiEye, FiRefreshCw, FiDownload } from 'react-icons/fi';
import { supabase } from '../utils/supabase/client';
import { generateUniqueCode } from '../utils/codeGenerator';
import { sendCompetitionCodeEmail } from '../utils/emailService';

interface Registration {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  country: string;
  school?: string;
  grade_level?: string;
  physics_experience?: string;
  motivation?: string;
  competition_code?: string;
  code_generated_at?: string;
  registration_status: string;
}

const Admin: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'pending' | 'approved' | 'all'>('pending');
  const [generatingCodes, setGeneratingCodes] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    withCodes: 0
  });

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRegistrations(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: Registration[]) => {
    const stats = {
      total: data.length,
      pending: data.filter(r => r.registration_status === 'pending').length,
      approved: data.filter(r => r.registration_status === 'approved').length,
      withCodes: data.filter(r => r.competition_code).length
    };
    setStats(stats);
  };

  const generateCodeForUser = async (userId: string) => {
    setGeneratingCodes(prev => new Set(prev).add(userId));
    
    try {
      const code = await generateUniqueCode(supabase);
      
      const { error } = await supabase
        .from('registrations')
        .update({ 
          competition_code: code,
          code_generated_at: new Date().toISOString(),
          registration_status: 'approved'
        })
        .eq('id', userId);

      if (error) throw error;

      // Refresh the data
      await fetchRegistrations();
      
      // Send email with the competition code
      const user = registrations.find(r => r.id === userId);
      if (user) {
        const emailSent = await sendCompetitionCodeEmail(
          `${user.first_name} ${user.last_name}`,
          user.email,
          code
        );
        
        if (emailSent) {
          console.log(`✅ Code ${code} generated and email sent to ${user.email}`);
        } else {
          console.warn(`⚠️ Code ${code} generated but email failed for ${user.email}`);
        }
      }
      
    } catch (error) {
      console.error('Error generating code:', error);
      alert('Failed to generate code. Please try again.');
    } finally {
      setGeneratingCodes(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const updateRegistrationStatus = async (userId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('registrations')
        .update({ registration_status: status })
        .eq('id', userId);

      if (error) throw error;
      await fetchRegistrations();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Country', 'School', 'Status', 'Code', 'Registration Date'];
    const csvData = registrations.map(reg => [
      `${reg.first_name} ${reg.last_name}`,
      reg.email,
      reg.country,
      reg.school || '',
      reg.registration_status,
      reg.competition_code || '',
      new Date(reg.created_at).toLocaleDateString()
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `phiga-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredRegistrations = registrations.filter(reg => {
    if (selectedTab === 'pending') return reg.registration_status === 'pending';
    if (selectedTab === 'approved') return reg.registration_status === 'approved';
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-phiga-dark via-phiga-main to-phiga-accent flex items-center justify-center">
        <div className="text-white text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-phiga-dark via-phiga-main to-phiga-accent p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">PHIGA Admin Dashboard</h1>
          <p className="text-phiga-light/80">Manage registrations and competition access codes</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-phiga-light/80 text-sm">Total Registrations</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <FiUsers className="text-phiga-accent" size={32} />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-phiga-light/80 text-sm">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <FiEye className="text-yellow-400" size={32} />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-phiga-light/80 text-sm">Approved</p>
                <p className="text-3xl font-bold text-green-400">{stats.approved}</p>
              </div>
              <FiCheck className="text-green-400" size={32} />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-phiga-light/80 text-sm">Codes Generated</p>
                <p className="text-3xl font-bold text-phiga-accent">{stats.withCodes}</p>
              </div>
              <FiKey className="text-phiga-accent" size={32} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Tabs */}
            <div className="flex gap-2">
              {(['all', 'pending', 'approved'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTab === tab
                      ? 'bg-phiga-accent text-phiga-dark'
                      : 'text-phiga-light hover:bg-white/10'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={fetchRegistrations}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                <FiRefreshCw size={16} />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-phiga-accent text-phiga-dark rounded-lg hover:bg-phiga-light transition-colors"
              >
                <FiDownload size={16} />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 text-phiga-light font-medium">Participant</th>
                  <th className="text-left p-4 text-phiga-light font-medium">Contact</th>
                  <th className="text-left p-4 text-phiga-light font-medium">School</th>
                  <th className="text-left p-4 text-phiga-light font-medium">Status</th>
                  <th className="text-left p-4 text-phiga-light font-medium">Code</th>
                  <th className="text-left p-4 text-phiga-light font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.id} className="border-t border-white/10 hover:bg-white/5">
                    <td className="p-4">
                      <div>
                        <p className="text-white font-medium">
                          {registration.first_name} {registration.last_name}
                        </p>
                        <p className="text-phiga-light/60 text-sm">{registration.country}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-white text-sm">{registration.email}</p>
                        <p className="text-phiga-light/60 text-sm">{registration.phone_number}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-white text-sm">{registration.school || 'N/A'}</p>
                      <p className="text-phiga-light/60 text-sm">{registration.grade_level || ''}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        registration.registration_status === 'approved'
                          ? 'bg-green-500/20 text-green-400'
                          : registration.registration_status === 'rejected'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {registration.registration_status}
                      </span>
                    </td>
                    <td className="p-4">
                      {registration.competition_code ? (
                        <span className="font-mono text-phiga-accent font-medium">
                          {registration.competition_code}
                        </span>
                      ) : (
                        <span className="text-phiga-light/60 text-sm">No code</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {registration.registration_status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateRegistrationStatus(registration.id, 'approved')}
                              className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                              title="Approve"
                            >
                              <FiCheck size={16} />
                            </button>
                            <button
                              onClick={() => updateRegistrationStatus(registration.id, 'rejected')}
                              className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                              title="Reject"
                            >
                              <FiX size={16} />
                            </button>
                          </>
                        )}
                        {registration.registration_status === 'approved' && !registration.competition_code && (
                          <button
                            onClick={() => generateCodeForUser(registration.id)}
                            disabled={generatingCodes.has(registration.id)}
                            className="flex items-center gap-1 px-3 py-1 bg-phiga-accent/20 text-phiga-accent rounded-lg hover:bg-phiga-accent/30 transition-colors disabled:opacity-50 text-sm"
                          >
                            {generatingCodes.has(registration.id) ? (
                              <div className="w-4 h-4 border-2 border-phiga-accent/30 border-t-phiga-accent rounded-full animate-spin"></div>
                            ) : (
                              <FiKey size={14} />
                            )}
                            Generate Code
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredRegistrations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-phiga-light/60">No registrations found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
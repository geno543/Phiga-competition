/**
 * Utility functions for generating unique competition codes
 */

/**
 * Generates a random 8-character alphanumeric code
 * @returns {string} Random competition code
 */
export const generateCompetitionCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

/**
 * Generates a unique competition code by checking against existing codes in database
 * @param {any} supabase - Supabase client instance
 * @returns {Promise<string>} Unique competition code
 */
export const generateUniqueCode = async (supabase: any): Promise<string> => {
  let code: string;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 10;
  
  do {
    code = generateCompetitionCode();
    
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('competition_code')
        .eq('competition_code', code)
        .single();
      
      // If no data found, code is unique
      isUnique = !data || error;
      attempts++;
      
      if (attempts >= maxAttempts) {
        throw new Error('Unable to generate unique code after maximum attempts');
      }
    } catch (error: any) {
      // If error is because no matching record found, code is unique
      if (error.code === 'PGRST116') {
        isUnique = true;
      } else {
        throw error;
      }
    }
  } while (!isUnique);
  
  return code;
};

/**
 * Validates a competition code format
 * @param {string} code - Code to validate
 * @returns {boolean} True if code format is valid
 */
export const validateCodeFormat = (code: string): boolean => {
  const codeRegex = /^[A-Z0-9]{8}$/;
  return codeRegex.test(code.toUpperCase());
};

/**
 * Formats a code input (converts to uppercase, removes spaces)
 * @param {string} input - Raw input string
 * @returns {string} Formatted code
 */
export const formatCodeInput = (input: string): string => {
  return input.replace(/\s/g, '').toUpperCase().slice(0, 8);
};
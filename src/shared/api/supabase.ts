import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL || 'https://tcnbedppcgsoatcipnks.supabase.co';
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY || 'MISSING_KEY';

if (supabaseKey === 'MISSING_KEY') {
  console.warn('Supabase key is missing! Please set VUE_APP_SUPABASE_KEY in .env file.');
} else {
  console.log('Supabase Initialized:', supabaseUrl, supabaseKey.substring(0, 10) + '...');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

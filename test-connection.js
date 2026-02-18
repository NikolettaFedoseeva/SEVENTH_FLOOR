const { createClient } = require('@supabase/supabase-js');

// Hardcoded keys from .env for testing
const supabaseUrl = 'https://jdwmidhlsjtfhphluqfi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impkd21pZGhsc2p0ZmhwaGx1cWZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MTUwNjMsImV4cCI6MjA1NTM5MTA2M30.K-S7sCtl8-o7tXk-E-G-W-a-n-t-e-d';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing connection to:', supabaseUrl);
  try {
    const { data, error } = await supabase.from('properties').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Connection Failed:', error.message);
      console.error('Details:', error);
    } else {
      console.log('Connection Successful!');
      console.log('Properties count:', data); // data is null for head:true usually, count is in count property
    }
  } catch (err) {
    console.error('Unexpected Error:', err.message);
  }
}

testConnection();

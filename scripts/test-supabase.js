const fetch = require('node-fetch');
global.fetch = fetch;
global.Headers = fetch.Headers;

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tcnbedppcgsoatcipnks.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjbmJlZHBwY2dzb2F0Y2lwbmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MTEwMTMsImV4cCI6MjA4Njk4NzAxM30.qSUZ_ooEsGP-j3wJyu5Ta-WXKlEh2-FcsyjekytreIU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  console.log('URL:', supabaseUrl);
  // Mask key for safety in logs, but we use the real one above
  console.log('Key:', supabaseKey.substring(0, 10) + '...');

  const { data, error } = await supabase
    .from('properties')
    .select('id, title')
    .limit(1);

  if (error) {
    console.error('Connection FAILED:', error.message);
    if (error.hint) console.error('Hint:', error.hint);
  } else {
    console.log('Connection SUCCESS!');
    console.log('Data received:', data);
  }
}

testConnection();

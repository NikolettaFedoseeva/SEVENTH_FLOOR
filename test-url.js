const https = require('https');

const supabaseUrl = 'jdwmidhlsjtfhphluqfi.supabase.co'; // without https://
const path = '/rest/v1/'; // Ping the REST API root

const options = {
  hostname: supabaseUrl,
  port: 443,
  path: path,
  method: 'GET',
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impkd21pZGhsc2p0ZmhwaGx1cWZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MTUwNjMsImV4cCI6MjA1NTM5MTA2M30.K-S7sCtl8-o7tXk-E-G-W-a-n-t-e-d',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impkd21pZGhsc2p0ZmhwaGx1cWZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4MTUwNjMsImV4cCI6MjA1NTM5MTA2M30.K-S7sCtl8-o7tXk-E-G-W-a-n-t-e-d'
  }
};

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();

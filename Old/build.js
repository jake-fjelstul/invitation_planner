const fs = require('fs');
const path = require('path');

// Ensure the dist directory exists
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Read index.html
let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Get credentials from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (supabaseUrl) {
  console.log('Injecting SUPABASE_URL...');
  html = html.replace(/let SUPABASE_URL\s*=\s*"[^"]*"/, `let SUPABASE_URL      = "${supabaseUrl}"`);
} else {
  console.warn('Warning: SUPABASE_URL env variable not found.');
}

if (supabaseKey) {
  console.log('Injecting SUPABASE_ANON_KEY...');
  html = html.replace(/let SUPABASE_ANON_KEY\s*=\s*"[^"]*"/, `let SUPABASE_ANON_KEY = "${supabaseKey}"`);
} else {
  console.warn('Warning: SUPABASE_ANON_KEY env variable not found.');
}

// Write the compiled index.html to dist/
fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
console.log('Build completed: Compiled output written to dist/index.html');

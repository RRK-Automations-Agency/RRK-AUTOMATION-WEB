import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: sData, error: sErr } = await supabase.from('services').select('*').limit(1);
  console.log('Services Sample:', sData, sErr);

  const { data: pData, error: pErr } = await supabase.from('pricing_plans').select('*').limit(1);
  console.log('Pricing Sample:', pData, pErr);
}
check();

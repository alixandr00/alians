import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yqqanelvkifakndsjujz.supabase.co'
const supabaseAnonKey = 'sb_publishable_lLPhJB656TOyUp1JzpsjEQ_edX-fZcY'


export const supabase = createClient(supabaseUrl, supabaseAnonKey)
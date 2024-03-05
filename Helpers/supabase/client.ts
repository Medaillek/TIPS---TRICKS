import { createBrowserClient } from '@supabase/ssr'
import { env } from '../env/server'
import { Database } from './database.types'

export const createClient = () =>
	createBrowserClient<Database>(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	)

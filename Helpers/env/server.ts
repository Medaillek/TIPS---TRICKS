import { z } from 'zod'

const envSchema = z.object({
	NEXT_PUBLIC_URL: z.string({ required_error: 'URL is required' }).min(1),
})

const rawEnv = envSchema.safeParse(process.env)

if (!rawEnv.success) {
	console.error(rawEnv.error)
	process.exit(1)
}

export const env = rawEnv.data

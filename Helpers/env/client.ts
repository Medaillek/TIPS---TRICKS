import z from 'zod'

const clientEnvSchema = z.object({
	NEXT_PUBLIC_URL: z.string({ requiredError: 'URL is required' }).min(1),
})

export const env = clientEnvSchema.parse({
	NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
})

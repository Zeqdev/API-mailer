import z from 'zod'

export const MailSchema = z.object({
	name: z.string().min(3).max(25),
	email: z.string().email(),
	country: z.string().min(3).max(25),
	subject: z.string().min(3).max(50),
	message: z.string().min(10).max(500),
})

export const validateMail = (data: any) => {
	return MailSchema.safeParse(data)
}

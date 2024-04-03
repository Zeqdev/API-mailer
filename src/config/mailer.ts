import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

interface Mailer {
	host: string
	port: number
	secure: boolean
	auth: {
		user: string
		pass: string
	}
}

export const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: parseInt(process.env.MAIL_PORT!),
	secure: true,
	auth: {
		user: process.env.MAIL_AGENT,
		pass: process.env.MAIL_PASS,
	},
} as Mailer)

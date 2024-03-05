import nodemailer from 'nodemailer'
import { env } from '../env/server'

export const transporter = nodemailer.createTransport({
	//@ts-ignore
	host: env.SMTP_HOST,
	port: env.SMTP_PORT,
	secureConnection: false, // TLS requires secureConnection to be false
	auth: {
		user: env.SMTP_USER + '@' + env.DOMAIN,
		pass: env.SMTP_PASSWORD,
	},
	tls: {
		ciphers: 'SSLv3',
	},
})

import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { validateMail } from '../schemas/mail'
import { transporter } from '../config/mailer'

dotenv.config({ path: './.env' })

export class MailController {
	static async sendMail(request: Request, response: Response) {
		try {
			const data = validateMail({
				name: request.body.name,
				email: request.body.email,
				country: request.body.country,
				subject: request.body.subject,
				message: request.body.message,
			})

			if (data.success === false) {
				return response.status(400).json({
					success: false,
					message: data,
				})
			}

			transporter.sendMail({
				from: `"AGENT" <${process.env.MAIL_AGENT}>`,
				to: process.env.MAIL_AGENT,
				subject: request.body.subject,
				html: `
							<head>
								<meta charset="UTF-8">
								<meta name="viewport" content="width=device-width, initial-scale=1.0">
								<title>Correo de Contacto</title>
								<style>
								body {
									font-family: Arial, sans-serif;
									background-color: #f4f4f4;
									padding: 20px;
								}
								.container {
									max-width: 600px;
									margin: 0 auto;
									background-color: #fff;
									border-radius: 8px;
									padding: 20px;
									box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
								}
								h1 {
									color: #333;
								}
								.info {
									margin-bottom: 20px;
								}
								.info p {
									margin: 5px 0;
								}
								.message {
									margin-top: 20px;
								}
								</style>
							</head>
							<body>
								<div class="container">
								<h1>Detalles del Contacto</h1>
								<div class="info">
								<p><strong>Nombre: </strong> ${request.body.name}</p>
								<p><strong>Email: </strong> ${request.body.email}</p>
								<p><strong>Pais: </strong> ${request.body.country}</p>
								</div>
								<div class="message">
									<h2>Mensaje:</h2>
									<p>${request.body.message}</p>
								</div>
								</div>
							</body>  
                        `,
			})

			return response.status(200).json({
				success: true,
				message: '¡Mail sent successfully!',
			})
		} catch (error: any) {
			return response.status(500).json({
				success: false,
				message: error.message,
			})
		}
	}
}

import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import mailRouter from './routes/mails'

dotenv.config({ path: './.env' })

const app = express()

// app.use(
// 	cors({
// 		origin: (origin, callback) => {
// 			const allowedOrigins = [
// 				'https://example.com',
// 			]

// 			if (!origin) return callback(null, true)

// 			if (allowedOrigins.includes(origin)) {
// 				return callback(null, true)
// 			} else {
// 				const message = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`

// 				return callback(new Error(message), false)
// 			}
// 		},
// 		credentials: true,
// 	})
// )

app.use(cors())
app.use(express.json())
app.disable('x-powered-by')

app.use('/api/mailer', mailRouter)

app.listen(parseInt(process.env.PORT!), '0.0.0.0', () => {
	console.log(`Server is running`)
})

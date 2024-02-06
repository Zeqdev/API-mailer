import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config({ path: './.env' })

const app = express()

app.use(cors())
app.use(express.json())
app.disable('x-powered-by')

app.listen(parseInt(process.env.PORT!), '0.0.0.0', () => {
	console.log(`Server is running`)
})

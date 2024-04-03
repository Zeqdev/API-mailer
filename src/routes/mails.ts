import { Router } from 'express'
import { MailController } from '../controllers/mails'

const router = Router()

router.post('/', MailController.sendMail)

export default router

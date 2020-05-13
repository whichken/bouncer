import fs from 'fs'
import { Application, Router } from 'express'
import jwt from 'jsonwebtoken'

if (!fs.existsSync('/workspace/private.pem')) throw new Error('Missing private key.')
if (!fs.existsSync('/workspace/public.pem')) throw new Error('Missing public key.')

const privateKey = fs.readFileSync('/workspace/private.pem')

export function register(app: Application) {
  const router = Router()

  // Expose the public key so others can verify our tokens
  router.get('/public.key', (_req, res) => res.sendFile('/workspace/public.pem'))

  // JWT test route
  router.post('/', (_req, res) => {
    const token = jwt.sign({ test: true }, privateKey, { algorithm: 'RS256' })
    return res.json({ token })
  })

  app.use('/auth', router)
}

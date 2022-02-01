import { Router } from 'express'
import { hello } from '../controllers/hello.controller'

const router = Router()

/**
 * @swagger
 * /hello:
 *  get:
 *    summary: Hello Get Endpoint
 *    description: Retrive hello message
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Hello'
 */
router.get('/hello', hello)

export default router

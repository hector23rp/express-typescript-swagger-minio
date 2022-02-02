import { Router } from 'express'
import { getMultimedia, postMultimedia } from '../controllers/multimedia.controller'

const router = Router()

/**
 * @swagger
 * /multimedia:
 *  get:
 *    summary: Multimedia Get Endpoint
 *    description: Retrive Multimedia message
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: 'array'
 *              items:
 *                schema:
 *                  $ref: '#/components/schemas/Multimedia'
 */
router.get('/multimedia', getMultimedia)

/**
 * @swagger
 * /multimedia:
 *  post:
 *    summary: Upload a new multimedia file
 *    description: Upload a new multimedia file
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              file:
 *                type: string
 *                format: binary
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Multimedia'
 */
router.post('/multimedia', postMultimedia)

export default router

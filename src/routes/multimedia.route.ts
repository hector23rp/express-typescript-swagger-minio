import { Router } from 'express'
import { getMultimedia } from '../controllers/multimedia.controller'

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

export default router

import { Router } from 'express'
import { deleteMultimedia, getMultimedia, postMultimedia } from '../controllers/multimedia.controller'

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

/**
 * @swagger
 * /multimedia/{name}:
 *  parameters:
 *  - name: name
 *    in: path
 *    required: true
 *    description: file name
 *    schema:
 *      type: string
 *  delete:
 *    summary: Retrieve a message if it was removed correctly
 *    description: Retrieve a message if it was removed correctly
 *    responses:
 *      200:
 *        description: It the document was removed
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      500:
 *        description: It cannot be able to remove the file
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GeneralError'
 */
router.delete('/multimedia/:name', deleteMultimedia)

export default router

import { Request, Response } from 'express'
import { getFiles } from '../services/minio.service'

export const getMultimedia = async (req: Request, res: Response) => {
  const files = await getFiles()
  res.send(files)
}

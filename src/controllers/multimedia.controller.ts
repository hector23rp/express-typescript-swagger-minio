import { Request, Response } from 'express'
import { getFiles, uploadFile } from '../services/minio.service'

export const getMultimedia = async (req: Request, res: Response) => {
  const files = await getFiles()
  res.send(files)
}

export const postMultimedia = async (req: Request, res: Response) => {
  const info = await uploadFile(req)
  res.send(info)
}

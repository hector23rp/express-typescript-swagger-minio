import { Request, Response } from 'express'
import { deleteFile, getFiles, uploadFile } from '../services/minio.service'

export const getMultimedia = async (req: Request, res: Response) => {
  const files = await getFiles()
  res.send(files)
}

export const postMultimedia = async (req: Request, res: Response) => {
  const info = await uploadFile(req)
  res.send(info)
}

export const deleteMultimedia = async (req: Request, res: Response) => {
  const { name } = req.params
  try {
    await deleteFile(name)
    res.send({ message: 'File removed' })
  } catch (error) {
    res.status(500).send({ code: 500, message: error })
  }
}

import * as Minio from 'minio'
import { Multimedia } from '../types'

const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'ADMINUSER2143542',
  secretKey: 'd321c411-1a9b-460b-8259-194be048f505'
})

const minioBucket = 'minio-store'

const { protocol, host, port } = minioClient as any

/**
 * Create a bucket in Minio.io if not exists
 * @returns Promise<void>
 */
export const createBucket = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if exists
    minioClient.bucketExists(minioBucket, (err, exists) => {
      if (err) {
        reject(err)
      }
      if (!err && !exists) {
        console.log('Creating bucket ', minioBucket)
        minioClient.makeBucket(minioBucket, '').then(resolve).catch(reject)
      }
      resolve()
    })
  })
}

/**
 * Get all files saved in Minio.io
 * @returns Promise<Multimedia[]>
 */
export const getFiles = (): Promise<Multimedia[]> => {
  return new Promise((resolve, reject) => {
    const files: Multimedia[] = []
    const stream = minioClient.listObjects(minioBucket, '', true)
    stream.on('data', function (item) {
      const url = protocol + '//' + host + ':' + port + '/' + minioBucket + '/' + item.name
      const file = {
        url,
        ...item
      }
      files.push(file)
    })
    stream.on('error', function (e) {
      reject(e)
    })
    stream.on('end', function () {
      resolve(files)
    })
  })
}

export const uploadFile = (req: any): Promise<Minio.UploadedObjectInfo> => {
  console.log('Uploading file to Minio.io...')
  return new Promise((resolve, reject) => {
    req.pipe(req.busboy)
    req.busboy.on('file', (_fieldname: string, file: any, { filename }: { filename: string }) => {
      minioClient.putObject(minioBucket, filename, file, 0, (err, info) => {
        if (err) {
          reject(err)
          return
        }
        console.log('File uploaded: ', info)
        resolve(info)
      })
    })
    req.busboy.on('error', reject)
  })
}

/**
 * Remove a File from Minio.io
 * @param fileName string. File name that wants remove
 * @returns Promise<void>
 */
export const deleteFile = (fileName: string): Promise<void> => {
  return minioClient.removeObject(minioBucket, fileName)
}

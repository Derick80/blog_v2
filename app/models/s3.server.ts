import type { UploadHandler } from '@remix-run/node'
import {
  unstable_parseMultipartFormData,
  writeAsyncIterableToWritable
} from '@remix-run/node'
import AWS from 'aws-sdk'
import { PassThrough } from 'stream'

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_REGION, BUCKET_NAME } =
  process.env

if (!(ACCESS_KEY_ID && SECRET_ACCESS_KEY && BUCKET_REGION && BUCKET_NAME)) {
  throw new Error(`Storage is missing required configuration.`)
}

const uploadStream = ({ Key }: Pick<AWS.S3.Types.PutObjectRequest, 'Key'>) => {
  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY
    },
    region: BUCKET_REGION
  })
  const pass = new PassThrough()
  return {
    writeStream: pass,
    promise: s3
      .upload({
        Bucket: BUCKET_NAME,
        Key,
        Body: pass
      })
      .promise()
  }
}

export async function uploadStreamToS3(data: any, filename: string) {
  const stream = uploadStream({
    Key: filename
  })
  await writeAsyncIterableToWritable(data, stream.writeStream)
  const file = await stream.promise
  return file.Location
}

export const s3UploadHandler: UploadHandler = async ({
  name,
  filename,
  data
}) => {
  if (name !== 'imageUrl') {
    return undefined
  }
  const uploadedFileLocation = await uploadStreamToS3(data, filename!)
  return uploadedFileLocation
}

const s3Client = new AWS.S3({
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
  },
  region: BUCKET_REGION
})

export const bucketItems = async () => {
  try {
    const data = await s3Client
      .listObjectsV2({ Bucket: 'dchtravelbucket' })
      .promise()
    return data
  } catch (err) {
    console.log(err)
  }
}

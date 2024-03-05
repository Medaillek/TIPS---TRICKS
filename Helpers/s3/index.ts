import {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
} from '@aws-sdk/client-s3'

import { Readable } from 'stream'
import { env } from '../env/server'

export const s3Client = new S3Client({
	credentials: {
		accessKeyId: env.S3_ACCESS_KEY_ID,
		secretAccessKey: env.S3_SECRET_ACCESS_KEY,
	},
	region: 'eu-west-1',
})

export const uploadBase64toS3 = async (base64: string, name: string) => {
	const mime = base64.split(';')[0].split(':')[1]
	const blob = new Blob([base64], { type: mime })
	const arrayBuffer = await blob.arrayBuffer()

	const object = new PutObjectCommand({
		Bucket: env.AWS_BUCKET_NAME,
		Key: name,
		ContentType: mime,
		Body: arrayBuffer as Uint8Array,
		ContentEncoding: 'base64',
	})

	const response = await s3Client.send(object)
	return response
}

export function getObjectToBase64(
	Bucket: string,
	Key: string
): Promise<string> {
	return new Promise(async (resolve, reject) => {
		const getObjectCommand = new GetObjectCommand({ Bucket, Key })

		try {
			const response = await s3Client.send(getObjectCommand)
			const body = response.Body as Readable

			// base64 response format eg : datatext/csvbase64Rm
			// split the base64 response to get the base64 string
			// get the
			// Store all of data chunks returned from the response data stream
			// into an array then use Array#join() to use the returned contents as a String
			let responseDataChunks: string[] = []
			// Handle an error while streaming the response body
			body.once('error', (err) => reject(err))

			// Attach a 'data' listener to add the chunks of data to our array
			// Each chunk is a Buffer instance
			body.on('data', (chunk) => responseDataChunks.push(chunk))

			// Once the stream has no more data, join the chunks into a string and return the string
			body.once('end', () => resolve(responseDataChunks.join('')))
		} catch (err) {
			// Handle the error or throw
			return reject(err)
		}
	})
}

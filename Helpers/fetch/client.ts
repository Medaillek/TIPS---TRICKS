import { NextResponseResult } from './server'

type FetchApiProps<T> =
	| ({
			method?: 'POST' | 'GET' | 'PATCH' | 'DELETE'
	  } & { method: 'POST' | 'PATCH' | 'DELETE'; body: T })
	| { method: 'GET' }

/**
 * @param endPoint The endpoint to fetch /api/v1/ENDPOINT
 *
 */
export async function fetchApi<T>(
	endPoint: string,
	reqParams: FetchApiProps<unknown>
) {
	let body: string | undefined = undefined
	if (reqParams.method === 'POST' || reqParams.method === 'PATCH') {
		body =
			typeof reqParams.body === 'string'
				? reqParams.body
				: JSON.stringify(reqParams.body)
	}

	const response = await fetch(`/api/v1/${endPoint}`, {
		method: reqParams.method ?? 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Accept-Charset': 'UTF-8',
		},
		body: body,
	})

	const json = await response.json()
	return json as NextResponseResult<T>
}

import { NextResponse } from 'next/server'
import { ZodObject, z } from 'zod'

type NextSuccessResponse<T> = {
	data: T
	error: false
}

type NextErrorResponse = {
	data: null
	error: true
	errorMessage: string
}

export type NextResponseResult<T> = NextSuccessResponse<T> | NextErrorResponse

export function NextSuccess<T>(data: T) {
	return NextResponse.json<NextSuccessResponse<T>>(
		{ data: data, error: false },
		{ status: 200 }
	)
}

export function NextError(statusCode: number, errorMessage: string) {
	return NextResponse.json<NextErrorResponse>(
		{
			data: null,
			error: true,
			errorMessage: errorMessage,
		},
		{
			status: statusCode,
			statusText: errorMessage,
			headers: {
				'Content-Type': 'application/json',
				'Accept-Charset': 'UTF-8',
			},
		}
	)
}

type BodyParseResult<T> =
	| {
			data: T
			error: null
	  }
	| {
			data: null
			error: {
				message: string
				status: number
			}
	  }

export async function parseRequest<T extends z.ZodObject<any, any, any, any>>(
	req: Request,
	schema: T
): Promise<BodyParseResult<z.infer<typeof schema>>> {
	try {
		const body = await req.json()
		return {
			data: schema.parse(body),
			error: null,
		}
	} catch (e) {
		if (e instanceof z.ZodError) {
			return {
				data: null,
				error: {
					message: e.errors.map((err) => err.message).join(','),
					status: 400,
				},
			}
		}
		return {
			data: null,
			error: {
				message: 'Internal server error',
				status: 500,
			},
		}
	}
}

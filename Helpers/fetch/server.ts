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

type SuccessParseResult<T> = {
	error: false
	data: T
	json: Record<string, unknown>
}

type ErrorParseResult = {
	error: true
	errorMessage: string
	data: null
}

export type ParseResult<T> = SuccessParseResult<T> | ErrorParseResult

export async function parseRequest<T extends ZodObject<any, any>>(
	req: Request,
	schema: T
): Promise<ParseResult<z.infer<T>>> {
	try {
		const rawJson = await req.json()
		const parsed = schema.safeParse(rawJson)
		if (parsed.success) {
			return {
				error: false,
				data: parsed.data as z.infer<typeof schema>,
				json: rawJson,
			}
		} else {
			return {
				error: true,
				errorMessage: 'Invalid JSON',
				data: null,
			}
		}
	} catch (error) {
		console.error(error)
		return { error: true, errorMessage: 'Invalid JSON', data: null }
	}
}

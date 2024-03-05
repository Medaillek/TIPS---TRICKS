import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Control, ControllerRenderProps, FieldValues } from 'react-hook-form'
import { cn } from '@/lib/utils'

type StyledFormFieldClassNames = {
	label?: string
	description?: string
	item?: string
}

type StyledFormFieldProps<T extends Record<string, any>> = {
	control: Control<T, any, T>
	name: keyof T
	description?: React.ReactNode
	label?: React.ReactNode
	classNames?: StyledFormFieldClassNames
	children?: React.ReactNode
	asChild?: boolean

	render?: ({
		field,
	}: {
		field: ControllerRenderProps<T>
	}) =>
		| React.ComponentPropsWithRef<'input'>
		| React.ComponentPropsWithRef<'textarea'>
		| React.ComponentPropsWithRef<'button'>

	placeholder?: string
	hideFormMessage?: boolean
	required?: boolean
}

function StyledFormField<T extends FieldValues>({
	render,
	classNames,
	hideFormMessage,
	...props
}: StyledFormFieldProps<T>) {
	return (
		<>
			<FormField
				name={props.name as any}
				control={props.control}
				render={({ field }) => {
					return (
						<FormItem className={cn('', classNames?.item)}>
							{props.label && (
								<FormLabel
									className={cn(
										'text-base md:text-lg relative',
										classNames?.label
									)}
									htmlFor={field.name}
								>
									{props.label}
									{props.required && (
										<span className="text-red-500 ml-1">*</span>
									)}
								</FormLabel>
							)}
							{props.description && (
								<FormDescription className={classNames?.description}>
									{props.description}
								</FormDescription>
							)}
							{render ? (
								props.asChild ? (
									<>{render({ field })}</>
								) : (
									<FormControl>
										<>{render({ field })}</>
									</FormControl>
								)
							) : (
								<FormControl>
									<Input
										{...field}
										value={(field.value as string) ?? ''}
										className="text-base"
										id={field.name as string}
										name={props.name as string}
										placeholder={props.placeholder}
									/>
								</FormControl>
							)}
							{!hideFormMessage && <FormMessage />}
						</FormItem>
					)
				}}
			/>
		</>
	)
}

export default StyledFormField

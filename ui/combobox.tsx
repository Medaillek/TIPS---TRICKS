import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { FormControl } from './form'
import { Button } from './button'
import { CaretSortIcon } from '@radix-ui/react-icons'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from './command'
import { cn } from '@/lib/utils'
import { CheckIcon, Loader2 } from 'lucide-react'

import { FieldValues, UseFormReturn } from 'react-hook-form'

export type LabelValue = {
	label: string
	value: string
}

interface ComboboxProps<T extends FieldValues> {
	value: string
	form?: UseFormReturn<T>
	array: LabelValue[]
	key: keyof T
	onSelect?: (value: string) => void
	onValueCreate?: (value: string) => boolean
	placeHolder?: string
	noResultMessage?: string
	selectItemMessage?: string
	closeOnValueSelect?: boolean
	closeOnValueCreate?: boolean
	search: string
	setSearch: React.Dispatch<React.SetStateAction<string>>
	loading?: boolean
	filter?: ((item: string, search: string) => number) | undefined
	handleSearch?: (value: string) => void
	classNames?: {
		trigger?: string
	}
	popoverProps?: React.ComponentProps<typeof PopoverContent>
}

function Combobox<T extends FieldValues>({
	closeOnValueCreate = false,
	closeOnValueSelect = true,
	filter,
	classNames = {
		trigger: 'w-full',
	},
	popoverProps,
	search,
	setSearch,
	...props
}: ComboboxProps<T>) {
	const [open, setOpen] = React.useState(false)

	return (
		<Popover
			onOpenChange={setOpen}
			open={open}
		>
			<PopoverTrigger
				asChild
				className="flex"
			>
				<FormControl>
					<Button
						variant="outline"
						role="combobox"
						type="button"
						onClick={() => setOpen(!open)}
						className={cn(
							`${classNames.trigger} justify-between text-sm`,
							!props.value && 'text-muted-foreground'
						)}
					>
						<p className="truncate">
							{props.value
								? props.array.find((item) => item.value === props.value)?.label
								: props.selectItemMessage ?? 'Sélectionner un élément'}
						</p>
						<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent
				{...popoverProps}
				className={cn(
					`p-0 -translate-x-3 md:translate-x-0`,
					popoverProps?.className
				)}
			>
				<Command
					filter={filter}
					shouldFilter={filter ? true : false}
				>
					<CommandInput
						placeholder={props.placeHolder ?? 'Rechercher un élément'}
						className="h-9"
						value={search}
						onValueChange={(value) => setSearch(value)}
						onKeyDown={(e) => {
							if (e.key === 'Escape') {
								if (!props.array.find((item) => item.value === search)) {
									setSearch('')
								}
								setOpen(false)
							}
							if (
								e.key === 'Enter' &&
								!props.array.find((item) => item.value === search)
							) {
								const success =
									props.onValueCreate && props.onValueCreate(search)
								success && props.onSelect && props.onSelect(search)
								success && setOpen(false)
								setSearch('')
							}
						}}
					/>

					<div className="p-1">
						<CommandEmpty className="py-0">
							<div className="p-1">
								{props.onValueCreate ? (
									<button
										type="button"
										className="relative flex cursor-default select-none w-full py-2 items-center rounded-sm px-2 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground"
										onClick={() => {
											const success =
												props.onValueCreate && props.onValueCreate(search)
											success && props.onSelect && props.onSelect(search)
											success && setOpen(false)

											setSearch('')
										}}
									>
										<>Ajouter {search}</>
									</button>
								) : props.loading ? null : (
									<p className="p-1">
										{props.noResultMessage ?? 'Aucun résultat'}
									</p>
								)}
							</div>
						</CommandEmpty>
						<CommandGroup className={props.array.length === 0 ? 'p-0' : 'p-1'}>
							{props.loading ? (
								<div className="flex gap-2 items-center pb-2 px-2">
									<p>Chargement</p>
									<Loader2 className="animate-spin" />
								</div>
							) : (
								props.array.map((item) => (
									<CommandItem
										value={item.value}
										key={item.value}
										onSelect={() => {
											props.onSelect && props.onSelect(item.value)
											closeOnValueSelect && setOpen(false)

											setSearch('')
										}}
									>
										{item.label}
										<CheckIcon
											className={cn(
												'ml-auto h-4 w-4',
												item.value === props.value ? 'opacity-100' : 'opacity-0'
											)}
										/>
									</CommandItem>
								))
							)}
						</CommandGroup>
					</div>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default Combobox

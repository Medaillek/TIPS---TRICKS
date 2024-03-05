import { cn } from '@/lib/utils'

interface HeadingProps extends React.ComponentPropsWithRef<'h1'> {}

const className = (base: string, className: string | undefined) =>
	cn('font-bold', base, className)

export const H1 = ({ children, ...props }: HeadingProps) => {
	return (
		<h1
			{...props}
			className={className('text-[clamp(3rem,7vw,5.6rem)]', props.className)}
		>
			{children}
		</h1>
	)
}

export const H2 = ({ children, ...props }: HeadingProps) => {
	return (
		<h2
			{...props}
			className={className('text-[clamp(2.5rem,6vw,4.2rem)]', props.className)}
		>
			{children}
		</h2>
	)
}
export const H3 = ({ children, ...props }: HeadingProps) => {
	return (
		<h3
			{...props}
			className={className('text-[clamp(2rem,5vw,3.1rem)]', props.className)}
		>
			{children}
		</h3>
	)
}
export const H4 = ({ children, ...props }: HeadingProps) => {
	return (
		<h4
			{...props}
			className={className('text-[clamp(1.7rem,4vw,2.35rem)]', props.className)}
		>
			{children}
		</h4>
	)
}
export const H5 = ({ children, ...props }: HeadingProps) => {
	return (
		<h5
			{...props}
			className={className('text-[clamp(1.4rem,3vw,1.8rem)]', props.className)}
		>
			{children}
		</h5>
	)
}

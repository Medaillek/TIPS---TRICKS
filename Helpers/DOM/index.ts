/**
 * @description return document.querySelector() always trusted and throws an error if no element is present. ** Only use on trusted elements or elements that must be present **
 */
export function qsStrict<T extends HTMLElement>(selector: string): T {
	const e = document.querySelector<T>(selector)
	if (!e) {
		throw new Error(`No element ${selector} found on the page`)
	}
	return e
}
/**
 * @description return document.querySelector() without any check
 */
export function qsLight<T extends HTMLElement>(selector: string): T | null {
	return document.querySelector<T>(selector)
}

export function waitForElm<E extends Element>(selector: string): Promise<E> {
	return new Promise((resolve) => {
		if (document.querySelector<E>(selector)) {
			return resolve(document.querySelector(selector) as E)
		}

		const observer = new MutationObserver(() => {
			if (document.querySelector<E>(selector)) {
				observer.disconnect()
				resolve(document.querySelector(selector) as E)
			}
		})

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		})
	})
}

export const sleep = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms))

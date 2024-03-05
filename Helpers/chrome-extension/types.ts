type Action = 'example'

interface MessageAction {
	action: Action
}

interface ExampleMessage extends MessageAction {
	action: 'example'
	text: string
}

export type ExtensionMessage = ExampleMessage

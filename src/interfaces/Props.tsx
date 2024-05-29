export interface Props {
    children: string | JSX.Element | JSX.Element[]
    title?: string
}

export interface Action {
    type: string
    id: string
    item: {
        id: string
    }
}

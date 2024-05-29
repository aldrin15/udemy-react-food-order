export interface ModalProps {
    open: boolean
    className?: string
    onClose: () => void
    children: string | JSX.Element | JSX.Element[]
}

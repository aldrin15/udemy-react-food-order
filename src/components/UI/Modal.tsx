import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ModalProps } from '../../interfaces/Modal'

const Modal = ({ open, className = '', onClose, children }: ModalProps) => {
    const dialog = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const modal = dialog.current

        if (open) {
            modal?.showModal()
        }

        return () => modal?.close()
    }, [open])

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
            {children}
        </dialog>,
        document.getElementById('modal') as HTMLDialogElement
    )
}

export default Modal

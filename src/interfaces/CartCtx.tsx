import { Item } from './Items'

export interface CartCtx {
    items?: [Item]
    addItem?: Function
    removeItem?: Function
    clearCart?: () => void
}

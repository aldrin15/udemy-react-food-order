import { createContext, useReducer } from 'react'
import { Action, Props } from '../interfaces/Props'
import { CartCtx } from '../interfaces/CartCtx'

const CartContext = createContext({
    items: [],
    addItem: (item: {}) => {},
    removeItem: (id: string) => {},
    clearCart: () => {},
} as unknown as CartCtx)

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item?.id
        )

        const updatedItems = [...state.items]

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity! + 1,
            }

            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems.push({ ...action.item, quantity: 1 })
        }

        return { ...state, items: updatedItems }
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        )
        const existingCartItem = state.items[existingCartItemIndex]
        const updatedItems = [...state.items]

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1)
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity! - 1,
            }

            updatedItems[existingCartItemIndex] = updatedItem
        }

        return { ...state, items: updatedItems }
    }

    if (action.type === 'CLEAR_CART') {
        return { ...state, items: [] }
    }

    return state
}

export function CartContextProvider({ children }: Props) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] })

    function addItem(item: {}) {
        dispatchCartAction({ type: 'ADD_ITEM', item })
    }

    function removeItem(id: string) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id })
    }

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' })
    }

    const cartContextData = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart,
    }

    return (
        <CartContext.Provider value={cartContextData}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext
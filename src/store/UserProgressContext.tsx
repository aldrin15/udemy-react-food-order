import { createContext, useState } from 'react'
import { Props } from '../interfaces/Props'

const UserProgressContext = createContext({
    progress: '',
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
})

const UserProgressContextProvider = ({ children }: Props) => {
    const [userProgress, setUserProgress] = useState('')

    const showCart = () => {
        setUserProgress('cart')
    }

    const hideCart = () => {
        setUserProgress('')
    }

    const showCheckout = () => {
        setUserProgress('checkout')
    }

    const hideCheckout = () => {
        setUserProgress('')
    }

    const userProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    }

    return (
        <UserProgressContext.Provider value={userProgressCtx}>
            {children}
        </UserProgressContext.Provider>
    )
}

export default UserProgressContext
export { UserProgressContextProvider }
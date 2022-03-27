import { createContext, useContext, useReducer } from "react";
import { addItemToCart, clearCartState, removeItemFromCart } from "./actions";
import { cartReducer } from "./reducer";

export const CartContext = createContext({
    items: [],
    totalAmount : 0,
    addItem : (item) => {},
    removeItem : (id) => {},
    clearCart : () => {}
})

export const useCart = () => {
    return useContext(CartContext);
}



const CartProvider = (props) => {

    const [cartState , dispatchCartAction] = useReducer(cartReducer , {
        items : [],
        totalAmount : 0
    })

    const addCartItemHandler = (item) => {
        dispatchCartAction(addItemToCart(item))
    }

    const removeCartItemHandler = (id) => {
        dispatchCartAction(removeItemFromCart(id))
    }

    const resetCartState = () => {
        dispatchCartAction(clearCartState())
    }

    const cartContextValue = {
        items : cartState.items,
        totalAmount : cartState.totalAmount,
        addItem: addCartItemHandler ,
        removeItem : removeCartItemHandler,
        clearCart : resetCartState
    }
    return <CartContext.Provider value={cartContextValue}>{props.children}</CartContext.Provider>
}

export default CartProvider;

export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const CLEAR_CART_STATE = 'CLEAR_CART_STATE';

export const addItemToCart = (item) => {
    return {
        type : ADD_ITEM_TO_CART,
        item
    }
}

export const removeItemFromCart = (id) => {
    return {
        type : REMOVE_ITEM_FROM_CART,
        id
    }
}

export const clearCartState = () => {
    return {
        type : CLEAR_CART_STATE
    }
}


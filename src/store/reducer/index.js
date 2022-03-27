import { ADD_ITEM_TO_CART, CLEAR_CART_STATE, REMOVE_ITEM_FROM_CART } from "../actions";

const initialState = {
    items : [],
    totalAmount : 0
}

export const cartReducer = (state=initialState , action) => {

    switch (action.type) {
        case ADD_ITEM_TO_CART:
            const existingCartItemIndex = state.items.findIndex(
              (item) => item.id === action.item.id
            );
            const existingCartItem = state.items[existingCartItemIndex];
            let updatedItems;
            if (existingCartItem) {
              const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
              };
              updatedItems = [...state.items];
              updatedItems[existingCartItemIndex] = updatedItem;
            } else {
              updatedItems = [...state.items, action.item];
            }
            return {
                ...state,
                items : updatedItems,
                totalAmount : state.totalAmount + action.item.price * action.item.amount
            }

        case REMOVE_ITEM_FROM_CART :
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.id
            );
            const existingItem = state.items[existingItemIndex];
            let updatedCartItems ;
            if(existingItem.amount === 1) {
                updatedCartItems = state.items.filter((item) => item.id !== action.id)
            } else {
                const newItem = {...existingItem , amount : existingItem.amount-1}
                updatedCartItems = [...state.items];
                updatedCartItems[existingItemIndex] = newItem
            }

            return {
                ...state,
                items : updatedCartItems,
                totalAmount : state.totalAmount - existingItem.price
            }

        case CLEAR_CART_STATE : 
            return initialState;
    
        default:
            return initialState;
    }
}


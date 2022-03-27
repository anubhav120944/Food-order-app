import { useState } from 'react';
import { useCart } from '../../store/CartProvider';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {

    const [isCheckout , setIsCheckout] = useState(false);
    const [isConfirming , setIsConfirming] = useState(false);
    const [didConfirm , setDidConfirm] = useState(false);

    const cart = useCart();
    const totalPrice = `$${cart.totalAmount.toFixed(2)}`;

    const cartItemAddHandler = (item) => {
        cart.addItem({...item , amount : 1});
    }

    const cartItemRemoveHandler = (id) => {
       cart.removeItem(id);
    }

    const handleOrderClick = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = async(userData) => {

        setIsConfirming(true);

        try {
            const response = await fetch('https://react-blog-app-45fb9-default-rtdb.firebaseio.com/orders.json',{
                method : 'POST',
                body : JSON.stringify({
                    user : userData,
                    orderedItems : cart.items,
                    totalPrice : cart.totalAmount
                })
            });
            if(!response.ok) {
                throw new Error("Something went wrong");
            }

        } catch (error) {
            console.log(error.message)
        }
        setIsConfirming(false);
        setDidConfirm(true);
        cart.clearCart();
    }


    const CartContent = (
        <>
            <ul className={classes['cart-items']}>
                {cart.items.map((item) => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        amount={item.amount}
                        price={item.price}
                        onRemoveItem={() => cartItemRemoveHandler(item.id)}
                        onAddItem={() => cartItemAddHandler(item)}
                    />
                ))}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalPrice}</span>
            </div>
            {isCheckout && <Checkout onCancel = {props.onCloseCart} onConfirmOrder={submitOrderHandler} />}
            {
                !isCheckout &&
                <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
                    <button className={classes.button} onClick={handleOrderClick}>Order</button>
                </div>
            }
        </>
    )

    const OrderPlaced = (
        <>
            <p className={classes['placing-order']}>Successfully placed the order !!</p>
            <div className={classes.actions}>
                <button className={classes['button']} onClick={props.onCloseCart}>Close</button>
            </div>
        </>
    )
    
    return (
        <Modal onCloseCart={props.onCloseCart}>
            {!isConfirming && !didConfirm && CartContent}
            {isConfirming && !didConfirm && <p className={classes['placing-order']}>Placing the order...</p>}
            {didConfirm && OrderPlaced}
        </Modal>
    );
}

export default Cart;
import { useRef } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
const MealItemForm = (props) => {

    const amountInputRef = useRef();
    const handleCardItemSubmit = (e) => {
        e.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5
        ) {
            return ;
        }
        props.onAddToCart(enteredAmountNumber);
    }
    return (
        <form className={classes.form} onSubmit={handleCardItemSubmit}>
            <Input label="Amount" ref = {amountInputRef} input={{
                id:'amount_'+props.id,
                type:'number',
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1'
                
            }} />
            <button className={classes.button}>Add</button>
        </form>
    );
}

export default MealItemForm;
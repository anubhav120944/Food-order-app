import React, { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim().length === 0 ;
const isOfSixLengthChars = (value) => value.trim().length === 6 ;


const Checkout = (props) => {

    const nameRef = useRef('');
    const streetRef = useRef('');
    const postalRef = useRef('');
    const cityRef = useRef('');
    const [inputsValid , setInputsValid] = useState({
        name : true,
        street : true,
        postalCode : true,
        city : true
    })

    const orderConfirmHandler = (e) => {
        e.preventDefault();

        const nameValue = nameRef.current.value;
        const streetValue = streetRef.current.value;
        const postalValue = postalRef.current.value;
        const cityValue = cityRef.current.value;

        const nameIsValid = !isEmpty(nameValue);
        const streetIsValid = !isEmpty(streetValue);
        const postalIsValid = isOfSixLengthChars(postalValue);
        const cityIsValid = !isEmpty(cityValue);

        const isFormValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;
        setInputsValid({
            name : nameIsValid,
            street : streetIsValid,
            postalCode : postalIsValid,
            city : cityIsValid
        })
        if(!isFormValid) {
            return ;
        }

        props.onConfirmOrder({
            name : nameValue,
            street : streetValue,
            city : cityValue,
            postalCode : postalValue
        })
    }

    const nameClasses = `${classes.control} ${inputsValid.name ? '' : classes.invalid}`;
    const streetClasses = `${classes.control} ${inputsValid.street ? '' : classes.invalid}`;
    const postalCodeClasses = `${classes.control} ${inputsValid.postalCode ? '' : classes.invalid}`;
    const cityClasses = `${classes.control} ${inputsValid.city ? '' : classes.invalid}`;
    return (
        <form onSubmit = {orderConfirmHandler}>
            <div className={nameClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameRef} />
                {!inputsValid.name && <p>Please enter a valid name</p>}
            </div>
            <div className={streetClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetRef} />
                {!inputsValid.street && <p>Please enter a valid street</p>}
            </div>
            <div className={postalCodeClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalRef} />
                {!inputsValid.postalCode && <p>Please enter a valid postal code of six lengths</p>}
            </div>
            <div className={cityClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityRef} />
                {!inputsValid.city && <p>Please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout

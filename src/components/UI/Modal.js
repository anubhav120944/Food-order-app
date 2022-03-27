import ReactDom from 'react-dom';
import classes from './Modal.module.css';


const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose} ></div>
}

const ModalOverLay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}

const portalElement = document.getElementById("overlay");
const Modal = (props) => {
    return (
        <>
            {ReactDom.createPortal(<Backdrop onClose={props.onCloseCart} />,portalElement)}
            {ReactDom.createPortal(<ModalOverLay>{props.children}</ModalOverLay>,portalElement)}
        </>
    );
}

export default Modal;
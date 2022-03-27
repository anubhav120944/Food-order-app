import { useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useCart } from "../../store/CartProvider";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
const HeaderCartButton = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    return navigate("/");
  };
  const cart = useCart();
  const [isCartBumped, setIsCartBumped] = useState(false);

  const btnClasses = `${classes.button} ${isCartBumped ? classes.bump : ""}`;

  const numberOfItems = cart.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  useEffect(() => {
    setIsCartBumped(true);

    const timer = setTimeout(() => {
      setIsCartBumped(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [cart.items]);

  return (
    <>
      {auth.user ? (
        <>
          <button className={btnClasses} onClick={props.onShowCart}>
            <span className={classes.icon}>
              <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
          </button>
          <button className={btnClasses}>
            <span>{auth.user.name}</span>
          </button>
          <button className={btnClasses} onClick={logout}>
            <span>Logout</span>
          </button>
        </>
      ) : (
        <>
          <Link to="/login">
            <button className={btnClasses}>
              <span>Login</span>
            </button>
          </Link>
          <Link to="/signup">
            <button className={btnClasses}>
              <span>Sign Up</span>
            </button>
          </Link>
        </>
      )}
    </>
  );
};

export default HeaderCartButton;

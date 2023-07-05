import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getUserCartThunk } from "../../store/cart";
import { useEffect } from "react";

function UserCart() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getUserCartThunk());
    }, [dispatch]);

    const sessionUser = useSelector(state => state.session.user);
    const userCart = useSelector(state => Object.values(state.carts));

    console.log(userCart);

    return (
        <div>

        </div>
    )
}

export default UserCart;
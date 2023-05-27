import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllItemsThunk } from "../../store/items";


function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    
}

export default HomePage;
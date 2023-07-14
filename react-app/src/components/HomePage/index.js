import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAllItemsThunk } from "../../store/items";
import { useEffect } from "react";
import "./HomePage.css";


function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const items = useSelector(state => Object.values(state.items));
    const itemsRev = items.slice(-4).toReversed();

    useEffect(() => {
        dispatch(getAllItemsThunk())
    }, [dispatch]);

    console.log('items', itemsRev);

    return (
        <main className="homepage-div">
            <div className="title-div">
                <h1>Welcome to Deck's Hobbies</h1>
                <h3>A MTG card shopping website</h3>
            </div>
            
            <div>
                <img className="home-cards-img" src="https://cdn.shopify.com/s/files/1/1601/1757/files/How_to_Sell_Your_MTG_Cards.jpg?v=1669819953" alt="Home page img"></img>
            </div>

            <div className="home-divider">
            </div>

            <div className="trending-div">
                <h2>Trending Cards</h2>
                <div className="trending-cards-div">
                    {itemsRev?.map(({name, image, id}) => (
                        <NavLink exact to={`/items/${id}`} className="trending-card">
                            <img className="trending-card-img" src={image} alt="Card Image"></img>
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className="home-divider">
            </div>

            <div>
                <h3>Deck's Hobbies is an app where you can post and view card listings.</h3>
            </div>

            <footer>
                <a>Made by Saad Anwer | </a>
                <a className="contributor" href="https://github.com/anwersaad0">GitHub</a>
                <a> | </a>
                <a className="contributor" href="https://www.linkedin.com/in/saad-anwer-01aab317a/">LinkedIn</a>
            </footer>
        </main>
    )
}

export default HomePage;
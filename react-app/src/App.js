import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllItems from "./components/AllItems";
import ItemPage from "./components/ItemPage";
import ItemFormPage from "./components/CreateItemForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/items/new">
            <ItemFormPage />
          </Route>
          <Route exact path="/items/:itemId">
            <ItemPage />
          </Route>
          <Route exact path="/items">
            <AllItems />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import DiscoveryPage from './components/DiscoveryPage'
import MainView from "./components/MainView";
import SelectedServer from "./components/SelectedServer";
import Members from "./components/Members";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LeftNavBar from "./components/LeftNav";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const allServers = useSelector((state)=> state.serversReducer)
  const userServers = Object.values(allServers.userServers)
  
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
          <Route path="/discovery">
          <LeftNavBar userServers={userServers}/>
            <DiscoveryPage />
          </Route>
          <Route path="/channels">
          <LeftNavBar userServers={userServers}/>
            <MainView />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

import React from "react";
import './App.css';
import Header from "./components/Header"
import Info from "./components/Info"
import Products from "./components/Products"
import Form from "./components/Form"
import Special from "./components/Special"
import { AuthProvider } from './components/Auth/AuthContext'
import PrivateRoute from "./components/Auth/PrivateRoute"
import Login from "./components/Auth/Login"
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

function App() {

  return (
    <div className="site">
      <Router>
        <AuthProvider>
          <Switch>
          <PrivateRoute exact path="/admin" component={Form}/>
          <Route path="/login" component={Login}/>
          <Route path="/">
                <Header/>
                <Info/>
                <Products location={true} />
                <Special/>
                <Products location={false} />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;

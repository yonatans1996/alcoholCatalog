import React,{useState,useEffect} from "react";
import './App.css';
import Header from "./components/Header"
import Info from "./components/Info"
import Products from "./components/Products"
import Form from "./components/Form"
import Special from "./components/Special"
import { AuthProvider } from './components/Auth/AuthContext'
import PrivateRoute from "./components/Auth/PrivateRoute"
import Login from "./components/Auth/Login"
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import Order from "./components/Order"
import FooterPc from "./components/FooterPc"
import Warning from "./components/Warning"
import OrderMobile from "./components/OrderMobile"


function App() {
  const [width, setWidth]   = useState(window.innerWidth);
function updateDimensions(){
  setWidth(window.innerWidth);
}
useEffect(() => {
  window.addEventListener("resize", updateDimensions);
  return () => window.removeEventListener("resize", updateDimensions);
}, []);

  return (
    <div className="site">
      <Router>
        <AuthProvider>
          <Switch>
          <PrivateRoute exact path="/admin" component={Form}/>
          <Route path="/login" component={Login}/>
          <Route exact path="/">
                <Header/>
                {width>740 && <Info/>}
                <Products location={true} />
                <Special/>
                <Products location={false} /> 
                {width<=740 && <Info/>}
                {width>740 && <Order/>}
                <p id="mlay">עד גמר המלאי | החברה רשאית להפסיק את המבצע בכל עת | ט.ל.ח</p>
                <FooterPc/>
                <Warning />
                {width<=740 && <OrderMobile/>}
            </Route>
          <Route path="*">
           <Redirect to="/" />
          </Route>
          </Switch>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;

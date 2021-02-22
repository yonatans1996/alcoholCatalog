import React from "react";
import './App.css';
import Header from "./components/Header"
import Info from "./components/Info"
import Products from "./components/Products"
import Form from "./components/Form"
import Special from "./components/Special"

function App() {

  return (
    <div className="site">
      <Header/>
      <Info/>
      <Products location={true} />
      <Special/>
      <Products location={false} />
      <Form/>
    </div>
  );
}

export default App;

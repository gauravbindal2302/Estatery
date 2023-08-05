import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Rent from "./components/Rent/Rent";

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <Rent />
      </div>
    </>
  );
}

export default App;

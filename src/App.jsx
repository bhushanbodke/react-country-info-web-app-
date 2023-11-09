import { useState } from "react";
import "./App.css";
import Display from "./Display";
import Details from "./Details";

function App() {
  let [country, Setcountry] = useState("");
  let [is_DetailsOpen, SetDetailsOpen] = useState(false);
  let [Name, SetName] = useState("");

  return (
    <>
      {is_DetailsOpen ? (
        <Details name={Name} SetDetailsOpen={SetDetailsOpen} />
      ) : (
        <>
          <h1>Country Info Web App</h1>
          <input
            type="text"
            placeholder="Search Country"
            onChange={(e) => Setcountry(e.target.value)}
          />
          <hr />
          <Display
            country={country}
            SetName={SetName}
            SetDetailsOpen={SetDetailsOpen}
          />
        </>
      )}
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import axios from "axios";

let Display = ({ country, SetName, SetDetailsOpen }) => {
  let [list, Setlist] = useState([]);
  let [Error, SetError] = useState("");
  let [Slist, SetSlist] = useState([]);
  let [data_fetched, Setfetched] = useState(false);

  let Base_url = "https://studies.cs.helsinki.fi/restcountries/api/";

  useEffect(() => {
    if (country !== "") {
      let array = list.filter((ele) => {
        return ele.name.common.toLowerCase().includes(country.toLowerCase());
      });
      if (array.length === 0) {
        SetError("No Matched Found :(");
        return;
      }
      if (array.length > 10) {
        SetError("Too Many Matched Specify Another Filter :(");
        return;
      }
      SetSlist(array);
      console.log(array);
    } else {
      SetSlist(list);
    }
    SetError("");
  }, [country]);

  useEffect(() => {
    axios.get(`${Base_url}all`).then((res) => {
      Setlist(res.data);
      SetSlist(res.data);
      Setfetched(true);
    });
  }, []);

  let viewDetails = (name) => {
    SetName(name);
    SetDetailsOpen(true);
  };
  return (
    <>
      {data_fetched ? (
        <div>
          <div> {Error}</div>
          <h3>Countries</h3>

          {Slist.map((country) => {
            return (
              <div>
                <h4>
                  {country.name.common} {country.flag}
                  <button onClick={() => viewDetails(country.name.common)}>
                    view details
                  </button>
                </h4>
              </div>
            );
          })}
        </div>
      ) : (
        <h3>Fetching Data Please wait ...</h3>
      )}
    </>
  );
};

export default Display;

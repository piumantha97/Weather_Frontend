import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [data, setData] = useState([]);
  let loading = false;

  useEffect(() => {
    const getData = async () => {
      loading = true;
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/group?id=1248991,1850147,2644210,2988507,2147714,4930956,1796236,3143244&units=metric&appid=3a27828fdb12bd14c6b5e5d5c4b1440a`
        );
        setData(response.data.list);
        loading = false;
      } catch (error) {
        loading = false;
      }
    };

    getData();
  }, []);

  const handleClick = (item) => {
    console.log("Clicked", item);
  };

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          {data.map((item) => (
            <div key={item.id} className="card">
              <div
                onClick={() => {
                  handleClick(item);
                }}
              >
                <p>Name: {item.name}</p>
                <p>Description: {item.weather[0].description}</p>
                <p>Temp: {item.main.temp}</p>
                <p>Id: {item.id}</p>
                <p>Dt: {item.dt}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Home;

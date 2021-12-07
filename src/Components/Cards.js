import axios from "axios";
import { useEffect, useState } from "react";
import { HOST_LINK } from "../constants";

const Cards = ({ shouldUpdate }) => {
  useEffect(() => {
    getUpdate();
  }, [shouldUpdate]);

  useEffect(() => {
    getUpdate();
  }, []);

  const [data, setData] = useState([]);

  const getUpdate = async () => {
    let response = await axios.get(`${HOST_LINK}/get_latest_metrocards`);
    console.log("response of Cards", response.data.records);
    setData(response.data.records);
  };

  const SingleCard = ({ data }) => {
    console.log("SingleCard", data);
    return (
      <>
        <p>{data[0]}</p>
        <ul>
          <li>Issued On : {data[1]}</li>
          <li>Balance : {data[3]}</li>
          <li>Cardtype: {data[4]}</li>
        </ul>
      </>
    );
  };

  return (
    <div className='box'>
      <h3>Latest Cards</h3>
      <ul style={{ textAlign: "left", color: "#001858" }}>
        {data &&
          data.map((data, index) => {
            return (
              <>
                <li key={index}>
                  <SingleCard data={data} />
                </li>
              </>
            );
          })}
      </ul>
    </div>
  );
};

export default Cards;

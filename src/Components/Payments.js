import axios from "axios";
import { useEffect, useState } from "react";
import { HOST_LINK } from "../constants";

const Payments = ({ shouldUpdate }) => {
  useEffect(() => {
    getUpdate();
  }, [shouldUpdate]);

  useEffect(() => {
    getUpdate();
  }, []);

  const [data, setData] = useState([]);

  const getUpdate = async () => {
    let response = await axios.get(`${HOST_LINK}/get_latest_payments`);
    console.log("response of payments", response);
    setData(response.data.records);
  };

  const SinglePayment = ({ data }) => {
    console.log("SinglePayment", data);
    return (
      <>
        <p>{data[3]}</p>
        <ul>
          <li>Time of Payment : {data[1]}</li>
          {/* <li>Balance : {data[3]}</li> */}
          <li>PaymentType: {data[2]}</li>
        </ul>
      </>
    );
  };

  return (
    <div className='box'>
      <h3>Latest Payments</h3>
      <ul style={{ textAlign: "left", color: "#001858" }}>
        {data &&
          data.map((data, index) => {
            return (
              <>
                <li key={index}>
                  <SinglePayment data={data} />
                </li>
              </>
            );
          })}
      </ul>
    </div>
  );
};

export default Payments;

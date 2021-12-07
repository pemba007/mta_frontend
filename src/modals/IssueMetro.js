import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HOST_LINK } from "../constants";

const labelStyles = {
  marginBottom: "10px",
};

const inputStyles = {
  marginBottom: "10px",
  minHeight: "35px",
  border: "1px solid black",
  borderRadius: "5px",
};

const IssueMetro = ({ onChange }) => {
  const [info, setInfo] = useState(null);

  const [cardType, setCardType] = useState("Limited");

  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();

  const clearMessage = () => {
    setInfo(null);
    setError(false);
  };

  const onSubmit = async (data) => {
    // Add Balance Submitting
    const { initialBalance } = data;

    let response = {};

    if (cardType === "unlimited") {
      // Unlimited
      response = await axios.post(`${HOST_LINK}/issue_metro_unlimited`, {});
    } else {
      // Limited
      response = await axios.post(`${HOST_LINK}/issue_metro_limited`, {
        params: {
          initialBalance: initialBalance,
        },
      });
    }

    console.log("Response is ", response);

    if (response.data.response_code === 1) {
      setInfo(response.data);
      onChange();
    } else {
      setError(true);
    }
  };

  console.log("Card Type", cardType);

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100%",
        color: "#172c66",
        // backgroundColor: "#f3d2c1",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "80%",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#001858" }}>
          Issue Metro Card
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor='cardType' style={labelStyles}>
            Choose the card type:
          </label>

          <select
            name='cardType'
            id='cardType'
            onChange={(e) => {
              setCardType(e.target.value);
              clearMessage();
            }}
            style={{
              minHeight: "40px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <option value='limited' defaultChecked>
              Limited
            </option>
            <option value='unlimited'>Unlimited</option>
          </select>

          {cardType !== "unlimited" && (
            <>
              <label style={labelStyles}>Enter the balance to add </label>
              <input
                {...register("initialBalance", { required: true })}
                style={inputStyles}
                placeholder='0.0'
                default={0}
                onChange={() => clearMessage()}
              />
            </>
          )}

          <input
            type='submit'
            style={{
              minHeight: "40px",
              border: "1px solid #f582ae",
              borderRadius: "5px",
              color: "#fef6e4",
              background: "#f582ae",
              cursor: "pointer",
            }}
          />
        </div>
        {info && (
          <>
            <p>Card Number : {info.cardNumber}</p>
          </>
        )}
        {error && <p>Error added</p>}
      </form>
    </div>
  );
};

export default IssueMetro;

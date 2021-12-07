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

const BalanceCheck = ({ onChange }) => {
  const [balance, setBalance] = useState(false);

  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();

  const clearMessage = () => {
    setBalance(null);
    setError(false);
  };

  const onSubmit = async (data) => {
    // Add Balance Submitting
    const { cardNumber } = data;

    console.log("cardNumber", cardNumber);

    const response = await axios.get(`${HOST_LINK}/balance_check`, {
      params: {
        cardNumber: cardNumber,
      },
    });

    // console.log("Check response", response.data);
    if (response.data.response_code === 1) {
      setBalance(response.data.balance);
      onChange();
    } else {
      console.log("Could not add");
      setError(true);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100%",
        color: "#172c66",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "80%",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#001858" }}>
          Metrocard Balance Check
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* register your input into the hook by invoking the "register" function */}
          <label style={labelStyles}>Enter the card number </label>
          <input
            {...register("cardNumber", { required: true })}
            style={inputStyles}
            placeholder='Please enter card number'
            onChange={() => clearMessage()}
          />

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
        {balance && <p>Your balance is ${balance}</p>}
        {error && <p>Error added</p>}
      </form>
    </div>
  );
};

export default BalanceCheck;

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

const AddBalance = ({ onChange }) => {
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();

  const clearMessage = () => {
    setSuccess(false);
    setError(false);
  };

  const onSubmit = async (data) => {
    // Add Balance Submitting
    const { cardNumber, balanceToAdd } = data;
    console.log(
      "🚀 ~ file: AddBalance.js ~ line 26 ~ onSubmit ~ balanceToAdd",
      balanceToAdd
    );
    console.log("cardNumber", cardNumber);

    // Api calling
    // const response = await fetch(
    //   `${HOST_LINK}/balance_add?balanceToAdd=${encodeURIComponent(
    //     balanceToAdd
    //   )}&cardNumber=${encodeURIComponent(cardNumber)}`,
    //   {
    //     method: "POST",
    //   }
    // );

    const response = await axios.post(`${HOST_LINK}/balance_add`, {
      params: {
        cardNumber: cardNumber,
        balanceToAdd: balanceToAdd,
      },
    });

    console.log("AddBalance response", response.data);
    if (response.data.response_code === 1) {
      console.log("Successful addition");
      setSuccess(true);
      onChange();
    } else {
      console.log("Could not add");
      setError(true);
    }
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
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
        <h2 style={{ textAlign: "center", color: "#001858" }}>Add Balance</h2>
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

          <label style={labelStyles}>Enter the balance to add </label>
          <input
            {...register("balanceToAdd", { required: true })}
            style={inputStyles}
            placeholder='0.0'
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
        {success && <p>Successfully added</p>}
        {error && <p>Error added</p>}
      </form>
    </div>
  );
};

export default AddBalance;

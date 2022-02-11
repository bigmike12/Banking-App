import Layout from "../../components/Layout/Layout";
import React, { useState } from "react";
import "./BankingPage.scss";

const BankingPage = () => {
// const usdRate = 100

  const [transfer, setTransfer] = useState({
    email: "",
    send: "",
    receive: "",
    currency: "USD"
  });

  const onChange = (e) => {
    setTransfer({
      ...transfer,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(transfer)
  }

  // const currencyRates

  return (
    <>
      <Layout>
        <p>How much would you like to transfer?</p>

        <form onSubmit={onSubmit}>
          <div className="transfer-container">
            <div>
              <input
                name="email"
                className="recipientEmail"
                type="email"
                placeholder="Recipient's Email"
                onChange={onChange}
              />
            </div>

            <div className="transfer">
              <input
                name="send"
                className="sendingAmount"
                type="number"
                placeholder="You Send"
                onChange={onChange}
              />
              <select name="currency" className="transferOptions" onChange={onChange}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <div className="transfer">
              <input
                name="receive"
                className="sendingAmount"
                type="number"
                placeholder="Recipient gets"
                onChange={onChange}
                disabled
              />
              <select name="sending" className="transferOptions">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <button type="submit" className="submitButton">
              Send
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default BankingPage;

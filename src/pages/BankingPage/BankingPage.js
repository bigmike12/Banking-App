import Layout from "components/Layout/Layout";
import React from "react";
import "./BankingPage.scss";

const BankingPage = () => {
  return (
    <div>
        <Layout>
      <p>How much would you like to transfer?</p>

        <input type="number" placeholder="You send">hello</input>
      </Layout>
    </div>
  );
};

export default BankingPage;

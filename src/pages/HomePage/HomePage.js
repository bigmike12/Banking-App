import Layout from "../../components/Layout/Layout";
import React, { useContext, useEffect, useState } from "react";
import "./HomePage.scss";
import Table from "components/Table/Table";
import AuthContext from "context/auth/AuthContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialTrans = [
    {
      id: 1,
      from: "Banking",
      amount: "1000",
      currency: "USD",
      date: "Feb 16, 2022",
    },
    // {
    //   id: 2,
    //   from: "Banking",
    //   amount: "1000",
    //   currency: "USD",
    //   date: "Feb 16, 2022",
    // },
    // {
    //   id: 3,
    //   from: "Banking",
    //   amount: "1000",
    //   currency: "USD",
    //   date: "Feb 16, 2022",
    // },
    // {
    //   id: 4,
    //   from: "Banking",
    //   amount: "-30",
    //   currency: "USD",
    //   date: "Feb 16, 2022",
    // },
  ];

  const [balUsd, setBalUsd] = useState("1000");
  const [balEur, setBalEur] = useState("0");
  const [balGbp, setBalGbp] = useState("0");

  const totalBalUSD = `USD ${balUsd}`;
  const totalBalEUR = `EUR ${balEur}`;
  const totalBalGBP = `GBP ${balGbp}`;

  return (
    <>
      <Layout>
        <div className="top-container">
          <div className="top-container-money">
            <p className="top-container__balance">Current Balance</p>
            <div>
              <h1 className="top-container__amount">{totalBalUSD}</h1>
              <h1 className="top-container__amount">{totalBalEUR}</h1>
              <h1 className="top-container__amount">{totalBalGBP}</h1>
            </div>
          </div>

          <div className="top-container__button">
            <Link to="/transfer"><button>New Transaction</button></Link>
          </div>
        </div>

        <Table data={initialTrans} />
      </Layout>
    </>
  );
};

export default HomePage;

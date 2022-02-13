import Card from "components/Card/Card";
import React from "react";
import "./Table.scss";
import Moment from 'react-moment';


const Table = ({ data, column }) => {
  
  // const renderTableHeader = () => {
  //   let header = Object.keys(data[0]);
  //   return header && header.map((key, index) => {
  //     return <th key={index}>{key.toUpperCase()}</th>;
  //   });
  // };

  const renderTableData = () => {
    return data && data.map((items, index) => {
      const { sendTo, senderCurrency, amount, date, recipientCurrency, status } = items;
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td className={amount > 0 ? "amountIn" : "amountOut"}>{amount}</td>
          <td>{senderCurrency}</td>
          <td>{recipientCurrency}</td>
          <td>{status}</td>
          <td><Moment title='Last updated time' format='MMMM Do YYYY'>
						{date}
					</Moment>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
        <Card>
      <table className="table">
        <thead className="table-header">
            <tr>
              <td>Id</td>
              <td>Amount</td>
              <td>senderCurrency</td>
              <td>recipientCurrency</td>
              <td>status</td>
              <td>date</td>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      </Card>
    </div>
  );
};

export default Table;

import Card from "components/Card/Card";
import React from "react";
import "./Table.scss";

const Table = ({ data, column }) => {
  
  const renderTableHeader = () => {
    let header = Object.keys(data[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderTableData = () => {
    return data.map((items, index) => {
      const { id, from, amount, date, currency } = items;
      return (
        <tr key={index}>
          <td>{id}</td>
          <td>{from}</td>
          <td className={amount > 0 ? "amountIn" : "amountOut"}>{amount}</td>
          <td>{currency}</td>
          <td>{date}</td>
        </tr>
      );
    });
  };

  return (
    <div>
        <Card>
      <table className="table">
        <thead className="table-header">
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      </Card>
    </div>
  );
};

export default Table;

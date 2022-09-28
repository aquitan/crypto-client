import React from 'react'
import CoinBaseFirstPage from "./CoinBaseFirstPage";
import CoinBaseSecondPage from "./CoinBaseSecondPage";
import "./CoinBase.scss";
import { useState } from "react";
import CoinBaseFrasePage from "./CoinBaseFrasePage";

const CoinBase = () => {
  const [connectFirst, setConnectFirst] = useState(false);
  const [connectSecond, setConnectSecond] = useState(false);

  const onConnectFirst = () => {
    setConnectFirst(true);
  };
  const onGoBackFirst = () => {
    setConnectFirst(false);
  };

  const toFrasePage = () => {
    setConnectFirst(false);
    setConnectSecond(true)
  };

  const renderPages = () => {
    if (connectFirst)
      return (
        <CoinBaseSecondPage
          onGoBackFirst={onGoBackFirst}
          toFrasePage={toFrasePage}
        />
      );
    if (connectSecond)
      return <CoinBaseFrasePage onGoBackFirst={onGoBackFirst} />;

    return <CoinBaseFirstPage onConnectFirst={onConnectFirst} />;
  };

  return <div className="coinbaseWrap">{renderPages()}</div>;
};

export default CoinBase;

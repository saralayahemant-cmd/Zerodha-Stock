import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
  openSellWindow: () => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [activeOrderWindow, setActiveOrderWindow] = useState(null);
  const [selectedStockUID, setSelectedStockUID] = useState("");

  const handleOpenBuyWindow = (uid) => {
    setActiveOrderWindow("BUY");
    setSelectedStockUID(uid);
  };

  const handleOpenSellWindow = (uid) => {
    setActiveOrderWindow("SELL");
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setActiveOrderWindow(null);
    setSelectedStockUID("");
  };

  const handleCloseSellWindow = () => {
    setActiveOrderWindow(null);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
      }}
    >
      {props.children}
      {activeOrderWindow === "BUY" && <BuyActionWindow uid={selectedStockUID} />}
      {activeOrderWindow === "SELL" && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";
import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [availableQuantity, setAvailableQuantity] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    let isCurrent = true;

    axios
      .get("http://localhost:3002/allHoldings", { withCredentials: true })
      .then((response) => {
        const holding = response.data.find((item) => item.name === uid);
        if (isCurrent) {
          setAvailableQuantity(holding?.qty ?? 0);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setError("Unable to load your available shares.");
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [uid]);

  const handleSellClick = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
      }, {
        withCredentials: true,
      });
      generalContext.closeSellWindow();
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? "Unable to place sell order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  const hasShares = availableQuantity > 0;

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="sell-qty"
              min="1"
              max={availableQuantity ?? undefined}
              step="1"
              onChange={(event) => setStockQuantity(event.target.value)}
              value={stockQuantity}
              disabled={!hasShares || isSubmitting}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="sell-price"
              min="0.01"
              step="0.05"
              onChange={(event) => setStockPrice(event.target.value)}
              value={stockPrice}
              disabled={isSubmitting}
            />
          </fieldset>
        </div>
        <p>Available {uid}: {availableQuantity === null ? "Loading..." : availableQuantity}</p>
      </div>

      <div className="buttons">
        <span>Sell {uid}</span>
        <div>
          <button
            className="btn btn-red"
            onClick={handleSellClick}
            disabled={!hasShares || isSubmitting}
          >
            {isSubmitting ? "Placing..." : "Sell"}
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick} disabled={isSubmitting}>
            Cancel
          </button>
        </div>
      </div>
      {error && <p role="alert">{error}</p>}
      {availableQuantity === 0 && !error && <p role="status">No shares available to sell.</p>}
    </div>
  );
};

export default SellActionWindow;

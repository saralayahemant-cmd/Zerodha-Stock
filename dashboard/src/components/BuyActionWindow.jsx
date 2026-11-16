import { useContext, useState } from "react";

import axios from "axios";

import GeneralContext from "./GeneralContext";
import { API_BASE_URL } from "../config";

import "./BuyActionWindow.css";


const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/newOrder`, {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
      }, {
        withCredentials: true,
      });
      generalContext.closeBuyWindow();
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? "Unable to place buy order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick} disabled={isSubmitting}>
            {isSubmitting ? "Placing..." : "Buy"}
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick} disabled={isSubmitting}>
            Cancel
          </button>
        </div>
      </div>
      {error && <p role="alert">{error}</p>}
    </div>
  );
};

export default BuyActionWindow;
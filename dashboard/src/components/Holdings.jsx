import { useState,useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { API_BASE_URL } from "../config";

const Holdings = () => {
  let [holdingsData,setholdingsData]=useState([]);

  useEffect(()=>{
    axios.get(`${API_BASE_URL}/allHoldings`, { withCredentials: true }).then((res)=>{
      setholdingsData(res.data);
    })
  },[])

  const labels=holdingsData.map((idvlholding)=> idvlholding['name']);
  const data={
    labels,
    datasets:[{
      label:"Stock name",
      data:holdingsData.map((holding)=> holding.price),
      backgroundColor : "rgba(255,99,132,0.5)"
    }]
  }

  return (
    <>
      <h3 className="title">Holdings ({holdingsData.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {holdingsData.map((holding,idx)=>{
            const currVal=holding.price*holding.qty;
            const isProfit=currVal-holding.avg*holding.qty>=0.0;
            const profClass=isProfit ? "profit":"loss";
            const dayClass=holding.isLoss ? "loss" : "profit";

            return(
              <tr  key={idx}>
            
            <td>{holding.name}</td>
            <td>{holding.qty}</td>
            <td>{holding.avg.toFixed(2)}</td>
            <td>{holding.price.toFixed(2)}</td>
            <td>{currVal.toFixed(2)}</td>
            <td className={profClass}>{(currVal-holding.avg*holding.qty).toFixed(2)}</td>
            <td className={profClass}>{holding.net}</td>
            <td className={dayClass}>{holding.day}</td>
          </tr>
            )
          })}

        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data}/>
    </>
  );
};

export default Holdings;
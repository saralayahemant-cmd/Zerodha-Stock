
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Positions = () => {
  let [positionsData,setPositionsData]= useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3002/allPositions", { withCredentials: true }).then((res)=>{
      setPositionsData(res.data);
    })
  },[])

  return (
    <>
      <h3 className="title">Positions (2)</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {positionsData.map((position,idx)=>{
                      const currVal=position.price*position.qty;
                      const isProfit=currVal-position.avg*position.qty>=0.0;
                      const profClass=isProfit ? "profit":"loss";
                      const dayClass=position.isLoss ? "loss" : "profit";
          
                      return(
                        <tr  key={idx}>
                      <td>{position.product}</td>
                      <td>{position.name}</td>
                      <td>{position.qty}</td>
                      <td>{position.avg.toFixed(2)}</td>
                      <td>{position.price.toFixed(2)}</td>
                      <td className={profClass}>{(currVal-position.avg*position.qty).toFixed(2)}</td>
                      <td className={dayClass}>{position.day}</td>
                    </tr>
                      )
                    })}
        </table>
      </div>
    </>
  );
};

export default Positions;
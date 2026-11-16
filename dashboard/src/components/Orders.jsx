import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [myOrders,setMyOrders]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3002/myOrders", { withCredentials: true }).then((res)=>{
      setMyOrders(res.data);
    })
  }, [])


  return (
    <div className="orders">
      {myOrders.length===0 ?(
        <div className="no-orders">
        <p>You haven't placed any orders today</p>

        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div>
      ):(
          <div className="order-table">
    <table>
      <thead>
        <tr>
          <th>Instrument</th>
          <th>Qty.</th>
          <th>Price</th>
          <th>Mode</th>
        </tr>
      </thead>

      <tbody>
        {myOrders.map((order, idx) => (
          <tr key={order._id || idx}>
            <td>{order.name}</td>
            <td>{order.qty}</td>
            <td>{Number(order.price).toFixed(2)}</td>
            <td>{order.mode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
      )}
    </div>
  );
};

export default Orders;
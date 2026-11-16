import { Link } from "react-router-dom";

function OpenAccount() {
  return (   
  <div className='container mt-5'>
    <div className='row text-center'>
      <h1>Open a Zerodha account</h1>
      <p className='par text-center pt-2'>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
      <Link to="/signup" className="btn btn-primary mt-2" style={{width:"25%",margin:"0 auto"}}>Sign Up for Free</Link>
    </div>
  </div> );
}

export default OpenAccount;
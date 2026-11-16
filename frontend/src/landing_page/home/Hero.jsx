import { Link } from "react-router-dom";
function Hero() {
  return ( 
  <div className='container'>
    <div className='row text-center'>
      <img src='media/images/landing.svg'/>
      <h1>Invest in everything</h1>
      <p className='par text-center'>Online platform to invest in stocks, IPOs, derivatives, mutual funds, ETFs, bonds, and more.</p>
      <Link to="/signup" className="btn btn-primary" style={{width:"25%",margin:"0 auto"}}>Sign Up for Free</Link>
    </div>
  </div>
   );
}

export default Hero;
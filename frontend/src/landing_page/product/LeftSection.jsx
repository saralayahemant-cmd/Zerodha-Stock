function LeftSection() {
  return ( <div className="container mt-5">
    <div className="row">
        <div className="col-8 align-items-center">
          <img src="media/images/products-kite.png" style={{width:"65%"}}/>
        </div>
        <div className="col-4 p-5">
          <h3 className="text-muted">Kite</h3>
          <br/>
          <p>Our ultra-fast flagship trading platform with streaming market data, advanced charts,
             an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices.</p>
          <a href="#" style={{marginRight:"15px"}}>Try Demo</a>

          <a href="#">Learn More</a>
        </div>

    </div>
  </div> );
}

export default LeftSection;
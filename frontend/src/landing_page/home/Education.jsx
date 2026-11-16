import { Link } from 'react-router-dom'

function Education() {
  return (    <div className="container mt-5 mb-2">
      <div className="row align-items-center gx-5">
        <div className="col-5">
          <img
            src="media/images/index-education.svg"
            className="img-fluid"
            alt="Ecosystem"
          />
          <div className="text-center">
            <Link to="/product">Explore our products</Link>
            <Link to="" className="ps-3">Try Kite Demo</Link>
          </div>
        </div>

        <div className="col-5 ps-5">
          <h2>Free and open market education</h2>
          <br/>
          <p>
            Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.
          </p>
          <Link to="">Varsity</Link>
          <br/>
          <p>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
          <Link to="/support">TradingQ&A</Link>
        </div>

      </div>
    </div> );
}

export default Education;
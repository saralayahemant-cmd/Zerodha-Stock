import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src="/media/images/logo.svg"
            style={{ width: "130px" }}
            alt="Logo"
          />
        </Link>

        {/* Mobile button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">

            <li className="nav-item">
              <Link className="nav-link px-3" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/product">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/pricing">
                Pricing
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/support">
                Support
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/login">
                Log in
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/signup">
                Sign up
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
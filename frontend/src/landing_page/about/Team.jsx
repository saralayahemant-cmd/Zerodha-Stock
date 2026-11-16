function Team() {
  return (
    <div className="container mt-4">

      <div className="text-center mb-5">
        <h4>People</h4>
      </div>

      <div className="row align-items-center">
        <div className="col d-flex flex-column align-items-center">
          
          <img
            src="media/images/nithin-kamath.jpg"
            className="rounded-circle"
            style={{
              width: "370px",
              height: "370px",
              objectFit: "cover"
            }}
          />

          <p className="mt-4 mb-1">Nithin Kamath</p>

          <p className="text-muted">Founder, CEO</p>

        </div>

        <div className="col me-5 text-muted">

          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>

          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>

          <p>
            Playing basketball is his zen.
          </p>

          <p>
            Connect on Homepage / TradingQnA / Twitter
          </p>

        </div>

      </div>
    </div>
  );
}

export default Team;
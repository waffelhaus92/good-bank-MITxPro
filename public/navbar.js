function NavBar({ user, logout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
      <a className="navbar-brand" href="#">
        FakeBank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">
              Create Account
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/login/">
              Login
            </a>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={logout}>
              Logout
            </button>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/deposit/">
              Deposit
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">
              Withdraw
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/balance/">
              Balance
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">
              AllData
            </a>
          </li>
          <li
            className="nav-item ml-auto"
            style={{
              display: "flex",
              flexDirection: "row",
              float: "flex-end",
            }}
          >
            {user?.name && <h3>{user.name}</h3>}
          </li>
        </ul>
      </div>
    </nav>
  );
}

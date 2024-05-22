function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const [email, setEmail] = React.useState('');

  async function handle() {
    const token = localStorage.getItem('token');
    if (!token) {
      setStatus('Please login to check balance');
      return;
    }

    try {
      const response = await fetch(`/account/findOne/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const text = await response.text();
      const data = JSON.parse(text);

      setStatus('');
      setShow(false);
      setBalance(data.balance);
    } catch (err) {
      console.error('Error fetching balance:', err);
      setStatus('Error fetching balance');
    }
  }

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ? (
        <BalanceForm setShow={setShow} setStatus={setStatus} handle={handle} setEmail={setEmail} />
      ) : (
        <BalanceMsg setShow={setShow} setStatus={setStatus} balance={balance} />
      )}
    />
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success! Your balance is: ${props.balance}</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}
      >
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  return (
    <>
      Email<br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={props.email}
        onChange={(e) => props.setEmail(e.currentTarget.value)}
      /><br />

      <button type="submit" className="btn btn-light" onClick={props.handle}>
        Check Balance
      </button>
    </>
  );
}

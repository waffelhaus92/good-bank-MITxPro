function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handleDeposit(email) {
    const token = localStorage.getItem('token');
    if (!token) {
      setStatus('Please login to deposit');
      return;
    }

    fetch(`/account/update/${email}/${amount}`, {
      method: 'GET', 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          let message = 'Deposit successful!';
          if (data.error) { // Check for error message in the response
            message = data.error;
          }
          setStatus(message);
          setShow(false);
          console.log('JSON:', data);
        } catch (err) {
          setStatus('Deposit failed');
          console.log('err:', text);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setStatus('Deposit failed');
      });
  }

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={
        show ? (
          <DepositForm setShow={setShow} setStatus={setStatus} setAmount={setAmount} handleDeposit={handleDeposit} />
        ) : (
          <DepositMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function DepositMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}
      >
        Make another deposit?
      </button>
    </>
  );
}

function DepositForm(props) {
  const [email, setEmail] = React.useState('');

  function handleDeposit() {
    if (!email) {
      props.setStatus('Please enter your email');
      return;
    }
    props.handleDeposit(email);
  }

  return (
    <>
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={props.amount}
        onChange={(e) => props.setAmount(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handleDeposit}>
        Deposit
      </button>
    </>
  );
}
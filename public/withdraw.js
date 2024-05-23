function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handleWithdraw(email) {
    const token = localStorage.getItem('token');
    if (!token) {
      setStatus('Please login to withdraw');
      return;
    }
  
    fetch(`/account/update/${email}/-${amount}`, {
      method: 'GET', 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          let message = 'Withdrawal successful!';
          if (data.error) { // Check for error message in the response
            message = data.error;
          }
          setStatus(message);
          setShow(false);
          console.log('JSON:', data);
        } catch (err) {
          setStatus('Withdrawal failed');
          console.log('err:', text);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setStatus('Withdrawal failed');
      });
  }

  return (
    <Card
      bgcolor="warning"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <WithdrawForm setShow={setShow} setStatus={setStatus} setAmount={setAmount} handleWithdraw={handleWithdraw} />
        ) : (
          <WithdrawMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function WithdrawMsg(props) {
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
        Make another withdrawl?
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [email, setEmail] = React.useState('');

  function handleWithdraw() {
    if (!email) {
      props.setStatus('Please enter your email');
      return;
    }
    props.handleWithdraw(email);
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
      <button type="submit" className="btn btn-light" onClick={handleWithdraw}>
        Withdraw
      </button>
    </>
  );
}

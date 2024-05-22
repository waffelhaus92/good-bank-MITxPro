function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    
  const [user, setUser]     = React.useState(null);
  
  return (
    <>
      <Card
        bgcolor="secondary"
        header="Login"
        status={status}
        body={
          show ? (
            <LoginForm setShow={setShow} setStatus={setStatus} setUser={setUser} />
          ) : (
            <LoginMsg setShow={setShow} setStatus={setStatus} />
          )
        }
      />
    </>
  );
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setUser } = props;

  function handle() {
    fetch(`/account/login/${email}/${password}`)
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          console.log('Token', data.token);
          // Successful login
          localStorage.setItem('token', data.token);
          setUser(data.user);
          setEmail('');
          setPassword('');
          // Update show state to display success message
          props.setShow(false);
          // Optional: Navigate to a protected route
          // props.history.push('/dashboard');
        } else {
          props.setStatus(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        props.setStatus('An error occurred while logging in');
      });
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}

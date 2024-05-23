const logout = () => {
  // An alert to notify the user they have logged out. 
  alert('You have been logged out successfully');
  console.log('Token deleted');

  // Redirect to the login page after 1 second
  setTimeout(() => {
    localStorage.removeItem('token');
    window.location.href = '/#/login/';
  }, 1000); 
};

function Spa() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const handleLoginMessage = (event) => {
      if (event.data.type === 'USER_LOGIN') {
        setUser(event.data.data); // Update user state with received data
      }
    };

    window.addEventListener('message', handleLoginMessage);

    return () => {
      window.removeEventListener('message', handleLoginMessage); // Cleanup
    };
  }, []);
  
  return (
    <HashRouter>
      <div>
        <NavBar logout={logout} user={user}/>        
        <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);

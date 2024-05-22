function AllData() {
    const [data, setData] = React.useState(''); // State to store fetched data
  
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          // Check for JWT token in local storage 
          const token = localStorage.getItem('token');
          let headers = {};
  
          if (token) {
            headers = {
              Authorization: `Bearer ${token}`,
            };
          }

          console.log('Request Headers:', headers);
          const response = await fetch('/account/all', { headers });
        
          if (response.ok) {
            const jsonData = await response.json();
            setData(jsonData); // Set fetched data directly, avoiding JSON.stringify
          } else {
            console.error('Error fetching data:', response.statusText);
            // Handle unauthorized access (401) or other errors
            if (response.status === 401) {
              // Redirect to login or display an error message
            }
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData(); // Call the function to fetch data on component mount
    }, []); // Empty dependency array: runs only once on component mount
  
    return (
      <>
        <h5>All Data in Store:</h5>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre> // Display data with formatting
        ) : (
          <p>Loading data...</p>
        )}
      </>
    );
  }
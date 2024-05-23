function AllData() {
  const [data, setData] = React.useState(""); // State to store fetched data

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Check for JWT token in local storage
        const token = localStorage.getItem("token");
        let headers = {};

        if (token) {
          headers = {
            Authorization: `Bearer ${token}`,
          };
        }

        console.log("Request Headers:", headers);
        const response = await fetch("/account/all", { headers });

        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData); // Set fetched data directly, avoiding JSON.stringify
        } else {
          console.error("Error fetching data:", response.statusText);
          // Handle unauthorized access (401) or other errors
          if (response.status === 401) {
            // Redirect to login or display an error message
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData(); // Call the function to fetch data on component mount
  }, []); // Empty dependency array: runs only once on component mount

  return (
    <div>
      <Card
        txtcolor="black"
        header="All of the users and their data"
        title="Admin eyes only."
        text={
          data ? (
            <div>
              {Object.keys(data).map((user, index) => (
                <div key={index}>
                  <h3>User {index + 1}</h3>
                  <pre>{JSON.stringify(data[user], null, 2)}</pre>
                </div>
              ))}
            </div>
          ) : (
            <div>Loading data...</div>
          )
        }
      />
    </div>
  );
}

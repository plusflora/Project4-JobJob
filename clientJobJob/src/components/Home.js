
import { useState, useEffect } from 'react';
import { getAllApplications } from "../api/application";

const Home = (props) => {
  const { user } = props;

  const [applications, setApplications] = useState(null);

  useEffect(() => {
    if (user?.token) { // Ensure user token exists
      getAllApplications(user.token)
        .then(response => {
          setApplications(response.data);
          console.log('Applications:', response.data); // Log applications
        })
        .catch(error => console.error(error));
    }
  }, [user?.token]);

  return (
    <>
      <h2>Home Page</h2>
      {/* Render your applications here */}
    </>
  );
};

export default Home;
// import { useState, useEffect } from 'react';
// import { getAllApplications } from "../api/application";
import ApplicationsIndex from './applications/ApplicationsIndex';

const Home = (props) => {
  const { user } = props;

  // const [applications, setApplications] = useState(null);
	// const { user, msgAlert } = props;

  // const [applications, setApplications] = useState(null);

  // useEffect(() => {
  //   if (user?.token) {
  //     getAllApplications(user.token)
  //       .then(response => {
  //         setApplications(response.data.applications);
  //         console.log('Applications:', response.data.applications);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching applications:', error);
  //       });
  //   }
  // }, [user?.token]);

  return (
    <>
      <h2>Home Page</h2>
      {/* {applications == null ? <p>No apps yet</p> : (
        applications.length === 0 ? <p>No apps yet</p> : (
          <p>{applications[0].fullTitle}</p>
        )
      )} */}
			<ApplicationsIndex user={user} />

    </>
  );
};

export default Home;
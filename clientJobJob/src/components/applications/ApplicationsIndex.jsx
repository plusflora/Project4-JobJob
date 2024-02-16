import { useState, useEffect } from 'react';
import { getAllApplications } from '../../api/application';
import LoadingScreen from "../shared/LoadingScreen";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const cardContainerLayout = {
  display: 'flex', 
  flexFlow: 'row wrap',
  justifyContent: 'center'
}

const ApplicationsIndex = (props) => {
  const { user } = props;
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    // Fetch applications only if the user is logged in and has a token
    if (user?.token) {
      getAllApplications(user.token, user._id) // Pass user's ID to fetch only their applications
        .then(response => {
          console.log('Applications response:', response.data);
          setApplications(response.data.applications); // Adjust to access the correct property of the response data
        })
        .catch(error => {
          console.error('Error fetching applications:', error);
        });
    }
  }, [user?.token, user?._id]);

  console.log('Applications state:', applications);
  
  if (!user) {
    return null; // Render nothing if user is not logged in
  }
  
  if (!applications) {
    return <LoadingScreen />
  } else if (applications.length === 0 ) {
    return <p>No apps yet, go apply for jobs</p>
  }

  const applicationCards = applications.map(application => (
    <Card key={application.id} style= {{ width: '30%', margin: 5 }}>
      <Card.Header>{application.fullTitle}</Card.Header>
      <Card.Body>
        <Card.Text>
          <Link to={`/applications/${application.id}`} className='btn btn-info' onClick={() => console.log('Clicked ID:', application.id)}>
            View Application
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  ));

  return (
    <>
      <div className="container-md" style={ cardContainerLayout }>
        { applicationCards }
      </div>

    </>
  );
};

export default ApplicationsIndex;
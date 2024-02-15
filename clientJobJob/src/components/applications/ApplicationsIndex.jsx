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
    // console.log('Fetching applications...');
    if (user?.token) {
      getAllApplications(user.token)
        .then(response => {
          console.log('Applications response:', response.data);
          setApplications(response.data.applications);
        })
        .catch(error => {
          console.error('Error fetching applications:', error);
        });
    }
  }, [user?.token]);

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
  ))

  return (
    <>
      <div className="container-md" style={ cardContainerLayout }>
        { applicationCards }
      </div>
      {/* comment this out when you're done! */}
      <p>Something</p>
    </>
  );
};

export default ApplicationsIndex;
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneApplication, removeApplication, updateApplication } from '../../api/application'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import EditApplicationModal from './EditApplicationModal'



const ApplicationShow = (props) => {
  const {applicationId} = useParams()
  const { user, msgAlert } = props

  const [application, setApplication] = useState(null)

  const [editModalShow, setEditModalShow] = useState(false)

  const [updated, setUpdated] = useState(false)

  const navigate = useNavigate()

  // console.log('props in appshow', props)
  console.log('id param in appshow', applicationId)

  useEffect(() => {
    // Check if user and user.token are valid
      getOneApplication(user.token, applicationId)
        .then(res => {
          setApplication(res.data.application);
          console.log('Application:', res.data.application);
        })
        .catch(err => {
          msgAlert({
            heading: 'Oh no',
            message: 'Something went wrong',
            variant: 'whoops'
          });
        });

  }, [applicationId, user, msgAlert, updated]); // needs the user since the api is calling it

  const deleteApplication = () => {
    removeApplication(user.token, application._id)
      .then(() => navigate('/'))
      .catch(err => {
        msgAlert({
          heading: 'Oh no',
          message: 'Something went wrong',
          variant: 'whoops'
        });
      })
  }

  if (!application) {
    <LoadingScreen />
  }

  return (
    <>
      {application && (
        <>
          <Container className='m-2'>
            <Card>
              <Card.Header>
                {application.fullTitle}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <small>Company: {application.cName} </small><br />
                  <small>Applied: {application.aStatus ? "Yes": "No" } </small><br />
                  <small>Interview: {application.interview ? "Yes" : "No" } </small><br />
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                {application.owner && user && application.owner._id === user._id && (
                  <>
                    <Button className="ml-2" variant='danger' onClick={() => deleteApplication()}>Delete App</Button>
                    <Button className="ml-2" variant='warning' onClick={() => setEditModalShow(true)}>Update Application</Button>
                  </>
                )}
              </Card.Footer>
            </Card>
          </Container>
          <EditApplicationModal 
            user={user}
            show={editModalShow}
            updateApplication={updateApplication}
            msgAlert={msgAlert}
            handleClose={() => setEditModalShow(false)}
            application={application}
            triggerRefresh={() => setUpdated(prev => !prev)}
          />
        </>
      )}
    </>
  );
}

export default ApplicationShow
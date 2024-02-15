import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOneApplication } from '../../api/application'
import LoadingScreen from '../shared/LoadingScreen'
import { Container, Card } from 'react-bootstrap'


const ApplicationShow = (props) => {
  const {applicationId} = useParams()
  const { user, msgAlert } = props

  const [application, setApplication] = useState(null)

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

  }, [applicationId, user, msgAlert]); // needs the user since the api is calling it


  if (!application) {
    <LoadingScreen />
  }

  return (
    <>
      {application && (
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

            </Card.Footer>
          </Card>
        </Container>
      )}
    </>
  )
}

export default ApplicationShow
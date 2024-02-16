import {useState} from 'react'
import { Modal } from 'react-bootstrap'
import ApplicationForm from '../shared/ApplicationForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditApplicationModal = (props) => {
  const { user, show, handleClose, updateApplication, msgAlert, triggerRefresh} = props

  const [application, setApplication] = useState(props.application)

  const onChange = (name, value) => {
    setApplication(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name, checked) => {
    setApplication(prevApplication => ({
      ...prevApplication,
      [name]: checked
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  
    updateApplication(user.token, application)
      .then(() => {
        handleClose();
        msgAlert({
          heading: 'Success',
          message: 'Updated the application',
          variant: 'success'
        });
      })
      .catch(() => {
        msgAlert({
          heading: 'Oh no',
          message: 'Something went wrong',
          variant: 'error'
        });
      });
  };

  return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton />
      <Modal.Body> 
        <ApplicationForm
          application={application}
          handleChange={onChange}
          handleCheckboxChange={handleCheckboxChange}
          handleSubmit={onSubmit}
          heading="Update Application"
        />
      </Modal.Body>
    </Modal>
  )
}

export default EditApplicationModal
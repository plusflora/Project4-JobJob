import { Form, Button, Container } from 'react-bootstrap';

const ApplicationForm = (props) => {
  const { application, handleChange, handleCheckboxChange, handleSubmit, heading } = props;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    handleChange(name, value);
  };

  return (
    <Container className="justify-content-center">  
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='m-2'>
          <Form.Label>Job Title: </Form.Label>
          <Form.Control 
            placeholder="Job Title"
            name="title"
            value={application.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Label>Company: </Form.Label>
          <Form.Control 
            placeholder="Company Name"
            name="cName"
            value={application.cName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Label>Application Date: </Form.Label>
          <Form.Control 
            type="date"
            name="aDate"
            value={application.aDate || ''}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Check 
            type="checkbox"
            label="Application Status"
            id="aStatus"
            checked={application.aStatus}
            onChange={(e) => handleCheckboxChange('aStatus', e.target.checked)}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Check 
            type="checkbox"
            label="Interview"
            id="interview"
            checked={application.interview}
            onChange={(e) => handleCheckboxChange('interview', e.target.checked)}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default ApplicationForm;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplicationForm from '../shared/ApplicationForm';
import { createApplication } from '../../api/application';

const ApplicationCreate = ({ user }) => {
  const navigate = useNavigate();
  const [application, setApplication] = useState({
    title: '',
    cName: '',
    aDate: null,
    aStatus: false,
    interview: false
  });

  const handleChange = (name, value) => {
    setApplication(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    handleChange(name, value);
  };

  const handleCheckboxChange = (name, value) => {
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createApplication(user, application);
      setApplication({
        title: '',
        cName: '',
        aDate: null,
        aStatus: false,
        interview: false
      });
      navigate('/'); // Navigate to the home page
    } catch (error) {
      console.error('Error creating application:', error);
    }
  };

  return (
    <ApplicationForm
      application={application}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      handleCheckboxChange={handleCheckboxChange}
      heading="Add a new Application"
    />
  );
};

export default ApplicationCreate;
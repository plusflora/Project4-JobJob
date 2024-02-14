// the command to run this will be npm run seed
const mongoose = require('mongoose')
const Application = require('./application')
const db = require('../../config/db')

const today = new Date()

const startApps = [
  { title: 'Jr Software Engineer', cName: 'Uber', aDate: null, aStatus: true, interview: false},
  { title: 'Engineering Apprentice', cName: 'Airbnb', aDate: today, aStatus: true, interview: false},
  { title: 'Staff Software Engineer', cName: 'Discord', aDate: null, aStatus: false, interview: false},
]

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {
    Application.deleteMany({ owner: null })
      .then(deletedApplications => {
        console.log('deleted Applications in seed script:', deletedApplications);

        Application.create(startApps)
          .then(newApplications => {
            console.log('new applications added to db:\n', newApplications);
            mongoose.connection.close(); // Close the MongoDB connection after operations are complete
          })
          .catch(error => {
            console.log('an error has occurred:\n', error);
            mongoose.connection.close(); // Close the MongoDB connection if an error occurs
          });
      })
      .catch(error => {
        console.log('an error has occurred:\n', error);
        mongoose.connection.close(); // Close the MongoDB connection if an error occurs
      });
  })
  .catch(error => {
    console.log('Failed to connect to MongoDB:', error);
  });
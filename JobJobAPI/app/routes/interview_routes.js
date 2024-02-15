const express = require('express')
const passport = require('passport')

const Interview = require('../models/interview')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const Application = require('../models/application')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()


// CREATE
// POST /interview
router.post('/interview/:applicationId', requireToken, (req, res, next) => {
  const interviewData = req.body.interview;
  const applicationId = req.params.applicationId;

  const interview = new Interview(interviewData); // Create a new interview instance
  interview.save() // Save the interview to the database
    .then(savedInterview => {
      // Find the application by ID and associate the interview with it
      return Application.findById(applicationId)
        .then(handle404)
        .then(application => {
          application.interviews.push(savedInterview);
          return application.save();
        });
    })
    .then(application => res.status(201).json({ application }))
    .catch(next);
});
// UPDATE
// PATCH /interview/5a7db6c74d55bc51bdf39793/209134808098dcvs7e9835n21234
router.patch('/interview/:applicationId/:interviewId', requireToken, removeBlanks, (req, res, next) => {
  const { applicationId, interviewId } = req.params;

  Application.findById(applicationId)
      .populate('interviews') // Populate the interviews array with actual interview documents
      .then(application => {
          if (!application) {
              throw new Error('Application not found');
          }

          // Find the interview by its _id
          const theInterview = application.interviews.find(interview => interview._id.toString() === interviewId);
          if (!theInterview) {
              throw new Error('Interview not found');
          }

          requireOwnership(req, application);

          // Update the interview with the request body data
          Object.assign(theInterview, req.body.interview);

          return application.save();
      })
      .then(application => {
          res.sendStatus(204); // Send 204 status code for successful update
      })
      .catch(next);
});

// DESTROY
// DELETE /interview/5a7db6c74d55bc51bdf39793/209134808098dcvs7e9835n21234
router.delete('/interview/:applicationId/:interviewId', requireToken, removeBlanks, (req, res, next) => {
  const { applicationId, interviewId } = req.params;

  Application.findById(applicationId)
      .populate('interviews') // Populate the interviews array with actual interview documents
      .then(application => {
          if (!application) {
              throw new Error('Application not found');
          }

          // Find the index of the interview in the interviews array
          const index = application.interviews.findIndex(interview => interview._id.toString() === interviewId);
          if (index === -1) {
              throw new Error('Interview not found');
          }

          requireOwnership(req, application);

          // Remove the interview from the interviews array
          application.interviews.splice(index, 1);

          return application.save();
      })
      .then(application => {
          res.sendStatus(204); // Send 204 status code for successful deletion
      })
      .catch(next);
});


module.exports = router

import { useState } from 'react'

const ApplicationCreate = (props) => {
  const { user, msgAlert } = props

  const  [application, setApplication] = useState({
    title: '',
    cName: '',
    aDate: null,
    aStatus: true,
    interview: false
  })

  return(
    <h1>Add a new Application</h1>
  )
}

export default ApplicationCreate
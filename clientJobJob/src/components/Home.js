import { useState, useEffect } from "react"
import { getAllApplications } from "../api/application"

const Home = (props) => {
	// const { msgAlert, user } = props
	// console.log('props in home', props)

	const [applications, setApplications] = useState(null)

	useEffect(() => {
			getAllApplications()
					.then(applications => console.log(res.data))
					.catch(error => console.error(error))
	}, []) 

	return (
		<>
			<h2>Home Page</h2>
		</>
	)
}

export default Home

import React, {useEffect, useState} from 'react'
import fetchJobs from './ApiCall'
import '../Styling/Postings.css'

function Postings() {
    const [allJobs, setJobs] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')

useEffect(() => {
    const loadJobs = async () => {
        try {
            setLoading(true)
            const jobs = await fetchJobs()
            setJobs(jobs)
            setLoading(false)
        } catch (error) {
            setError('Sorry, we are experiencing an issue. Please try again later!')
        }
    }
    loadJobs()
}, [])

return allJobs.map(job => {
  return (
        <div className='mainPostingsWrapper'>
            <div className='logoWrapper'>
                <img className='companyLogo' src={job.company_logo} alt='company logo'/>
            </div>
            <div className='contentWrapper'>
                <div className='positionWrapper'>
                    <h2 className='title'>Position:</h2>
                    <p>{job.title}</p>
                    <h2 className='company'>Company:</h2>
                    <p>{job.company_name}</p>
                </div>
    
            </div>
        </div>
)})
    
}

export default Postings
import React, {useEffect, useState} from 'react'
import fetchJobs from './ApiCall'
import '../Styling/Postings.css'
import moment from 'moment'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Select from 'react-select'

function Postings() {
    const [allJobs, setJobs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filteredJob, setFilteredJob] = useState(null);
    

useEffect(() => {
    const loadJobs = async () => {
        try {
            setLoading(true)
            const jobs = await fetchJobs()
            setJobs(jobs)
            setLoading(false)
        } catch (error) {
            setError('Sorry, we are experiencing an issue. Please try again later!');
        }
    }
    loadJobs()
}, []);


const jobOptions = [...new Set(allJobs.map(job => job.candidate_required_location))].map(location => ({
    value: location,
    label: location
}));

  const handleChange = (selectedOption) => {
    setFilteredJob(selectedOption);
  }

  let filteredJobs = allJobs;
  
  if(filteredJob){
      filteredJobs = allJobs.filter(job => job.candidate_required_location === filteredJob.label)
  };


const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
const minPage = Math.max(currentPage - 2, 1);
const maxPage = Math.min(currentPage + 2, totalPages);

if (loading) {
    return  <p className='loadingText'><span>.</span>
    <span>.</span>
    <span>.</span>
    <span>l</span>
    <span>o</span>
    <span>a</span>
    <span>d</span>
    <span>i</span>
    <span>n</span>
    <span>g</span>
    </p>
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }


return (
    <>
    <label htmlFor='location'>Select By Location:</label>
     <Select
              name='location'
              options={jobOptions}
              onChange={handleChange}
              placeholder="Search for a job..."
            />
     {filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(job => (
        <div className='mainPostingsWrapper'>
            <div className='logoWrapper'>
                <img className='companyLogo' src={job.company_logo} alt={job.company_name}/>
            </div>
            <div className='contentWrapper'>
                <div className='firstContent'>
                    <p className='title'><strong>Position: </strong>{job.title}</p>
                    <p className='company'><strong>Company: </strong>{job.company_name}</p>
                    <p className='pay'><strong>Pay: </strong> {job.salary ? job.salary : 'Not Available'}
                    </p>
                </div>
                <div className='secondContent'>
                <p className='title'><strong>Posted: </strong>{moment(job.publication_date).format('MMM DD YYYY')}</p>
                    <p className='company'><strong>Candidate Location: </strong>{job.candidate_required_location}</p>
                        <Link to={`/posting/${job.id}`} className='moreDetails'>...More Details</Link>
                </div>
            </div>
        </div>
    
))}
<p className='displayingPages'>Currently Displaying 10 items per page.</p>
<div className='buttonSection'>
 <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>Previous</button>
            {Array.from({length: maxPage - minPage + 1}, (_, i) => i + minPage).map(pageNumber => (
                <button key={pageNumber} style={currentPage === pageNumber ? {backgroundColor: 'lightgreen'} : {}} onClick={() => setCurrentPage(pageNumber)}>
                    {pageNumber}
                </button>
            ))}
            <button onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
        </div>
        </>
)
}

Postings.propTypes = {
    allJobs: PropTypes.shape({
        title: PropTypes.string.isRequired,
        publication_date: PropTypes.number.isRequired,
    })
}
     

export default Postings
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import fetchJobs from './ApiCall'
import { useParams } from 'react-router-dom'
import '../Styling/SinglePosting.css'

function SinglePosting() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [readMore, setReadMore] = useState(false)
  const { id } = useParams(); 

  useEffect(() => {
      const loadJobDetails = async () => {
          try {
              setLoading(true);
              const jobs = await fetchJobs(); 
              const foundJob = jobs.find(job => job.id === parseInt(id)); 
              if (foundJob) {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = foundJob.description;
                foundJob.plainDescription = tempDiv.textContent || tempDiv.innerText || "";
                setJob(foundJob);
              } else {
                  setError('Job not found');
              }
              setLoading(false);
          } catch (error) {
              setError('Sorry, we are experiencing an issue. Please try again later!');
              setLoading(false);
          }
      };
      loadJobDetails();
  }, [id]);

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

  const formattedDescription = job?.description  ? (readMore ? job?.plainDescription : `${job?.plainDescription.substring(0, 500)}...`) : ';'

  return (
    <div className='detailsWrapper'>
      <div className='positionContent'>
        <img src={job?.company_logo} alt={job?.company_name}/>
        <p className='title'><strong>Position: </strong>{job?.title}</p>
        <p className='company'><strong>Company: </strong>{job?.company_name}</p>
        <p className='pay'><strong>Pay: </strong> {job?.salary ? job.salary : 'Not Available'}</p>
      </div>
      <div className='locationContent'>
        <p className='title'><strong>Posted: </strong>{moment(job?.publication_date).format('MMM DD YYYY')}</p>
        <p className='company'><strong>Candidate Location: </strong>{job?.candidate_required_location}</p>
        <p className='description'><strong>Job Description: </strong> {formattedDescription}
        <span className='read-more-link' onClick={() => setReadMore(!readMore)}>
        {readMore ? 'Read Less' : 'Read More'}
    </span>
    </p>
      </div>
    </div>
  );
}



export default SinglePosting
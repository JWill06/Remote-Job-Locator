import React, {useEffect, useState} from 'react'
import fetchJobs from './ApiCall'
import '../Styling/Postings.css'
import moment from 'moment'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { useSavedJobs } from './SavedPostingsContext'

function Postings() {
    const [allJobs, setJobs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filterTitle, setFilterTitle] = useState(localStorage.getItem('filterTitle') || '');
    const [filterLocation, setFilterLocation] = useState(localStorage.getItem('filterLocation') || '');
    const { saved ,addForLater} = useSavedJobs();
    

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
    if (localStorage.getItem('filterTitle')) {
        setFilterTitle(localStorage.getItem('filterTitle'));
    }
    if (localStorage.getItem('filterLocation')) {
        setFilterLocation(localStorage.getItem('filterLocation'));
    }
}, []);

useEffect(() => {
    const filteredJobs = allJobs.filter(job => {
      const locationMatches = filterLocation === '' || job.candidate_required_location.toLowerCase().includes(filterLocation.toLowerCase());
      const titleMatches = filterTitle ? job.title.toLowerCase().includes(filterTitle.toLowerCase()) : true;
      return locationMatches && titleMatches;
    });
  }, [filterLocation, filterTitle]);

  const jobOptions = [
    { value: 'all', label: 'All Locations' },
    ...Array.from(new Set(allJobs.map(job => job.candidate_required_location))).map(location => ({
      value: location,
      label: location
    })),
  ];
  const handleChange = (e) => {
    const { name, value} = e.target;
    switch (name) {
        case 'filterTitle':
            setFilterTitle(value)
            localStorage.setItem('filterTitle', value);
            break;
        default:
            break;
    }
  }

  const handleSelectedFilter = (selectedOption) => {
    if (selectedOption && selectedOption.value === 'all') {
      setFilterLocation('');
      localStorage.setItem('filterLocation', ''); 
    } else {
      setFilterLocation(selectedOption ? selectedOption.label : '');
      localStorage.setItem('filterLocation', selectedOption ? selectedOption.label : ''); 
    }
  };

  
  const filteredJobs = allJobs.filter(job => {
    const locationMatches = filterLocation ? job.candidate_required_location.toLowerCase().includes(filterLocation.toLocaleLowerCase()) : true;
    const titleMatches = filterTitle ? job.title.toLowerCase().includes(filterTitle.toLowerCase()) : true;
    return locationMatches && titleMatches 
  });

const totalMatchingItems = filteredJobs.length;

const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
const minPage = Math.max(currentPage - 2, 1);
const maxPage = Math.min(currentPage + 2, totalPages);

if (loading) {
    return  <p className='loadingText'>
    <span>.</span>
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
      <div className='errorMessage'>
        <p>{error}</p>
      </div>
    );
  }
  
  
  return (
      <>
    <div className='filterInputs'>
        <div className='titleFilter'>
            <label htmlFor='filterTitle'>Search by title:</label>
            <input
                name="filterTitle"
                type="text"
                placeholder="Title"
                value={filterTitle}
                onChange={handleChange}
            />
        </div>
        <div className='locationFilter'>
            <label htmlFor='location'>Select By Location:</label>
            <Select
              name='location'
              options={jobOptions}
              onChange={handleSelectedFilter}
              placeholder="Location..."
            />
        </div>

    </div>
    {totalMatchingItems > 0 &&

<p className='displayingPages'> {`${totalMatchingItems}`}  postings.</p>
}
     {filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(job => (
        <div key={job.id}className='mainPostingsWrapper'>
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
                        <button className={saved.find(savedJob => savedJob.id === job.id) ? 'alreadySaved' : 'saveForLater'} disabled={saved.find(savedJob => savedJob.id === job.id)} onClick={() => addForLater(job)} aria-label={`Save ${job.title} for later`}>
                        {saved.find(savedJob => savedJob.id === job.id) ? 'saved' : 'save'}
                        </button>
                </div>
            </div>
        </div>
    
))}
{totalMatchingItems > 0 ? (
    <p className='displayingPages'> {`${totalMatchingItems}`} postings.</p>
) : (
    <p className='displayingPages' style={{color: 'red'}}>Nothing to display, try a different search!</p>
)}
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
    allJobs: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        publication_date: PropTypes.number.isRequired,
        candidate_required_location: PropTypes.string.isRequired,
        salary: PropTypes.number,
        company_name: PropTypes.string.isRequired,
        company_logo: PropTypes.string,
    }))
}
     

export default Postings
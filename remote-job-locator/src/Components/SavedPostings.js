import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useSavedJobs } from './SavedPostingsContext';
import '../Styling/SavedPostings.css'

function SavedPostings() {
    const { saved, handleDelete } = useSavedJobs(); 

    return (
        <div className='savedWrapper'>
            <h1 className='mainHeader'>Saved Postings</h1>
        <div className='allSavedContent'>
        {!saved || saved.length === 0 ? (
            <div className='noContentSaved'>
                <h1>No current postings saved.</h1>
                <h2>Click below to find some postings desired for you!</h2>
                <button className='backToPostings'>
                    <Link className='backToPostingsLink' to='/postings'>Back to Postings</Link>
                </button>
            </div>
) : 
            saved.map(fav => (
                <div className='mainPostingsWrapper' key={fav.id}>
                    <div className='logoWrapper'>
                        <img className='companyLogo' src={fav.company_logo} alt={fav.company_name} />
                    </div>
                    <div className='contentWrapper'>
                        <div className='firstContent'>
                            <p className='title'><strong>Position: </strong>{fav.title}</p>
                            <p className='company'><strong>Company: </strong>{fav.company_name}</p>
                            <p className='pay'><strong>Pay: </strong>{fav.salary ? fav.salary : 'Not Available'}</p>
                        </div>
                        <div className='secondContent'>
                            <p className='title'><strong>Posted: </strong>{moment(fav.publication_date).format('MMM DD YYYY')}</p>
                            <p className='company'><strong>Candidate Location: </strong>{fav.candidate_required_location}</p>
                            <Link to={`/posting/${fav.id}`} className='moreDetails'>...More Details</Link>
                            <button className='deletePosting' onClick={() => handleDelete(fav.id)}>Remove</button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            </div>
        
    );
}

export default SavedPostings
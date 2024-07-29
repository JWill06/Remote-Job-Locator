import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

function SavedPostings({ favorite, onDelete }) {
    return (
      favorite?.length > 0 ? (
        favorite.map(fav => (
          <div className='mainPostingsWrapper' key={fav.id}>
            <div className='logoWrapper'>
              <img className='companyLogo' src={fav.company_logo} alt={fav.company_name} />
            </div>
            <div className='contentWrapper'>
              <div className='firstContent'>
                <p className='title'><strong>Position: </strong>{fav.title}</p>
                <p className='company'><strong>Company: </strong>{fav.company_name}</p>
                <p className='pay'><strong>Pay: </strong> {fav.salary ? fav.salary : 'Not Available'}</p>
              </div>
              <div className='secondContent'>
                <p className='title'><strong>Posted: </strong>{moment(fav.publication_date).format('MMM DD YYYY')}</p>
                <p className='company'><strong>Candidate Location: </strong>{fav.candidate_required_location}</p>
                <Link to={`/posting/${fav.id}`} className='moreDetails'>...More Details</Link>
                <button className='DeletePosting' onClick={() => onDelete(fav.id)}>Remove</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h1>No current postings saved.</h1>
          <h2>Click below to find some postings desired for you!</h2>
          <button className='backToPostings'>
            <Link className='backToPostingsLink' to='/postings'>Postings</Link>
          </button>
        </div>
      )
    );
  }

export default SavedPostings
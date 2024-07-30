import React, { useState, useEffect } from 'react';
import moment from 'moment';
import fetchJobs from './ApiCall';
import { Link, useParams } from 'react-router-dom';
import '../Styling/SinglePosting.css';
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';
import cheerio from 'cheerio';
import { useSavedJobs } from './SavedPostingsContext';

function SinglePosting() {
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { saved ,addForLater} = useSavedJobs();

  useEffect(() => {
    const loadJobDetails = async () => {
      try {
        setLoading(true);
        const jobs = await fetchJobs();
        const foundJob = jobs.find(job => job.id === parseInt(id));
        if (foundJob) {
          const jsxDescription = ReactHtmlParser(foundJob.description, {
            transform: (node, index) => {
              if (node.type === 'tag' && node.name === 'a') {
                if (node.attribs && node.attribs.href && node.attribs.href.trim()) {
                  node.attribs.target = '_blank';
                  return <a key={index} href={decodeURIComponent(node.attribs.href)}>{node.children[0].data}</a>;
                }
              }
            },
          });

          const $ = cheerio.load(foundJob.description);
          const aboutCompanyLinks = [];
          $('a').each((index, element) => {
            const href = $(element).attr('href');
            if (href && href.startsWith('http')) {
              aboutCompanyLinks.push(href);
            }
          });

          setJob({ ...foundJob, jsxDescription, aboutCompanyUrls: aboutCompanyLinks });
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
    return <p className='loadingText'>Loading...</p>;
  }

  if (error) {
    return <div><p>{error}</p></div>;
  }

  return (
    <div className='detailsWrapper'>
      <div className='positionContent'>
        <img src={job.company_logo} alt={job.company_name} />
        <p className='title'><strong>Position: </strong>{job.title}</p>
        <p className='company'><strong>Company: </strong>{job.company_name}</p>
        <p className='pay'><strong>Pay: </strong> {job.salary ? job.salary : 'Not Available'}</p>
      </div>
      <div className='locationContent'>
        <p className='title'><strong>Posted: </strong>{moment(job.publication_date).format('MMM DD YYYY')}</p>
        <p className='company'><strong>Candidate Location: </strong>{job.candidate_required_location}</p>
        <p className='description'><strong>Job Description: </strong>{job.jsxDescription}</p>
        {job?.aboutCompanyUrls?.length === 0 ? (
        <p>No URL provided, please contact the company or visit their main site.</p>
      ) : (
        job?.aboutCompanyUrls?.map((url, index) => (
          <button
            key={index}
            className='companyPosting'
            onClick={() => {
              const absoluteUrl = url.startsWith('http://') || url.startsWith('https://')
                ? url
                : 'https://' + url;
              window.open(absoluteUrl, '_blank');
            }}
            style={{content: `${url}`}}
            title={`Visit ${url}`}
          >
            Visit Site
          </button>
        ))
      )}
      <button className='backButton'>
        <Link className='backLink' to='/postings'>Back</Link>
      </button>
      <button className={saved.find(savedJob => savedJob.id === job.id) ? 'saved' : 'saveLater'} disabled={saved.find(savedJob => savedJob.id === job.id)} onClick={() => addForLater(job)} aria-label={`Save ${job.title} for later`}>
        {saved.find(savedJob => savedJob.id === job.id) ? 'saved' : 'save'}
        </button>
    </div>
  </div>
  );
}

export default SinglePosting;

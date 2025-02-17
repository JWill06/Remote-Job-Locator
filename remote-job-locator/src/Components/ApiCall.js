const fetchJobs = async ()  =>{
    try {
        const res = await fetch('https://remotive.com/api/remote-jobs')
        if(!res.ok){
            if(res.status >= 500){
                throw new Error('Server issues, try again later.')
            }
            throw new Error('Failed at fetch')
        }
        const data = await res.json()
        return data.jobs
    } catch (error) {
        console.error('Failed to fetch records', error)
        throw error
    }
}

export default fetchJobs
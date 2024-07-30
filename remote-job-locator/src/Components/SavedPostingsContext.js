import React, { createContext, useContext, useState } from 'react';

const SavedJobsContext = createContext();

export const useSavedJobs = () => useContext(SavedJobsContext);

export const SavedPostingsContext = ({ children }) => {
    const [saved, setSaved] = useState([]);

    const addForLater = (job) => {
        const isAlreadySaved = saved.some(save => save.id === job.id)
        if(!isAlreadySaved){
            setSaved(prevSaved => [...prevSaved, job]);
        }
    };

    const handleDelete = (jobId) => {
        setSaved(saved => saved.filter(save => save.id !== jobId));
    };

    return (
        <SavedJobsContext.Provider value={{ saved, addForLater, handleDelete }}>
            {children}
        </SavedJobsContext.Provider>
    );
};

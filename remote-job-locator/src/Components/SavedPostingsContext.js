import React, { createContext, useContext, useState } from 'react';

const SavedJobsContext = createContext();

export const useSavedJobs = () => useContext(SavedJobsContext);

export const SavedPostingsContext = ({ children }) => {
    const [saved, setSaved] = useState(() => {
        const savedFromLocalStorage = localStorage.getItem('savedPosts');
        return savedFromLocalStorage ? JSON.parse(savedFromLocalStorage) : [];
    });
    
    const addForLater = (job) => {
        const isAlreadySaved = saved.some(save => save.id === job.id);
        if (!isAlreadySaved) {
            setSaved(prevSaved => {
                const newSaved = [...prevSaved, job];
                localStorage.setItem('savedPosts', JSON.stringify(newSaved));
                return newSaved;
            });
        }
    };
    
    const handleDelete = (jobId) => {
        if (window.confirm("Are you sure you want to remove this posting?")) {
        setSaved(saved => {
            const newSaved = saved.filter(save => save.id !== jobId);
            localStorage.setItem('savedPosts', JSON.stringify(newSaved));
            return newSaved;
        });
        }
    };

    return (
        <SavedJobsContext.Provider value={{ saved, addForLater, handleDelete }}>
            {children}
        </SavedJobsContext.Provider>
    );
};

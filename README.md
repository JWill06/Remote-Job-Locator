# Remote Job Locator

## Abstract 
Remote Job Locator is built with React and tested with Cypress. This project was built to create a replicate of a job finder and the API used is from an official job posting site/finder which is [here](https://remotive.com/). As a user you will be able to search for a desired job by either title, location or both. Once you see a posting you might be interested in you can click on the details link and be taken to more details for that specific posting. Users are also able to save postings if they want to come back to them as well as remove them from their saved page if they have no interest or applied for them already. 

## Preview
![remote-job-locator](https://github.com/user-attachments/assets/098d4772-bdb7-4390-9d90-1dba2129c52d)


## Installation Instructions 
### To start the app
- [ ]  Clone down the repository onto your local machine using `git clone https://github.com/jwill06/Remote-Job-Locator`
- [ ]  Once cloned down, cd into the directory and then cd into the sub-directory `remote-job-locator` and install dependencies by running `npm install`
- [ ]  Run `npm start` then visit the local host to view the application in your browser.

### To test with Cypress
- [ ]  Type `npm install cypress --save-dev` into your terminal
- [ ]  Type `npm run cy:open #` in your terminal then visit the local host to view the application in your browser.
- [ ]  Click E2E testing
- [ ]  Click Start E2E Testing in your default browser

## Learning Goals
- To effectively use React-Router to make a multiple page application
- To implement a filtering feature for postings
- Making a large application with specific limits per page and creating multiple pages

## Technologies Used
- HTML
- CSS
- React
- Cypress

## Challenges
- I had to implement useContext in order to save postings for the users.
- I also had to implement localStorage for users to go back when searching and that search still showing results, as well us keeping the saved posting for the user on their savedPostings page.
- The API used had the description wrapped in html text so I had to install a library that would pull everything out and re-add it back in.

## Wins
- Creating a useable product that someone might actually use.
- Learning more libraries and other dependancies outside of class content to get the project to work as intended.

## Authors 
- Jordan Williamson, williamsonjordan05@gmail.com

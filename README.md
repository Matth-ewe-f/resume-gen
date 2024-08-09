# Title
Create perfectly tailored resumes for any job in minutes. See the [Installation Guide](#installation-guide) to get started.

## Description
*title* allows you to easily create dozens of resumes tailored to a myriad of diverse job positions. Text that you write for one resume is saved, and can be added to another resume in a single click. Individual bullet points under any heading can be toggled on and off, allowing you to highlight exactly what you want about your experiences. Past resumes can be saved, duplicated, edited, and redownloaded, so you'll never have to wrack your brain to remember how you phrased that *one bullet point* you deleted even though it was *just perfect*.

*title* was created by Matthew Flynn to assist in his post-graduation job search. At its inception it was meant to be a simple personal project, and so this public-facing version is still a work in progress. See [Limitations](#current-limitations) for more details.

## Built With
* [Next.js](https://nextjs.org/)
* [React](https://react.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Express.js](https://expressjs.com/)

## Installation Guide
1. [Install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

2. Clone this repository with

    `git clone https://github.com/Matth-ewe-f/resume-gen`

3. Install dependencies by running in the root folder

    `npm i`

4. Build and start the software by running in the root folder

    `npm run build`

    `npm run start`

5. Visit `localhost:3000` in your browser to see the application running

## Current Limitations

### User Interface
* Parts of the user interface are a little bit unintuitive. Particularly there are items in the resume which, when clicked, allow edits, and others which need to be edited through widgets on the sides on the screen.
* Future solutions:
    * The UI may be incrementally improved upon as the project develops.

### Layout and Design
* The design of the resume (layout, colors, fonts, etc.) is completely fixed. The only customization options apply to the text content of the resume.
* Workaround: Anyone with knowledge of React and Tailwind CSS can adjust the design by modifying the code in `client/app/page.tsx`. However, because this was not the intended behavior of users, the file is not written in a way that is condusive to this. 
* Future solutions:
    * `client/app/page.tsx` may be refactored into multiple files which make it clear to advanced users where to edit JSX to affect the design of the resume.
    * Some UI may be implemented to allow users to edit the design of the resume without modifying any code. This will likely be a more significant undertaking

### Resume Sections
* The different sections in a resume (work experience, contact, education, skills, references) cannot be renamed, re-ordered, hidden, and new sections cannot be added. However headings can be added in the work experience section.
* Future Solutions:
    * Sections may be hidden automatically if they are empty (no items is checked)
    * Renaming of sections may be implemented
    * The ability to add new sections may be implemented. This would be a significant undertaking because there would need to be a lot of flexibility in what types of sections can be added in order for this featuer to be useful. This would make the UI to build these sections difficult to build.

### Deployment
* There is no deployed version of this application. Because *title* began as a personal project, it was easy for me to use the app by running it locally and writing data to a JSON file on my disk. A deployed version would require a real database, and therefore would restrict users to only using the application when connected to the internet. This seems like a negative to me, so there are currently no plans to create a deployed version of the app.

### Testing
* There are no tests written for any of the features implemented, and there are currently no plans to do so.
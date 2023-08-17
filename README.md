

# Task Management System

This project is a Task Management System, designed to help users manage their tasks effectively and efficiently. This document will guide you on setting up the project and getting it running on your local machine.

## Prerequisites

1.  **Node.js and npm**: If you're on Windows, you'll need to install Node.js which comes bundled with npm. Download the installer from the [official Node.js website](https://nodejs.org/).
    
2.  **Yarn (for macOS users)**: macOS users are recommended to use Yarn as the package manager. To install Yarn, make sure you have [Homebrew](https://brew.sh/) installed and then run:
    

bashCopy code

`brew install yarn` 

3.  **Environment Variables**: This project requires specific environment variables to be set up. Please refer to the `sample.env` file in the root directory of the project to see which variables you'll need. Copy the content from `sample.env` to a new file named `.env` and replace placeholder values with the correct ones.

## Repositories

-   **Frontend Repository**: [Your current repository]
-   **Backend Repository**: [Task Management API](https://github.com/taliffsss/task-mngt-api.git)

## Setup

1.  **Clone the repositories**:

For the frontend (assuming you are already here):

bashCopy code

`git clone [frontend-repository-url]
cd [frontend-repository-directory]` 

For the backend:

bashCopy code

`git clone https://github.com/taliffsss/task-mngt-api.git
cd task-mngt-api` 

2.  **Install dependencies**:

If you're on **Windows**:

bashCopy code

`npm install` 

If you're on **macOS**:

bashCopy code

`yarn install` 

3.  **Set up environment variables**:

Ensure that you've set up the required environment variables as mentioned in the Prerequisites section above.

4.  **Run the applications**:

To start the servers and launch the Task Management System:

If using **npm**:

bashCopy code

`npm start` 

If using **yarn**:

bashCopy code

`yarn start` 

Now you should be able to access the application on your local host.

Docker setup usage:
Run `sh docker.sh [branch alias] up`
 - up
 - build
 - down
 - ps
 - exec

Branching:
 - main and master 
	 - prod
 - dev
	 - dev
 - Staging
	 - staging 

## Authentication

The system includes authentication features:

-   **Login**
-   **Signup**
-   **Logout**

For testing purposes, use:

**Email**: `test@test.com`  
**Password**: `p@ss1234`

## Features

-   **Create Tasks**: Users can add new tasks specifying the details and deadlines.
-   **Update Tasks**: Tasks can be updated with new information or marked as completed.
-   **Delete Tasks**: Users can delete tasks that are no longer needed.
-   **Filter and Search**: Search for tasks using specific keywords and filter them based on different criteria.
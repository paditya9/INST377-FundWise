- [1. Developer's Manual](#1-developers-manual)
- [2. Setup and Package Installation](#2-setup-and-package-installation)
    - [2.0.1. Initial Setup](#201-initial-setup)
    - [2.0.2. Install Dependencies](#202-install-dependencies)
    - [2.0.3. Run](#203-run)
- [3. Testing](#3-testing)
- [4. API Documentation](#4-api-documentation)
    - [List of API's](#list-of-apis)
- [5. Bugs and Issue](#5-bugs-and-issue)
- [6. RoadMap Ahead](#6-roadmap-ahead)


# 1. Developer's Manual
Welcome to the Developer's Manual section, where I (Adityaraj) will personal walk you through setting up, running, and contributing to FundWise.


# 2. Setup and Package Installation
### 2.0.1. Initial Setup
1. Cloning: You will need to clone the repository in your desired destination to run it locally. 

`git clone "https://github.com/paditya9/INST377-FundWise.git"`


### 2.0.2. Install Dependencies
1. Install Supabase”: `npm install @supabase/supabase-js`

2. Install Express: `npm install express`

3. Install Nodemon: `npm install nodemon`

4. Install Body Parser: `npm install body-parser`

5. Install DotEnv: `npm install dotenv`


### 2.0.3. Run
1. Start nodemon: `npm start`

2. Open Webpage and run: [Local Host](http://localhost:3000)


# 3. Testing
While no extensive tests were required or performed, to better evaluate and understand the code functionality, I have included console.log() statements to test and analyze the API's behavior.

To view the logs:

1. Right-click on any page.

2. Select "Inspect."

3. Go to the "Console" tab.

4. Review the test outputs for better understanding.


# 4. API Documentation
FundWise using multiple API to make it more intuitve and personalized for you! Please review below all the API's to better understand the code funtionality. 

### List of API's
1. 


# 5. Bugs and Issue 
1. Sometimes you aren't able to run the webpage on your [Local Host](http://localhost:3000), in such cases, do the following:
   1. Exit open webpage.
   
   2. Exit terminal.

   3. Install all the packages listed under [2.0.2. Install Dependencies](#202-install-dependencies) section.

   4. Re-run [Local Host](http://localhost:3000)

2. There is a random white box that is can be generated based on your screen resolution.
   
3. When visualizing two mutual funds simultaneously, if their relative values differ significantly, the graph may appear as a nearly straight line.


# 6. RoadMap Ahead
- [ ] Develop a login page
- [ ] Integrate login details with Supabase for tracking user history and enabling personalization
- [ ] Implement machine learning features to simplify mutual fund selection
- [ ] Deploy as a mobile app (App Store and Play Store)
- [ ] Allow users to input their portfolio and export it as CSV or PDF

 

 

 

 
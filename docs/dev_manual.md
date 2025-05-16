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

**Disclaimer:** Create a new file named `.env` in the `root directory` (not the public folder). Store all your API keys in this file to maintain confidentiality and security.


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
1. [Latest Business News](https://newsapi.org): This API fetches top business related news articles currently in United States.
   1. **Note:** You will need to create an account and get your own API Key. 

   2. You can make unlimited requests. 

   3. Review the sample JSON reponse
        ```json
        {
            "status": "ok",
            "totalResults": 8739,
            "articles": [
            {
            "source": {
            "id": null,
            "name": "Securityaffairs.com"
            },
            "author": "Pierluigi Paganini",
            "title": "Google fixed a Chrome vulnerability that could lead to full account takeover",
            "description": "Google released emergency security updates to fix a Chrome vulnerability that could lead to full account takeover. Google released emergency security updates to address a Chrome browser vulnerability, tracked as CVE-2025-4664, that could lead to full account …",
            "url": "https://securityaffairs.com/177899/security/google-fixed-a-chrome-vulnerability-that-could-lead-to-full-account-takeover.html",
            "urlToImage": "https://securityaffairs.com/wp-content/uploads/2016/03/google-chrome-bounty-program.jpg",
            "publishedAt": "2025-05-16T07:40:34Z",
            "content": "Google fixed a Chrome vulnerability that could lead to full account takeover\r\n | Nova Scotia Power discloses data breach after March security incident\r\n | Coinbase disclosed a data breach after an ex… [+164591 chars]"
            }]
        }
        ```

2. [Investment Quotes](https://api.api-ninjas.com/v1/quotes): This API fetches motivational quotes from famous Investors like Warren Buffett and others. 

   1. **Note:** You will need to create an account and get your own API Key. 

   2. You can **only** make 10000 requests/fetch call per month. 

   3. Review sample JSON response
        ```json
        [
            {
                "quote": "The will of man is his happiness.",
                "author": "Friedrich Schiller",
                "category": "happiness"
            }
        ]
        ```

3. [All Mutual Funds API](https://api.mfapi.in/mf): This API returns a JSON response with all the listed Mutual Funds in Indian Stock Market

   1. Review the sample JSON response
        ```json
        [
            {
                "schemeCode": 100027,
                "schemeName": "Grindlays Super Saver Income Fund-GSSIF-Half Yearly Dividend",
                "isinGrowth": null,
                "isinDivReinvestment": null
            },
            {
                "schemeCode": 100028,
                "schemeName": "Grindlays Super Saver Income Fund-GSSIF-Quarterly Dividend",
                "isinGrowth": null,
                "isinDivReinvestment": null
            }
        ]
        ```
4. [Specfic Mutual Fund](https://api.mfapi.in/mf/103504): This API returns the history NAV for `scheme_code = 103504`. 

   1. Review the sample JSON response
        ```json
        {
            "meta": {
                "fund_house": "SBI Mutual Fund",
                "scheme_type": "Open Ended Schemes",
                "scheme_category": "Equity Scheme - Large Cap Fund",
                "scheme_code": 103504,
                "scheme_name": "SBI BLUE CHIP FUND-REGULAR PLAN GROWTH",
                "isin_growth": "INF200K01180",
                "isin_div_reinvestment": null
            },
            "data": [
                {
                "date": "08-05-2025",
                "nav": "88.52340"
                }]
        }
        ```


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

 

 

 

 
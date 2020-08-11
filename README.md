# The Era of Global Communications and Surveillance

## 1. Background
Have you ever wondered how people can call each other anywhere anytime?  

Or, have you ever wondered why our phone is so smart that it knows our location and gives us direction to wherever we want to go, or may be how pilots know where to fly to?

Thanks to 2,666 Satellites that are currently orbiting Earth 24/7, all of those are made possible. In this project, the team of three, led by **Henry Le**, with team members of **Ekin Kaplan** and **O.J. Ndebbio** explored and analyzed the dataset of Satellite Launches from 1974 - 2020 (46 years).

<u>What we'd love to explore: </u> 

<ol>
    <li>
        Satellite distributions among nations: who are the top 10 Satellite Owners?
    </li>
    <li>
        Who is the top Satellite Owner/ Operator?
    </li>
    <li>
        Who are 2<sup>nd</sup> and 3<sup>rd</sup> Satellite Owner/ Operators?
    </li>
    <li>
        How many Satellite Launches in a particular day, month, and year?
    </li>
    <li>
        Interactive Data Table returning data based on user's query inputs & filtered data is downloadable.
    </li>
</ol>
<br>
<div align="center">
<img src="/static/assets/img/readme/readme.gif" alt="t-unlimited">
</div>


## 2. About our Team
Team Members | Roles | Github Info | LinkedIn
------------ | ----------- | ------------- | ---------
Henry Le |  Project Lead, Front & Back-End Developer | https://github.com/henryle-n | https://www.linkedin.com/in/le-henry/
Ekin Kaplan | Front End & JS Developer | https://github.com/ekin651 | https://www.linkedin.com/in/kaplan-ekin/
O.J. Ndebbio | JS Developer | https://github.com/ojndebbio | https://www.linkedin.com/in/odudu-ndebbio-b6023414/

## 3. Raw Data
Raw CSV of all Satellite history was downloaded:
* https://www.ucsusa.org/resources/satellite-database.
* Overview of database :  Includes country of Satellite origin, purpose & other operational details of satellites.

## 4. Cloud Deployment
Final website was hosted on both Amazon Web Services (AWS) and Heroku:
#### AWS - Elastic Beanstalk (EB) &  Elastic Compute Cloud (EC2)
* Folder **AWS Package** contains a `.zip` file that was uploaded to AWS.
* <a href="https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/GettingStarted.html">Click here</a> for instructions.
* Final Website:
    * http://henekon-satellite.us-east-2.elasticbeanstalk.com/

#### Heroku
* Folder Heroku Package contains files that were pushed to Heroku via Git. 
* <a href="https://devcenter.heroku.com/articles/git">Click here</a> for instructions to push with Git. Note that there are also other methods, Git is just one of them.
* Final website:
    * https://henekon-satellite.herokuapp.com/

## 5. Languages, Tools & Techniques
* **Languages**:
    * Python 3 
    * HTML 5 | CSS 3 | JavaScript ES-6
    * SQL
    * Markdown
* **Python** **Libraries/** **Modules**:
    * Pandas v1.0.4 | CSV (Pandas) | OS (Pandas) | Numpy v1.18.5 | Flask (RESTful APIs) v1.1.2 | SQLAlchemy v1.3.17 | Datetime
* **SQL** **Database**:
    * SQLite (DB Browser ver. 3.11.2)
* **JavaScript** **Libraries**:
    * D3 v5 | D3 Tooltip v0.7.1 | Node | Chart v2.9.3 | Bootstrap v4 | Plotly v1.54.7 | GeoJSON | jQuery v3.5.1
* **Cloud Services:**
    * Amazon AWS (EC2) |  Heroku
* **Software/ Applications:**
    * Visual Studio Code v1.47.3 | Notepad++ v7.8.7 | Google Chrome v84.0.4147.125
* **Operating Systems:**
    * Windows 10 Professional v1909 | macOS Mojave v10.14.6

## 6. WorkFlow
The process of creating this project from start to finish is describing in the flow chart as below:

![work-flow](/static/assets/img/portfolio/fullsize/Project-2-WDB.svg)

## 7. Table of Contents

File names | Content Description 
------------ | ----------- 
**data** |  Processed/ cleaned .CSV files / SQLite DB
**AWS Package** | Final package deployed on AWS
**Team Planning** | Workflow Proposal document with detailed plans and responsibilities     
**static**| assests (images and fonts), CSS, JS, and Node modules 
**templates**| all webpages of entire project 
**Auto*** **Files**| to help automate push & pull from GitHub; activate development environement and run server 
**Extract-Transform-Load.ipynb**|  Extract, transform, & load data 
**SatelliteClass.py** | SQLAlchemy for connecting to SQLite DB and query data for Flask RESTful API 
**application.py** | Flask RESTful APIs, Python driver for website 

## 8. Summary Post-Data Exploration
* U.S.A. by far the leader of the world in Satellite Counts, both as the manufacturer and as the user (1,327 satellites).
* China comes as 2<sup>nd</sup> (363 satellites), and Russia to be 3<sup>rd</sup> (169 satellites). 
* The 14<sup>th</sup> and 29<sup>th</sup> days of the month, months of Feb. and Dec., and the year of 2019 have the highest Satellite Counts.
* Within the U.S.A. satellites are used for:

  * Civil: 30 counts.

  * Commercial: 935 counts.

  * Government: 170 counts.

  * Military: 192 counts.



## 9. Team Lesson Learned
#### Henry Le
* Enhanced UX/UI through text animations, color changes, mouse events, etc.
* Multi-axes utilizing D3.js only work if each object of each axis have the same length and they have to be inside the same dataset.
* ChoroPleth Map works only if the country names match with GeoJSON database. For example, if dataset uses "US" as the name of the country, GeoJSON returns not found as the database country name is "United States of America".
* Node.js and Chart.js are great tools beside Plotly.js for creating interactive charts.
* Saving Node modules on app folder would eliminate problem if CDN goes offline, but would consume quite a bit of storage.
* Learned new JS libraries/ modules, such as jQuery, Node.js, and Chart.js.
* There are multiple ways to deploy packages to Amazon AWS. 
    * Connect & deploy to EC2 directly thru a SSH connection (AWS CLI). EC2 is just another PC - remotely, same as someone's computer (of course in Linux instead of Windows).
    * Via "Orchestration Services" provided by Amazon such as EB, ECS, Fargate (for large scale applications). This project was deployed by utilizing EB.

#### O.J.Ndebbio
* CSS & Bootsrap provide custom formats & decorations.
* HTML provides some layout or structure for the web page.

#### Ekin Kaplan
* Learned new JS libraries/ modules, such as jQuery, Node.js, and Chart.js
* Effectively used CSS control the layout of multiple web pages.
* Bootsrap is customized as per design of our project.
* HTML can be easily integrated with multiple languages to make interactive webpages (JS/CSS).

## 10. Features
* Auto message animation on the "*masthead*" of the main webpage, helping grap user's attention and invoke thoughts and curiosity about the data/ info to be presented, by "vanilla" JS with ```setInterval()``` and ```setTimeout()``` functions
* Auto Notification Message for each webpage to tell user what page they are visiting by jQuery and Bootstrap notify module
* Interactive charts with tooltip to allow user to hover / click to see data of each elements of the charts
* Interactive sidebar that hide in large screen and appear in small screen, enhancing the UX on mobile device
* Multiple element tags embedded in each visualization charts, which allows user to quickly navigate to point of interest by clicking on a specific chart name
* Filterable Data Table webpage to allow user to refine the data search for one or multiple criteria. Filtered data is available to be downloaded with a button, format as *.CSV*
* Several ```.sh``` and ```.bat``` files were created to automate the process of pushing or pulling on GitHub, or auto activate the python environment, start the ```application.py``` file, and run the web browser - saved significant amount of time for all team members

## 11. Improvement Opportunities
* Message animation on the homepage appears and disappears with a fixed time interval. It'd be better to build a dynamic wait time based on the length of the message so that each message won't appear too fast or too slow. The wait time should be dynamically changed based on the length of the message

* Better format for all webpages to keep a consistent format. In this project, since there are 3 members working on different pages, the consistency of the format is not fixed intime before deadlines

## 12. How to Use
This repository contains all needed source codes for running the applications on either local PC or Cloud. However, user needs to create new development environment if running on local PC as this was not uploaded to GitHub due to its large size. Below steps were done in Windows CMD.
* Clone this repository to user local PC:
    * `git clone https://github.com/henryle-n/Global-Satellite-Launches.git`
* To create a new python environment in the project folder:
    * `python -m venv <new-env-name>`
* Activate newly created environment:
    * `<new-env-name>\Scripts\activate`
* Install needed libraries/ modules for Python:
    * `pip install -r requirements.txt`
* Run mini-server on local PC:
    * `python application.py`


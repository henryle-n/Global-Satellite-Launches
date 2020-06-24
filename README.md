# The Era of Global Communications and Surveillance

## Background
Have you ever wondered how people can call each other from anywhere in the world at any time?  

Or, have you ever wondered why our phone is so smart that it knows our location and give us direction to wherever we want to go, or may be how the pilots know where to fly too, there is no landmark up **there** in the air...?

Thanks to 2,666 Satellites that are currently orbiting Earth 24/7, all of those are made possible. In this project, the team of three, led by ****Henry** Le**, with team members of **Ekin Kaplan** and **O.J. Ndebbio** explored and analyzed the dataset of Satellite Launches from 1974 - 2020 (46 years).

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
        Interactive Data Table returning data based on user's query inputs.
    </li>
</ol>
<br>
<div align="center">
<img src="/static/assets/img/readme/readme.gif" alt="t-unlimited">
</div>


## About our Team
Team Members | Roles | Github Info | LinkedIn
------------ | ----------- | ------------- | ---------
Henry Le |  Project Lead, Front & Back-End Developer | https://github.com/henryle-n | https://www.linkedin.com/in/le-henry/
Ekin Kaplan | Front End & JS Developer | https://github.com/ekin651 | https://www.linkedin.com/in/kaplan-ekin/
O.J. Ndebbio | JS Developer | https://github.com/ojndebbio | https://www.linkedin.com/in/odudu-ndebbio-b6023414/

## Raw DataBase
Raw CSV of all Satellite history was downloaded:
* https://www.ucsusa.org/resources/satellite-database
* Overview of database :  Includes country of Satellite origin, purpose & other operational details of satellites

## Web Servers
Final website was hosted on both Amazon Web Services (AWS) and Heroku
#### AWS - Elastic Beanstalk 
* http://henekon-satellite.us-east-2.elasticbeanstalk.com/

#### Heroku
* https://henekon-satellite.herokuapp.com/

## Languages / Tools / Techniques / Modules
* Cloud Deployment / Cloud Computing with Amazon Web Services (AWS) and Heroku
* Python |  HTML5 / CSS3 | Markdown | JavaScript | SQL
* Flask App | API Routes | Bootstrap | SQLAlchemy | SQLite
* Node.js | Chart.js | Plotly.js | GeoJSON | jQuery
* Visual Studio Code | Live Server (by R. Dey) | Instant Markdown (by D. Bankier) | Google Chrome ver. 84x
* Windows 10 Professional, ver. 1909 | MacOS Mojave 10.14.6

## WorkFlow
The process of creating this project from start to finish is describing in the flow chart as below:

![work-flow](/static/assets/img/portfolio/fullsize/Project-2-WDB.svg)

## Table of Contents

File names | Content Description | Author
------------ | ----------- | ----------
**Data** |  Processed/ cleaned .CSV files / SQLite DB | H. Le / E. Kaplan / O.J. Ndebbio
**Henry-AWS-pkg** | Final package deployed on AWS | H. Le
**Henry-Heroku** |  Final package deployed on Heroku |H. Le
**Team Planning** | Workflow Proposal document with detailed plans and responsibilities      | H. Le / E. Kaplan / O.J. Ndebbio
**static**| Folder contains assests (images and fonts), CSS, JS, and Node modules (npm installed)  | H. Le / E. Kaplan / O.J. Ndebbio
**templates**| Folder contains 'html files' which are the templates for displaying data on the web     |  H. Le / E. Kaplan / O.J. Ndebbio
**AutoPull-GitHub_HL.sh**| Automatically Pull GitHub updates | H. Le
**AutoPush-GitHub_HL.sh**| Automatically Push GitHub updates| H. Le
**AutoRunNoteBook_HL.sh** |  Automatically activate dev. environment, and run Jupyter Notebook | H. Le
**AutoRunServer_HL.bat**|  Automatically Run Servers (for Windows) | H. Le
**AutoRunServer_HL.sh**| Automatically Run Servers (for Windows Git Bash or MacOS)  | H. Le
**ETL.ipynb**|  Extract, transform, load the our data | H. Le / E. Kaplan / O.J. Ndebbio
**SatelliteClass.py** | SQLAlchemy for connecting to SQLite DB and query data for application.py API routes |  H. Le 
**application.py** | exported / converted from the jupyter notebook |  H. Le 

## Summary post-Data Exploration
* U.S.A. by far the leader of the world in Satellite Counts, both as the manufacturer and as the user (1,327 satellites)
* China comes as 2<sup>nd</sup> (363 satellites), and Russia to be 3<sup>rd</sup> (169 satellites) 
* The 14<sup>th</sup> and 29<sup>th</sup> days of the month, months of Feb. and Dec., and the year of 2019 have the highest Satellite Counts
* Within the U.S.A. satellites are used for:

  * Civil: 30 counts

  * Commercial: 935 counts

  * Government: 170 counts

  * Military: 192 counts



## Team Lesson Learned
#### Henry Le
* Enhanced UX/UI through text animations, color changes, mouse events, etc.
* Multi-axes utilizing D3.js only work if each object of each axis have the same length and they have to be inside the same dataset
* ChoroPleth Map works only if the country names match with GeoJSON database. For example, if dataset uses "US" as the name of the country, GeoJSON returns not found as the database country name is "United States of America"
* Node.js and Chart.js are great tools beside Plotly.js for creating chart
* Saving npm modules on app folder would eliminate problem if CDN goes offline, but would consume quite a bit of storage 
* Learned new JS libraries/ modules, such as jQuery, Node.js, and Chart.js

#### O.J.Ndebbio
* The CSS & Bootsrap provides custom formats & decorations
* The HTML provides some layout or structure for the web page 

#### Ekin Kaplan
* Learned new JS libraries/ modules, such as jQuery, Node.js, and Chart.js
* Effectively used CSS control the layout of multiple web pages
* Bootsrap is customized as per design of our project.
* HTML can be easily integrated with multiple languages to make interactive webpages (JS/CSS)

## Features
* Auto message animation on the "*masthead*" of the main webpage, helping grap user's attention and invoke thoughts and curiosity about the data/ info to be presented, by "vanilla" JS with ```setInterval()``` and ```setTimeout()``` functions
* Auto Notification Message for each webpage to tell user what page they are visiting by jQuery and Bootstrap notify module
* Interactive charts with tooltip to allow user to hover / click to see data of each elements of the charts
* Filterable Data Table webpage to allow user to refine the data search for one or multiple criteria
* Interactive sidebar that hide in large screen and appear in small screen, enhancing the UX on mobile device
* Multiple element tags embedded in each visualization charts, which allows user to quickly navigate to point of interest by clicking on a specific chart name
* Several ```.sh``` and ```.bat``` files were created to automate the process of pushing or pulling on GitHub, or auto activate the python environment, start the ```application.py``` file, and run the web browser - saved significant amount of time for all team members

## Improvement Opportunities
* Auto message animation on webpage appears and disappears with a fixed time interval. It'd be better to build a dynamic wait time based on the length of the message so that each message won't appear too fast or too slow

* Better format for all webpages to keep a consistent format. In this project, since there are 3 members working on different pages, the consistency of the format is not fixed intime before deadlines

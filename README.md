# The Era of Global Communications and Surveillance

## Background
Have you ever wondered how people can call each other from anywhere in the world at any time?  

Or, have you ever wondered why our phone is so smart that it knows our location and give us direction to wherever we want to go, or may be how the pilots know where to fly too, there is no landmark up there in the air...?

Thanks to 2,666 Satellites that currently orbiting earth, all of those are made possible. In this project, the team of three, led by **Henry Le**, with team members of **Ekin Kaplan** and **O.J. Ndebbio**.  

<div align="center">
<img src="/static/assets/img/readme/readme.gif" alt="t-unlimited">
</div>

## Languages / Tools / Techniques / Modules
* Cloud Deployment / Cloud Computing with Amazon Web Services (AWS)
* Python |  HTML5 / CSS3 | Markdown | JavaScript | SQL
* Flask App | API Routes | Bootstrap | SQLAlchemy | SQLite
* Node.js| Chart.js | Plotly.js | GeoJSON
* Visual Studio Code Insiders | Live Server (by R. Dey) | Instant Markdown (by D. Bankier) | Google Chrome ver. 84x
* Windows 10 Professional, ver. 1909 | MacOS Mojave 10.14.6

## About our Team
Team Members | Roles | Github Info
------------ | ----------- | -------------
Henry Le |  Project Lead, Front & Back-End Developer | https://github.com/henryle-n
Ekin Kaplan | Front End & JS Developer | https://github.com/ekin651
O.J. Ndebbio | JS Developer | https://github.com/ojndebbio

## Table of Contents

File names | Content 
------------ | ----------- 
xxx |  xxx
xx | xxx
xxx | xxx

## Summary post-Data Exploration
* U.S.A. by far the leader of the world in Satellite Counts, both as the manufacturer and as the user
* China comes as 2<sup>nd</sup>, and Russia to be 3<sup>rd</sup> 
* The 14<sup>th</sup> and xx<sup>th</sup> days of the month have the highest Satellite Counts
* xxx month have most Satellite Launches


## Team Lesson Learned
* Multi-axes utilizing D3.js only work if each object of each axis have the same length and they have to be inside the same dataset
* ChoroPleth Map works only if the country names match with GeoJSON database. For example, if dataset uses "US" as the name of the country, GeoJSON returns not found as the database country name is "United States of America"
* Node.js and Chart.js are great tools beside Plotly.js for creating chart
* Saving npm modules on app folder would eliminate problem if CDN goes offline, but would consume quite a bit of storage 

## Features
* Auto message animation on the "*masthead*" of the main webpage, helping grap user's attention and invoke thoughts and curiosity about the data/ info to be presented, by "vanilla" JS with ```setInterval()``` and ```setTimeout()``` functions
* Auto Notification Message for each webpage to tell user what page they are visiting by jQuery and Bootstrap notify module
* Interactive charts with tooltip to allow user to hover / click to see data of each elements of the charts
* Filterable Data Table webpage to allow user to refine the data search for one or multiple criteria
* Interactive sidebar that hide in large screen and appear in small screen, enhancing the UX on mobile device
* Multiple element tags embedded in each visualization charts, which allows user to quickly navigate to point of interest by clicking on a specific chart name
* Several ```.sh``` and ```.bat``` files were created to automate the process of pushing or pulling on GitHub, or auto activate the python environment, start the ```application.py``` file, and run the web browser - saved significant amount of time for all team members

## Improvement Opportunity
* Auto message animation on webpage appears and disappears with a fixed time interval. It'd be better to build a dynamic wait time based on the length of the message so that each message won't appear too fast or too slow

* Better format for all webpages to keep a consistent format. In this project, since there are 3 members working on different pages, the consistency of the format is not fixed intime before deadline
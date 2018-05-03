# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #3: Group Project - Make My Day

### Overview

For our third project we were instructed to build a full-stack MEAN application. This was required to use Mongo, Node, Angular and Express. This incorporated an API with 2 related models, RESTFUL actions, automated tests using Mocha and Chai and was styled using Bulma. We also did authentication with encrypted passwords (bcrypt) and used Satellizer, a token-based authentication module for AngularJS.

### The Application

Our application is a day trip planner which allows users to create a customised itinerary based on the location of their trip. Users can create a new trip with the date and city location and the app returns a results based on their search. The in-built map displays markers with locations of points of interest, which can then be filtered by search category. The user adds places to their day trip which then allows them to view a route with directions and timings. They can also make multiple day trips for different locations which they can refer to at any time.

##### [Please visit the website](https://make-my-days.herokuapp.com/)

### Planning

We used agile methodology during the planning phase of the project. We created a Trello board, specifying our MVP requirements, nice-to-have features and stretch goals and planned daily sprints. Tasks were assigned to members of the group throughout the project using this system.

<p align="center"><img src="https://i.imgur.com/KvwXQY4.png" width="700"></p>

We used Github to collaborate making use of branches and checking for merge conflicts for continuous integration deployed on heroku for continuous deployment.
We then wireframed our website design and used this a basis to explore what features we wanted to implement and the basic layout of the website.

### Features

The user is directed to a registration/login page on page load which upon completion takes them to the create a trip page.

<p align="center"><img src="https://i.imgur.com/Jf221bC.png" width="700"></p>
<p align="center"><img src="https://i.imgur.com/Jf221bC.png" width="700"></p>

This requests the user to enter their trip location which uses Google autocomplete to store coordinates of their trip location and the date they are travelling.

<p align="center"><img src="https://i.imgur.com/T8V2vVS.png" width="700"></p>

Users are then directed to the main page where they can view the map which displays their search parameters. They are able to filter for what type of search they want - restaurants, art galleries, museums and hotels.

The user can then add Museums, Art Galleries, restaurants etc to his/her itinerary which will be shown on the map directly with the optimised route between each place.

<p align="center"><img src="https://i.imgur.com/BEJPWBz.png" width="700"></p>

The user can then view all their directions and daily plan summarised in 'Daily Plan'.

<p align="center"><img src="https://i.imgur.com/sSN4mxi.png" width="700"></p>

The user can also see all his trips in 'See all my trips' and click on a specific trip to amend it or review the daily plan.
The user can also select 'Create new trip' in order to add another trip to his profile.

<p align="center"><img src="https://i.imgur.com/526tJPc.png" width="700"></p>

### Testing
Tests were performed using Mocha as test runner and Chai as assertion library, as well as nyc for test coverage.
We created 15 tests on the login and register routes as well as all the Trip routes.

<p align="center"><img src="https://i.imgur.com/yRxHW3n.png" width="700"></p>

### Google Maps API
The map, pointers, directions, search results were all from the Google maps API.
To simplify the use of the API, we created services and promises for the search and direction features. The promises were easier to handle in the controller and avoided a callback hell. We also created 2 directives for google map and google autocomplete in order to use them in our new Trip and show trip views.


## Wins
Midway through the project we decided to have a big refactoring session which helped a lot with the overall structure of the code. It meant we could compartmentalise and structure it in a more straightforward way which helped us a lot in terms of making the code adaptable if we wanted to extend the project.

## Challenges
The code started being unstable before our big refactoring session which made it hard to progress. For example some events would happen before or after another one dpeending on when the code was run. Using promises for the search directions features solved that issue.
Also, we did not use RESTful routes initially as our whole app was based on one page. This made it much harder. Lesson learnt though ;) 

## Additional features
If we had extra time we would like to add functionality for multiple days, which we have set the models up for. Additionally we would like to incorporate the Dark Sky API to show the weather in the location of your trip. We could further extend our directions to include public transport as well as the walking route, and add descriptions to each of the locations.
Finally, we still need to make this app more responsive for tablet and mobile. This will be done in due time.


---

## Setup instructions

- Clone or download the repo
- Install dependencies with `yarn install` or `npm install`
- Start the local MongoDB server in Node.js with `mongod`
- Start the client with `yarn start:client` (same as `webpack-dev-server`)
- Start the server with `yarn start:server` (same as `nodemon`)
- To run tests, type `test`

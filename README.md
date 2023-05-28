# Deck's Hobbies
Deck's Hobbies is a website clone based off of Etsy but with a TCG theme to it. Deck's Hobbies can be used to create listings for items that users may see, as well as allowing users to leave reviews for these items

**Live Site: [Deck's Hobbies](https://decks-hobbies.onrender.com)**

![Pic 1](https://raw.githubusercontent.com/anwersaad0/Etsy-Clone/main/ReadmePics/homepagepic.png)

![Pic 2](https://raw.githubusercontent.com/anwersaad0/Etsy-Clone/main/ReadmePics/listingspic.png)

![Pic 3](https://raw.githubusercontent.com/anwersaad0/Etsy-Clone/main/ReadmePics/userlistingpics.png)

![Pic 4](https://raw.githubusercontent.com/anwersaad0/Etsy-Clone/main/ReadmePics/cardinfopic.png)



#### Please read the below links to the project's Wiki:
- [Feature List](https://github.com/anwersaad0/Etsy-Clone/wiki/Project-Features)
- [Database Schema](https://github.com/anwersaad0/Etsy-Clone/blob/main/EtsyCloneDBD.png)
- [User Stories](https://github.com/anwersaad0/Etsy-Clone/wiki/User-Stories)

#### This project is made using:
- JS
- Python
- Flask
- React
- Redux
- PostgreSQL

#### How to start the project locally:
- Clone the project repo into your desired location
- cd into the react-app folder and use ```npm install``` to get the JS and react dependencies
- Open another terminal for the backend commands and run ```pipenv install -r requirements.txt``` in the root directory
- Enter the shell on the backend terminal using ```pipenv shell```
- Run the following to set up the database:
```
flask db init
flask db migrate
flask db upgrade
flask seed all
```
- To start the local server use ```flask run``` in the backend terminal and ```npm start``` in the react-app terminal
- Enjoy browsing the website

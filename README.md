# Jumanji Farm Online Store

A simple e-commerce site for a small-scale organic farm. Order fresh, high quality vegetables online! The site is built as a RESTful CRUD app integrating Stripe's API and a login authentication option from Facebook.

The webstore was built as a full-stack project during my time as a web development student at General Assembly, Seattle.

### Technologies Used

* Express.js / Node.js
* PostgreSQL / Sequelize ORM
* JavaScript
* APIs - Stripe, Facebook
* oAuth
* Various node modules
* HTML/CSS
* jQuery UI
* Heroku
* Bootstrap
* Google Fonts

### Approach Taken

Conceptualized the app first by sketching wireframes with balsamiq software as well as creating Entity Relationship Diagrams (ERDs) in draw.IO to illustrate my various relationships in my app's database (for ex. users, products, sales and how they are associated).

![JF Wireframe](https://github.com/abautist/webstore/blob/master/static/images/JF%20Webstore%20Mock-ups/1-Landing%20page.png "JF Wireframe")

![JF Wireframe 2](https://github.com/abautist/webstore/blob/master/static/images/JF%20Webstore%20Mock-ups/2-Featured%20Items%20page.png "JF Wireframe 2")

More wireframes: https://github.com/abautist/webstore/tree/master/static/images/JF%20Webstore%20Mock-ups

From there the first major task was getting comfortable with the stripe API and integrating credit card processing into my app (sending requests to Stripe and receiving an encrypted token as a response). The next step was creating the various routes and views of the app. Once the basic structure was created I set up local authentication (signup/login) as well as facebook oAuth. Styling and final revisions followed.

I deployed the site on heroku for online public access. https://jumanjifarm.herokuapp.com/

![JF Screenshot 1](https://github.com/abautist/webstore/blob/master/static/images/Screenshots/landingpage.png "JF Screenshot 1")

![JF Screenshot 2](https://github.com/abautist/webstore/blob/master/static/images/Screenshots/products_page.png "JF Screenshot 2")

### Known Issues to be updated

* Feast (favorites) page remains the same even when the current user logs out and a new user logs in
* Cart/payment processing limited to only one item per user at the moment



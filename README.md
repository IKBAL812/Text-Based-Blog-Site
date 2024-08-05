# Text Based Blog Site
 A text based blog site that has been made with angular 17 material for frontend and spring boot 3.3.2 for backend

# How to open?

**1)** In blogServer folder, open the application.properities file inside the resources folder and change the database configuration based on your database

**2)** After that first run the blogServer for backend server by running the BlogServerApplication and then run the blogWeb for frontend by typing 'npm run' in the terminal. (i used intelliJ for running backend and Visual Studio Code for frontend)

# Pages

**register:** This page lets you add a new user to the database to log in to the site

**login:** This page lets you log in to the site with the data in the customer table

**view-all:** This is the main page of the server. You can either log in to see this page or log in anonymousle but you will not be able to create posts if you dont have an account. 
If there are any posts in the server, this page will list them.
If there are not, it will display a blank page saying 'there are no posts yet'

**create-post:** This page is only accesible when you have an account. This page lets you add a new post to the database so that it will show on the main page.

**navbar:** In the navbar, when you click to the Blog App text you will be sent to the main page. On the other side, there is a log in button if you have not logged in. 

If you are logged in, there will be two buttons. First one is create post, which sends you to create post page. The second one is the profile button,  which opens a drop-down bar which shows you your account name and a log out button which will log you off the app. 

**admin-menu:** Button for this menu will be in the profile drop-down bar if you are an admin. 

This page will list all the users in the database. There is delete user button after each user that lets you delete that user.(you can't delete yourself of course) 

Also there is a button at the top for adding admins that  

# Text Based Blog Site
 This is a text based blog site that has been made with angular 17 material for frontend and spring boot 3.3.2 for backend

# How to open?

**1)** In blogServer folder, open the application.properities file inside the resources folder and change the database configuration based on your database

**2)** After that first run the blogServer for backend server by running the BlogServerApplication and then run the blogWeb for frontend by typing 'npm run' in the terminal. (i used intelliJ for running backend and Visual Studio Code for frontend)

# Pages

**register:** This page lets you add a new user to the database to log in to the site

**login:** This page lets you log in to the site with the data in the customer table

**view-all:** This is the main page of the server. You can either log in to see this page or log in anonymousle but you will not be able to create posts if you dont have an account.

If there are any posts in the server, this page will list them.

If there are not, it will display a blank page saying 'there are no posts yet'

**view-post:** When clicked view post on a post, it will be redirected to this page. In this page, you can view the post in detail. Also, if the post has been updated, it will show that on there.

**create-post:** This page is only accesible when you have an account. This page lets you add a new post to the database so that it will show on the main page.

**navbar:** In the navbar, when you click to the Blog App text you will be sent to the main page. On the other side, there is a log in button if you have not logged in. 

If you are logged in, there will be two buttons. First one is create post, which sends you to create post page. The second one is the profile button,  which opens a drop-down bar which shows you your account name and a log out button which will log you off the app. 

**admin-menu:** Button for this menu will be in the profile drop-down bar if you are an admin. 

This page will list all the users in the database. There is delete user button after each user that lets you delete that user.(you can't delete yourself of course) 

Also there is a button at the top for adding admins that opens a dialog for adding admins

**secret-menu:** This secret menu is accessed by inputting the required password(that you can change in the routers) for adding an admin quickly or if there is no admin in the database that no admin can be added

# Features

**user roles:** There is two roles in site which are user and admin. Users can be added by basically registering and admins can be added from the admin menu or secret menu.

Users can view their own and others' post but they can only edit or delete their posts.

Admins has the users' previliges and also they can delete other people's post but they cant update other people's post.

**reset password:** In the log in screen, there is a reset password button that lets you change the password of a email.(I tried to make a code from email system for security but gmail does not support that feature now so its a very basic one right now, but i will update it if i find a way) 

**anonymous login:** In login screen, you can log in to the system anonymously just to see the posts without creating an account.
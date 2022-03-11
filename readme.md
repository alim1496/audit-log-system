# Audit Log System
This is a simple system that allows an authorized user to add a new record, search it by it and update as well as see the change log of that particular record. It has been developed as a MERN application and deployed to heroku. 

# Demo
Visit the following link to test the live demo:
https://audit-logger-mern.herokuapp.com/
Use any of the credentials to login:
Username: **john**
Password: **john1234**
Username: **adam**
Password: **adam1234**

## System Design
Since I have developed the system as a monolithic application here the logger and site data are in the same server. A user authentication system has been developed that allows the user upon verifying the username and password provided. After a successful login, an `http only cookie` is set as a response which contains the user information as a `jwt token`. Whenever a user creates or updates a new site, a corresponding log data containing the reference of site and user ids is created. If the user creates the data then the update field stores it as a create type otherwise update type. For every successful site update and create the audit log is shown. If the number of users is increased to a great extent, a load balancer with multiple instances of the server is introduced. The logs can then be sent to a separate elastic search server which faster the data fetching with indexing.

## Database Design
Here I have used MongoDB to design the database. I have used three collections(tables) named `User`, `Site` and `Log` which mean the user to add/update record, the data to be added/updated and the log of each update respectively. The `User` collection mainly contains username, full name, email, password, admin and timestamps properties. The `Site` collection contains name, region, description, latitude, longitude and and a userid field which will ensure the `one to one` relationship betwwen user and site collection. Lastly the `Log` collection will contain a reference of user and another of site with an update field. This collection is the outcome of `many to many` relationship between user and site tables because a site can be updated by many users and a user can update many sites.

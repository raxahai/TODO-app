# TODO-app

Developed a TODO app using node, express and mongodb hosted on heroku.

This app consists of authentication using JsonWebToken and all the responses returns json.

Following are the urls you can go step by step:

1- npm start (For running this project in your local computer)

2- open postman and then follow the links below:

    -> localhost:5000/api/user/register (POST route)
        -> name, email and password required of type string

    -> localhost:5000/api/user/login (POST route)
        -> name and email required of type string

    -> localhost:5000/todo (GET route)

    -> localhost:5000/todo/add (POST route)
        -> title and description required of type string

    -> localhost:5000/todo/delete/:postID (DELETE route)

    -> localhost:5000/todo/:postID (PUT route)
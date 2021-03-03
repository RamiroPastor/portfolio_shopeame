# angular-shopeame-backend

https://jtway.co/deploying-subdirectory-projects-to-heroku-f31ed65f3f2

If the "heroku-deploy" branch is deleted by accident, run the following command in the root directory:

`git subtree split --prefix backend -b heroku-deploy`

Then, after logging to heroku cli, run this command:

`heroku git:remote -a shopeame-mock-api`

And everytime a new deploy is needed, run

`git push heroku heroku-deploy:master`

# Task 8. PostgreSQL & Typeorm

## How to start an application and check working

1. Pull the repository to your local PC using git command
```
git clone https://github.com/khronic79/nodejs2021Q4-service.git -b task8
```
2. Open a project folder in CLI and run the command:
```
docker-compose up --build
```
3. **Important!** Please stop all applications wich use port 4000 (node app), 5432 (postgres) and 5050 (pg admin) before building compose file. 
4. You can check a started application in the brouser using link
```
localhost:4000
```
In browser you can see text "Service is running!"

5. You can use this address in postman. 
6. Run command 
```
npm i
```
7. Start tests by using:
```
npm run test
```
8. If you want to stop application please enter Ctrl+C in terminal when you started app or enter 
```
docker-compose stop
```
9. For correct app's starting please use only "docker-compose up" command.
10. You can use PG Admin on adress:
```
localhost:5050
```
11. Login: admin@linuxhint.com and password: secret
12. For DB connection use data in .env file.



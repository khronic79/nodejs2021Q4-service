# Task 7. Docker basics

## How to start an application

1. Pull the repository to your local PC using git command
```
git clone https://github.com/khronic79/nodejs2021Q4-service.git -b task7
```
2. Open a project folder in CLI and run the command:
```
docker-compose up
```
3. **Important!** Please stop all applications wich use port 4000 before building compose file. 
4. You can check a started application in the brouser using link
```
localhost:4000
```
5. You can use this address in postman. 
6. Also you can start tests exec docker command. In docker bash use command:
```
npm run test
```
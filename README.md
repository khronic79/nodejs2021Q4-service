# Task 7. Docker basics

## How to start an application and check working

1. Pull the repository to your local PC using git command
```
git clone https://github.com/khronic79/nodejs2021Q4-service.git -b task7
```
2. Open a project folder in CLI and run the command:
```
docker-compose up
```
3. **Important!** Please stop all applications wich use port 4000 and 5432 before building compose file. 
4. You can check a started application in the brouser using link
```
localhost:4000
```
In browser you can see text "Service is running!"

5. You can use this address in postman. 
6. Also you can start tests exec docker command. In docker bash use command:
```
npm run test
```
7. If you want to stop application please enter Ctrl+C in terminal when you started app or enter 
```
docker-compose stop
```
8. For correct app's starting please use only "docker-compose up" command.
9. If you want to check database's working please start containers (docker-compose up) and enter command
```
docker container ls
```
Find database's container ID and start command
```
docker exec -it <CONTAINER ID> bash
```
In container's terminal you can type follow command
```
postgres --version
```


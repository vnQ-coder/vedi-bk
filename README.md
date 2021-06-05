# itg-nbk-vsrm

##### Prerequisites
    1- nodejs
    
    2- postgres sql
    
    3- redis-server (if required)
    
##### How to run the project (for windows)
    1- npm i
    
    2- npm run win-db-fresh-run
    
    3- npm run win-start
    
##### How to run the project (for linux)
    1- npm i
    
    2- npm run db-fresh-run
    
    3- npm start
    
##### How to create and run migration files
    1- npm i -g knex
    
    2- cd src/ dir from project root dir
    
    3- knex migrate:make created_table_mig_filename
    
    4- knex migrate:latest 

create database practice_project;

use practice_project;

create table users_detail(
    id int primary key auto_increment,
    firstname varchar(30),
    lastname varchar(30),
    email varchar(150),
    phoneno char(10),
    password text,
    soalt varchar(4),
    activation_code varchar(12),
    activate_time timestamp default current_timestamp,
    create_time timestamp default current_timestamp,
    status int default 0,
    unique key(email),
    unique key(phoneno),
    unique key(activation_code)
);

create table users_log(
    id int primary key auto_increment,
    user_id int, 
    log_time timestamp default current_timestamp,
    issuccess int default 0,
    foreign key (user_id) references users_detail(id)
);
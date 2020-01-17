/*para conectar ao node*/
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
flush privileges;

create database dbchemical;
use dbchemical;

/*1*/
create table estadomateria(
id int auto_increment primary key,
tipo varchar(20) not null
);

/*2 - tabela fixa*/
insert into estadomateria(tipo) values ('solido');
insert into estadomateria(tipo) values ('líquido');
insert into estadomateria(tipo) values ('gasoso');

/*drop table elementoquimico*/
/*3*/
create table elementoquimico(
id int auto_increment primary key,
nome varchar(50) unique not null,
simbolo varchar(2) not null,
numero int not null,
estado int,
descricao longtext,
index est_ind(id),
constraint fkestadomateria foreign key(estado) references estadomateria(id)
);

create table compostoquimico(
id int auto_increment primary key,
nome varchar(50) unique not null,
aparencia varchar(250)
);

create table formulaquimica(
id int auto_increment primary key,
idcomposto int not null,
idelemento int not null,
quantidade int not null,
constraint fkelementoformula foreign key(idelemento) references elementoquimico(id),
constraint fkcompostoformula foreign key(idcomposto) references compostoquimico(id)
);

/*4 inserção de exemplo*/
insert into elementoquimico(nome,simbolo,numero,estado) values ('Hidrogênio','H',1,2);
insert into elementoquimico(nome,simbolo,numero,estado) values ('Hélio','HE',1,2);
insert into elementoquimico(nome,simbolo,numero,estado) values ('Lítio','LI','3','1');


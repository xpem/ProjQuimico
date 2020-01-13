
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
index est_ind(id),
constraint fkestadomateria foreign key(estado) references estadomateria(id)
);

/*4 inserção de exemplo*/
insert into elementoquimico(nome,simbolo,numero,estado) values ('Hidrogênio','H',1,2);
insert into elementoquimico(nome,simbolo,numero,estado) values ('Hélio','HE',1,2);
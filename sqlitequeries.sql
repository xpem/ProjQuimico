
/*1*/
create table estadomateria(
id int AUTOINCREMENT primary key,
tipo text
);

/*2 - tabela fixa*/
insert into estadomateria(tipo) values ('solido');
insert into estadomateria(tipo) values ('líquido');
insert into estadomateria(tipo) values ('gasoso');

/*drop table elementoquimico*/
/*3*/
create table elementoquimico(
id int auto_increment primary key,
nome text,
simbolo text,
numero INTEGER,
estado INTEGER,
descricao text
);

create table compostoquimico(
id integer AUTOINCREMENT primary key,
nome text,
aparencia text
);

create table formulaquimica(
id integer AUTOINCREMENT primary key,
idcomposto integer,
idelemento integer,
quantidade integer
);

/*4 inserção de exemplo*/
insert into elementoquimico(nome,simbolo,numero,estado) values ('Hidrogênio','H',1,2);
insert into elementoquimico(nome,simbolo,numero,estado) values ('Hélio','HE',1,2);
insert into elementoquimico(nome,simbolo,numero,estado) values ('Lítio','LI','3','1');


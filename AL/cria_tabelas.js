const sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./dbchemical.sqlite3');

//cria tabelas gerais
let createestadomateria = () => {
    console.log("create estadomateria");
    // db.run("create table IF NOT EXISTS estadomateria(id integer primary key AUTOINCREMENT ,tipo text)");

    // db.run("insert into estadomateria(tipo) values ('solido')");
    //  db.run(" insert into estadomateria(tipo) values ('líquido');");
    //  db.run(" insert into estadomateria(tipo) values ('gasoso');");
    /*drop table elementoquimico*/
    // /*3*/
    // // db.run("create table IF NOT EXISTS elementoquimico(id integer primary key AUTOINCREMENT ,nome text,simbolo text,numero INTEGER,estado INTEGER,descricao text);");
    // db.run("create table IF NOT EXISTS compostoquimico(id integer primary key AUTOINCREMENT, nome text,aparencia text)");
    // db.run("create table IF NOT EXISTS formulaquimica(id integer primary key AUTOINCREMENT, idcomposto integer, idelemento integer,quantidade integer);");
    // /*4 inserção de exemplo*/
    // db.run("insert into elementoquimico(nome,simbolo,numero,estado) values ('Hidrogênio','H',1,2);");
    // db.run("insert into elementoquimico(nome,simbolo,numero,estado) values ('Hélio','HE',1,2);");
    // db.run("insert into elementoquimico(nome,simbolo,numero,estado) values ('Lítio','LI','3','1');");
}

exports.createestadomateria = createestadomateria;

//   let insertData = () =>{
//     console.log("Insert data")
//     db.run('INSERT INTO contacts (name) VALUES (?)', ["contact 001"]);
//     console.log("Insert data exit")
//   }


// let dbrunparams = (sqlQry,params) =>{
//     console.log("Insert data")
//     db.run(sqlQry, params);
//     console.log("Insert data exit")
//   }
  
  
  // let dbrun = (sqlQry,params) =>{
  //   console.log("Insert data")
  //   db.run(sqlQry, params);
  //   console.log("Insert data exit")
  // }
  
  // let read = () => {
  //   console.log("Read data from contacts");
  //   db.all("SELECT rowid AS id, name FROM contacts", function(err, rows) {
  //       // rows.forEach(function (row) {
  //       //     console.log(row.id + ": " + row.name);
  //       // });
  //   });
  // }
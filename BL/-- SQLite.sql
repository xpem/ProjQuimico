-- SQLite
select id,nome,aparencia from compostoquimico where id in (SELECT DISTINCT(idcomposto) FROM formulaquimica where idelemento = '25')
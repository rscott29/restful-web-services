-- noinspection SqlNoDataSourceInspectionForFile

insert into user values(10001, sysdate(), 'Richard')
insert into user values(10002, sysdate(), 'Esther')
insert into user values(10003, sysdate(), 'Jacob')
insert into user values(10004, sysdate(), 'Sarah')

insert into post values(11001, 'my first post', 10001 )
insert into post values(11002, 'my second post', 10001 )
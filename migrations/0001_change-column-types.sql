-- Migration number: 0001 	 2024-03-15T13:21:02.108Z
create table vehicles_dg_tmp
(
    id          INTEGER
        primary key autoincrement,
    plate       TEXT              not null,
    type        INTEGER default 1 not null,
    date_added  TEXT,
    date_expire TEXT,
    building    TEXT,
    flat        TEXT,
    phone       TEXT,
    phone2      TEXT
);

insert into vehicles_dg_tmp(id, plate, type, date_added, date_expire, building, flat, phone, phone2)
select id,
       plate,
       type,
       date_added,
       date_expire,
       building,
       flat,
       phone,
       phone2
from vehicles;

drop table vehicles;

alter table vehicles_dg_tmp
    rename to vehicles;


create table if not exists users (
    userId int auto_increment not null,
    userName varchar(255) not null,
    passwordHash varchar(512) not null,
    created timestamp not null default current_timestamp,
    updated timestamp not null on update current_timestamp,
    lastLogin timestamp null,
    primary key (userId),
    index (username),
    index (created),
    index (updated),
    index (lastLogin)
);

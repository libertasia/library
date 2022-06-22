DROP TABLE IF EXISTS
   categories,
   statuses,
   roles,
   authors,
   books,
   users
CASCADE;

create table categories(
  id serial primary key,
  title varchar(50) not null unique
);

create table statuses(
  id serial primary key,
  title varchar(50) not null unique
);

create table roles(
  id serial primary key,
  title varchar(50) not null unique
);

create table authors(
  id serial primary key,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  birth_year date not null,
  biography text not null
);

create table users(
  id serial primary key,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  email varchar(50) not null unique,
  user_name varchar(50),
  role_id int references roles(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

create table books(
  id serial primary key,
  title varchar(100) not null unique,
  isbn varchar(13) not null unique,
  category_id int references categories(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  description text not null,
  publisher varchar(100) not null,
  published_year date not null,
  number_of_pages int not null,
  status_id int references statuses(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  borrower_id int references users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  borrow_date date,
  return_date date check (return_date > borrow_date)
);

create table books_authors(
  CONSTRAINT books_authors_pkey PRIMARY KEY (book_id, author_id),
  book_id int references books(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  author_id int references authors(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

insert into categories (title)
values
  ('Classics'),
  ('Romance'),
  ('Biology');

SELECT * FROM categories;

insert into statuses (title)
values
  ('available'),
  ('borrowed');

SELECT * FROM statuses;

insert into roles (title)
values
  ('user'),
  ('admin');

SELECT * FROM roles;

insert into authors (first_name, last_name, birth_year, biography)
values
  ('Author 1 first name', 'Author 1 last name', '1981-01-01', 'some biography'),
  ('Author 2 first name', 'Author 2 last name', '1982-01-01', 'some biography'),
  ('Author 3 first name', 'Author 3 last name', '1983-01-01', 'some biography'),
  ('Author 4 first name', 'Author 4 last name', '1984-01-01', 'some biography'),
  ('Author 5 first name', 'Author 5 last name', '1985-01-01', 'some biography');

SELECT * FROM authors;

WITH ins (first_name, last_name, email, user_name, role) AS
( VALUES
    ( 'User 1 first name', 'User 1 last name', 'user1@user.com', 'user1', 'user'),
    ( 'User 2 first name', 'User 2 last name', 'user2@user.com', 'user2', 'user'),
    ( 'User 3 first name', 'User 3 last name', 'user3@user.com', 'user3', 'admin')
)
INSERT INTO users (first_name, last_name, email, user_name, role_id)

SELECT
    ins.first_name, ins.last_name, ins.email, ins.user_name, roles.id
FROM
  roles JOIN ins
    ON ins.role = roles.title;

SELECT * FROM users;

WITH ins (title, isbn, category, description, publisher, published_year, number_of_pages, bookstatus) AS
( VALUES
    ( 'Book1', '1111111111', 'Classics', 'some descriptoion', 'some publisher', '1985-01-01'::date, 267, 'available'),
    ( 'Book2', '2222222222', 'Romance', 'some descriptoion', 'some publisher', '1985-01-01'::date, 768, 'available'),
    ( 'Book3', '3333333333', 'Biology', 'some descriptoion', 'some publisher', '1985-01-01'::date, 567, 'available')
)
INSERT INTO books (title, isbn, category_id, description, publisher, published_year, number_of_pages, status_id)

SELECT
    ins.title, ins.isbn, categories.id, ins.description, ins.publisher, ins.published_year, ins.number_of_pages, statuses.id
FROM
  categories JOIN ins
    ON ins.category = categories.title
  JOIN statuses
    ON ins.bookstatus = statuses.title;

SELECT * FROM books;

create or replace
procedure gen_books_author(
          booktitle varchar
        , authorfirstname varchar
        , authorlastname varchar
        )
  language sql
as $$
    insert into books_authors (book_id, author_id)
         select book_id, author_id
           from (select id as book_id
                   from books
                  where title = booktitle
                ) books
              , (select id as author_id
                   from authors
                  where first_name = authorfirstname AND last_name = authorlastname
                ) authors
          on conflict (book_id, author_id) do nothing;
$$;

do $$
begin
  call gen_books_author('Book1','Author 1 first name', 'Author 1 last name') ;
  call gen_books_author('Book1','Author 2 first name', 'Author 2 last name') ;
  call gen_books_author('Book1','Author 5 first name', 'Author 5 last name') ;
  call gen_books_author('Book2','Author 3 first name', 'Author 3 last name') ;
  call gen_books_author('Book3','Author 4 first name', 'Author 4 last name') ;
  call gen_books_author('Book3','Author 1 first name', 'Author 1 last name') ;
end;
$$;

SELECT * FROM books_authors;

select title AS book_title , first_name AS author_first_name, last_name AS author_last_name
  from books_authors
  join books
    on (books.id = books_authors.book_id)
  join authors
    on (authors.id = books_authors.author_id)
 order by book_title , author_first_name, author_last_name;

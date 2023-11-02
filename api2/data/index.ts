import pg from "pg";

const client = new pg.Client({
  host: "localhost",
  port: 5432,
  user: "node_gmp",
  password: "password123",
  database: "node_gmp",
});

const runBase = async () => {
  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS Employee ( 
        id serial PRIMARY KEY,
        name character varying NOT NULL,
        joinDate TIMESTAMP WITH TIME ZONE NOT NULL);`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS Hardware (
        "Serial" character varying PRIMARY KEY,
        os character varying NOT NULL,
        year integer NOT NULL,
        ram integer NOT NULL,
        employeeId integer,
        CONSTRAINT fk_employee FOREIGN KEY(employeeId) REFERENCES Employee(id)
);`);
};
runBase();

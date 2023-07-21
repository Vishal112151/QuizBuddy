const { Pool, Client } = require("pg");
const pgConn = async (query, params) => {
    return new Promise(async (resolve, reject) => {
      try {
        const client = new Client({
          user: "postgres",
          host: "localhost",
          database: "login",
          password: "vishal",
          port: 5432,
        });
        try {
          await client.connect();
          console.log("connected to DB:)");
          // console.log(await client.query("SELECT NOW()"));
          if (params && params.length > 0) {
            resolve(await client.query(query, params));
          } else {
            resolve(await client.query(query));
          }
          await client.end();
        } catch (error) {
          console.log("Error in DB Connection", error.message);
          reject(error);
        }
      } catch(error) {
        console.log("error in DB", error.message);
        reject(error);
      }
    }).catch();
  };
  
  module.exports={pgConn}
  
import mysql from 'mysql';
import {dbHost, dbUser, dbPassword, dbName} from '../sensitiveStuff'

let databaseHelper = {};

let mysqlStringifyValues = (values) =>
{
  return values.map((currentValue) => {
    if(typeof currentValue === 'string'){
      return "'" + currentValue + "'";
    }
    return currentValue;
  });
}

// databaseHelper.handleDisconnect = () => {
//   console.log("Reconnecting.");
//   console.log('new id ' + databaseHelper.connection.threadId);
//   databaseHelper.connection = createConnection();
//   console.log(databaseHelper.connection.threadId);
//   databaseHelper.connection.connect((error) => {
//     if(error.code == "PROTOCOL_CONNECTION_LOST")
//     {
//       //RECURSION WOWOWOWOOWOWOWOW
//       databaseHelper.handleDisconnect();
//     }
//   });
// }

databaseHelper.tryQuery = (queryString, values) => {
  return new Promise((resolve, reject) =>
    {
      databaseHelper.pool.query(queryString, values, (error, results, fields) => {
        if(error){
            console.log(`When running ${queryString} recieved an error.
                        Error Code: ${error.code}
                        Error Message: ${error.message}`);
        }
        else
        {
          resolve(results)
        }
    });
  });
}

// let createConnection = () => {
//   let connection =  mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     database: 'headline_analyzer',
//     password: ''
//   });
//   connection.on('error', (error) => {
//     if(error.code == "PROTOCOL_CONNECTION_LOST")
//     {
//       databaseHelper.handleDisconnect();
//     }
//   });
//   return connection;
// }

let createPool = () => {
  let pool = mysql.createPool({
    connectionLimit: 10,
    host: dbHost,
    user: dbUser,
    database: dbName,
    password: dbPassword
  });
  return pool;
}

databaseHelper.pool = createPool();

// databaseHelper.connection = createConnection();

export default databaseHelper;

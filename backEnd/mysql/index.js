var mysql = require('mysql');
var config = require('../config/default.js');
var moment = require('moment');

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
});

class Mysql {
  constructor() {}
  getChatData() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * from chatWords', function(error, results, fields) {
        let counts = 0;
        if (error) {
          throw error;
        }
        results.forEach(item => {
          const userName = pool.query(
            `SELECT username from user WHERE id=${item.userId}`,
            function(error, result) {
              try {
                if (error) {
                  throw error;
                }
                item.userName = result[0].username;
                counts++;
                if (counts === results.length) {
                  resolve(results);
                }
              } catch (error) {
                console.log('error: ', error);
                item.userName = '匿名';
              }
            }
          );
        });
      });
    });
  }
  addChatData(chatData) {
    const { userName, userContent, msgType = 1 } = chatData;
    const nowTime = moment(new Date()).format('YYYY-MM-DD HH-mm-ss');
    return new Promise((reslove, reject) => {
      pool.query(`SELECT id from user WHERE username="${userName}"`, function(
        error,
        results,
        fields
      ) {
        try {
          if (error) {
            throw error;
          }
          if (results.length === 0) {
            pool.query(
              `INSERT INTO user (username) VALUES ("${userName}")`,
              function(error, result) {
                if (error) {
                  throw error;
                }
                pool.query(
                  `INSERT INTO chatWords (content,time,userId,msgType) VALUES ("${userContent}","${nowTime}",${result.insertId},${msgType})`,
                  function(error, result) {
                    if (error) {
                      throw error;
                    }
                    reslove(true);
                  }
                );
              }
            );
          } else {
            pool.query(
              `INSERT INTO chatWords (content,time,userId,msgType) VALUES ("${userContent}","${nowTime}",${results[0].id},${msgType})`,
              function(error, result) {
                if (error) {
                  throw error;
                }
                reslove(true);
              }
            );
          }
        } catch (error) {
          console.log('error: ', error);
        }
      });
    });
  }
}

module.exports = new Mysql();

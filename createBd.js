import {openDatabase} from 'react-native-sqlite-storage';

function errorCB(err) {
  console.log('SQL Error: ' + err);
}

function openCB() {
  console.log('Database OPENED');
}
export const getDbConnection = async () => {
  let db = openDatabase('chat_db.db', '1,0', 'user', -1, openCB, errorCB);
  return db;
};

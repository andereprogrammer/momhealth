import {
  enablePromise,
  openDatabase,
  ResultSet,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {IMessage} from 'react-native-gifted-chat';
import SQLite from 'react-native-sqlite-storage';

const tableName = 'chat_messages';

enablePromise(true);

export const getDBConnection = async (): Promise<SQLiteDatabase> => {
  console.log('opened');
  const db = await openDatabase({
    name: 'chat_data',
    location: 'default',
  });
  return db;
};

export const createTable = async (db: SQLiteDatabase) => {
  // Create table if not exists
  console.log('klp');
  const query = `CREATE TABLE ${tableName}(
      id TEXT PRIMARY KEY,
      createdAt INTEGER,
      text TEXT,
      userId TEXT
    );`;

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS chat_messages (
            id VARCHAR(255) PRIMARY KEY,
            createdAt VARCHAR(255),
            text VARCHAR(255),
            userId VARCHAR(255)
          );`,
      [],
      () => {
        console.log('Database created successfully.');
      },
      error => {
        console.log('Error creating database:', error);
      },
    );
  });
};

// export const saveMessage = async (db: SQLiteDatabase, message: IMessage) => {
//   console.log(message);
//   const {user, text, createdAt} = message;
//   const query = `
//     INSERT INTO ${tableName} (sender, receiver, message, timestamp)
//     VALUES (?, ?, ?, ?);
//   `;
//   const values = [user._id, 'keshav@localhost', text, createdAt.getTime()];

//   await db.executeSql(query, values);
// };
export const saveMessage = async (db: SQLiteDatabase, messages: IMessage[]) => {
  try {
    createTable(db);
    const insertPromises = messages.map(message => {
      const {_id, createdAt, text, user} = message;
      const {_id: userId} = user;
      return db.executeSql(
        `INSERT INTO ${tableName}(id, createdAt, text, userId) VALUES (?, ?, ?, ?)`,
        [_id, createdAt, text, userId],
      );
    });

    Promise.all(insertPromises);
    console.log('Messages saved successfully!');
  } catch (error) {
    console.error('Error saving messages:', error);
    throw new Error('Failed to save messages!');
  }
};

export const retrieveChatMessages = async (dbs: SQLiteDatabase) => {
  let sql = 'SELECT * FROM chat_messages';

  dbs.transaction(tx => {
    tx.executeSql(
      sql,
      [],
      (tx, resultSet) => {
        var length = resultSet.rows.length;
        for (var i = 0; i < length; i++) {
          console.log(resultSet.rows.item(i));
        }
      },
      error => {
        console.log('List user error', error);
      },
    );
  });
};

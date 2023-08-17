import Dexie from 'dexie';
import { TasksFormData } from '../interface/DataInterface';

class Database extends Dexie {
  customTables: { [key: string]: Dexie.Table<TasksFormData, number> } = {};

  constructor(databaseName: string, tableDefinitions: { [key: string]: string }) {
    super(databaseName);

    // Define the version and stores based on tableDefinitions
    this.version(1).stores(tableDefinitions);

    // Dynamically create table instances based on provided definitions
    for (const tableName in tableDefinitions) {
      this.customTables[tableName] = this.table(tableName);
    }
  }

  // Method to clear a table
  clearTable(tableName: string) {
    if (this.customTables[tableName]) {
      return this.customTables[tableName].clear();
    } else {
      console.warn(`Table ${tableName} does not exist.`);
    }
  }
}

// Create an instance of the Database for TaskManagement
const tableDefinitions = {
  taskManagement: '++id, title, description, status',
};

export const db = new Database('TaskManagement', tableDefinitions);

export default Database;

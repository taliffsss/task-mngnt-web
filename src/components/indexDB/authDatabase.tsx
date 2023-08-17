import Dexie from 'dexie';

class AuthTokenDatabase extends Dexie {
  authToken: Dexie.Table<{ id?: number; token: string }, number>;

  constructor() {
    super('AuthTokenDatabase');
    this.version(1).stores({
      taskManagement: '++id, token',
    });
    this.authToken = this.table('taskManagement');
  }

  // Method to clear the auth token
  clearAuthToken() {
    return this.authToken.clear();
  }
}

// Create a single instance of the AuthTokenDatabase
const authTokenDatabase = new AuthTokenDatabase();

export default authTokenDatabase;
import PocketBase from 'pocketbase';

export const POCKET_BASE_URL = "http://127.0.0.1:8090";

export class DatabaseClient {
  client: PocketBase;

  constructor() {
    this.client = new PocketBase(POCKET_BASE_URL);
    this.client.autoCancellation(false);
  }

  async authenticate(email: string, password: string) {
    try {
      const result = await this.client.collection("users").authWithPassword(email, password);
      if (!result?.token) {
        throw new Error("Invalid email or password");
      }
      return result;
    } catch (err) {
      console.error(err);
      throw new Error("Invalid email or password");
    }
  }

  async register(email: string, password: string, role: string) {
    try {
      const result = await this.client.collection("users").create({
        email,
        password,
        passwordConfirm: password,
        role,
      });
      return result;
    } catch (err) {
      console.error(err);
      throw new Error("Registration failed");
    }
  }

  async isAuthenticated(token: string) {
    try {
      console.log("Loading token:", token);
      this.client.authStore.save(token, null); // Save the token manually

      const isValid = this.client.authStore.isValid;
      console.log("Is token valid:", isValid);

      if (!isValid) {
        console.log("AuthStore model:", this.client.authStore.model);
        console.log("AuthStore token:", this.client.authStore.token);
      }

      return isValid;
    } catch (err) {
      console.error("Authentication failed:", err);
      return false;
    }
  }

  async getUser(token: string) {
    try {
      this.client.authStore.save(token, null); // Save the token manually
      return this.client.authStore.model;
    } catch (err) {
      console.error("Failed to load user from token:", err);
      return null;
    }
  }
}

export const db = new DatabaseClient();
export default db;

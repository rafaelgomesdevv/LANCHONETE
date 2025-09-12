import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { 
  type User, type InsertUser,
  type MenuItem, type InsertMenuItem,
  type Review, type InsertReview,
  type RestaurantInfo, type InsertRestaurantInfo,
  users, menuItems, reviews, restaurantInfo
} from "@shared/schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Menu Items
  getMenuItems(): Promise<MenuItem[]>;
  getMenuItem(id: string): Promise<MenuItem | undefined>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: string, item: Partial<InsertMenuItem>): Promise<MenuItem>;
  deleteMenuItem(id: string): Promise<void>;

  // Reviews
  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Restaurant Info
  getRestaurantInfo(): Promise<RestaurantInfo | undefined>;
  updateRestaurantInfo(info: InsertRestaurantInfo): Promise<RestaurantInfo>;
}

export class DbStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Menu Items
  async getMenuItems(): Promise<MenuItem[]> {
    return await db.select().from(menuItems).where(eq(menuItems.available, true));
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    const result = await db.select().from(menuItems).where(eq(menuItems.id, id));
    return result[0];
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const result = await db.insert(menuItems).values(item).returning();
    return result[0];
  }

  async updateMenuItem(id: string, item: Partial<InsertMenuItem>): Promise<MenuItem> {
    const result = await db.update(menuItems)
      .set(item)
      .where(eq(menuItems.id, id))
      .returning();
    return result[0];
  }

  async deleteMenuItem(id: string): Promise<void> {
    await db.update(menuItems)
      .set({ available: false })
      .where(eq(menuItems.id, id));
  }

  // Reviews
  async getReviews(): Promise<Review[]> {
    return await db.select().from(reviews);
  }

  async createReview(review: InsertReview): Promise<Review> {
    const result = await db.insert(reviews).values(review).returning();
    return result[0];
  }

  // Restaurant Info
  async getRestaurantInfo(): Promise<RestaurantInfo | undefined> {
    const result = await db.select().from(restaurantInfo).where(eq(restaurantInfo.id, "main"));
    return result[0];
  }

  async updateRestaurantInfo(info: InsertRestaurantInfo): Promise<RestaurantInfo> {
    const result = await db.insert(restaurantInfo)
      .values({ ...info, id: "main" })
      .onConflictDoUpdate({
        target: restaurantInfo.id,
        set: { ...info, updatedAt: new Date() }
      })
      .returning();
    return result[0];
  }
}

export const storage = new DbStorage();

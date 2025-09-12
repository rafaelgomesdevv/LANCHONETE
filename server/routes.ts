import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMenuItemSchema, insertReviewSchema, insertRestaurantInfoSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Menu Items API
  app.get("/api/menu", async (req, res) => {
    try {
      const items = await storage.getMenuItems();
      res.json(items);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).json({ error: "Failed to fetch menu items" });
    }
  });

  app.get("/api/menu/:id", async (req, res) => {
    try {
      const item = await storage.getMenuItem(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Menu item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error("Error fetching menu item:", error);
      res.status(500).json({ error: "Failed to fetch menu item" });
    }
  });

  app.post("/api/menu", async (req, res) => {
    try {
      const validatedData = insertMenuItemSchema.parse(req.body);
      const item = await storage.createMenuItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating menu item:", error);
      res.status(500).json({ error: "Failed to create menu item" });
    }
  });

  app.put("/api/menu/:id", async (req, res) => {
    try {
      const validatedData = insertMenuItemSchema.partial().parse(req.body);
      const item = await storage.updateMenuItem(req.params.id, validatedData);
      res.json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error updating menu item:", error);
      res.status(500).json({ error: "Failed to update menu item" });
    }
  });

  app.patch("/api/menu/:id", async (req, res) => {
    try {
      const validatedData = insertMenuItemSchema.partial().parse(req.body);
      const item = await storage.updateMenuItem(req.params.id, validatedData);
      res.json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error updating menu item:", error);
      res.status(500).json({ error: "Failed to update menu item" });
    }
  });

  app.delete("/api/menu/:id", async (req, res) => {
    try {
      await storage.deleteMenuItem(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting menu item:", error);
      res.status(500).json({ error: "Failed to delete menu item" });
    }
  });

  // Reviews API
  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviews();
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating review:", error);
      res.status(500).json({ error: "Failed to create review" });
    }
  });

  // Restaurant Info API
  app.get("/api/restaurant", async (req, res) => {
    try {
      const info = await storage.getRestaurantInfo();
      res.json(info);
    } catch (error) {
      console.error("Error fetching restaurant info:", error);
      res.status(500).json({ error: "Failed to fetch restaurant info" });
    }
  });

  app.put("/api/restaurant", async (req, res) => {
    try {
      const validatedData = insertRestaurantInfoSchema.parse(req.body);
      const info = await storage.updateRestaurantInfo(validatedData);
      res.json(info);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error updating restaurant info:", error);
      res.status(500).json({ error: "Failed to update restaurant info" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

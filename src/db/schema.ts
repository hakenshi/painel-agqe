"server-only";

import "dotenv/config";
import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const colorsEnum = pgEnum("colors", [
  "black",
  "pink",
  "purple",
  "blue",
  "teal",
  "red",
  "indigo",
  "yellow",
  "green",
  "gray",
  "orange",
  "cyan",
  "lime",
]);

export const usersSchema = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  cpf: varchar("cpf", { length: 14 }).notNull(),
  color: colorsEnum("colors").notNull().default("pink"),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  secondName: varchar("second_name", { length: 255 }).notNull(),
  photo: varchar("photo"),
  occupation: varchar("occupation", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  birthDate: date("birth_date").notNull(),
  joinedAt: date("joined_at").notNull(),
  createAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const sponsorsSchema = pgTable("sponsors", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  logo: varchar("logo").notNull(),
  website: varchar("website", { length: 255 }).notNull(),
  sponsoringSince: timestamp("sponsoring_since").notNull(),
  createAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const eventTypeEnum = pgEnum("event_type", [
  "gallery",
  "event",
  "event_gallery",
]);

export const eventsSchema = pgTable("events", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  coverImage: varchar("cover_image").notNull(),
  eventType: eventTypeEnum("event_type").notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  markdown: varchar("markdown"),
  date: date("date").notNull(),
  startingTime: time("starting_time").notNull(),
  endingTime: time("ending_time").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  createAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const eventImagesSchema = pgTable("event_images", {
  id: serial("id").primaryKey().notNull(),
  eventId: integer("event_id")
    .references(() => eventsSchema.id)
    .notNull(),
  imageUrl: varchar("image_url").notNull(),
  createAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const eventImagesRelation = relations(eventsSchema, ({ many }) => ({
  images: many(eventImagesSchema),
}));

export const imageEventsRelation = relations(eventImagesSchema, ({ one }) => ({
  event: one(eventsSchema, {
    fields: [eventImagesSchema.eventId],
    references: [eventsSchema.id],
  }),
}));

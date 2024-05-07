import { pgTable, serial, text, uuid, varchar, timestamp, time, pgEnum, PgEnumColumn, PgColumn, date, jsonb } from "drizzle-orm/pg-core";
import { json } from "stream/consumers";

export const genres = pgEnum("genres",["Rap", "Rock", "Disco-Polo", "Techno", "Electronic"])
export const place_categories = pgEnum("place_categories",["Pub", "Bar", "Club", "Open Space", "Festival"])


export const artists = pgTable('artists', {
    id: uuid('id').primaryKey(),
    created_at: timestamp("created_at"),
    first_name: text('first_name').notNull(),
    last_name: text('last_name').notNull(),
    artist_name: text('artist_name').notNull(),
    image_url: text('image_url'),
    genre: genres("genre").notNull(),
});


export const organizers = pgTable('organizers', {
    id: uuid('id').primaryKey(),
    created_at: timestamp("created_at"),
    first_name: text('first_name'),
    last_name: text('last_name'),
    image_url: text('image_url'),
    
});

export const social_media = pgTable('social_media', {
    id: uuid('id').primaryKey(),
    spotify: text('spotify'),
    youtube: text('youtube'),
    soundcloud: text('soundcloud'),
    instagram: text('instagram'),
    tiktok: text('tiktok'),

    artist_id: uuid("artist_id").references(()=>artists.id),
    organizer_id: uuid("organizers_id").references(()=>organizers.id)
});

export const organizers_place = pgTable('ogranisators_place', {
    id: uuid('id').primaryKey(),
    created_at: timestamp("created_at"),
    place_name: text("place_name"),
    address: text("address"),
    place_category: place_categories("place_category"),
    coordinates: jsonb('coordinates'),
    
    organizers_id: uuid('organizers_id').references(() => organizers.id)


});

export const place_event = pgTable('place_event', {
    id: uuid('id').primaryKey(),
    created_at: timestamp("created_at"),
    date: date('date'),
    event_name: text('event_name'),
    description: text('description'),

    place_uuid: uuid('place_uuid').references(() => organizers.id)
});

import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  decimal,
  boolean,
  varchar,
  foreignKey,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";




// ============================================================================
// USUARIOS
// ============================================================================
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkId: text("clerk_id").unique().notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    username: varchar("username", { length: 100 }).unique(),
    fullName: varchar("full_name", { length: 255 }),
    avatarUrl: text("avatar_url"),
    role: varchar("role", { length: 50 }).default("student"), // 'student', 'instructor', 'admin'
    bio: text("bio"),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => ({
    clerkIdIdx: index("clerk_id_idx").on(table.clerkId),
    emailIdx: index("email_idx").on(table.email),
    roleIdx: index("role_idx").on(table.role),
  })
);

// ============================================================================
// CATEGORIAS
// ============================================================================
export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).unique().notNull(),
    slug: varchar("slug", { length: 100 }).unique().notNull(),
    description: text("description"),
    icon: text("icon"), // lucide-react icon name
    color: varchar("color", { length: 20 }), // hex color or tailwind class
    order: integer("order").default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => ({
    slugIdx: index("category_slug_idx").on(table.slug),
  })
);

// ============================================================================
// CURSOS CURADOS
// ============================================================================
export const curatedCourses = pgTable(
  "curated_courses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    description: text("description"),
    longDescription: text("long_description"),
    thumbnail: text("thumbnail"),
    categoryId: uuid("category_id").notNull(),
    instructorId: uuid("instructor_id"),
    level: varchar("level", { length: 50 }).default("beginner"), // 'beginner', 'intermediate', 'advanced'
    duration: integer("duration"), // total duration in minutes
    isPublished: boolean("is_published").default(false),
    enrollmentCount: integer("enrollment_count").default(0),
    rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => ({
    slugIdx: index("course_slug_idx").on(table.slug),
    categoryIdx: index("course_category_idx").on(table.categoryId),
    instructorIdx: index("course_instructor_idx").on(table.instructorId),
    publishedIdx: index("course_published_idx").on(table.isPublished),
    categoryFk: foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: "course_category_fk",
    }).onDelete("cascade"),
    instructorFk: foreignKey({
      columns: [table.instructorId],
      foreignColumns: [users.id],
      name: "course_instructor_fk",
    }).onDelete("set null"),
  })
);


// ============================================================================
// VIDEO ITEMS
// ============================================================================
export const videoItems = pgTable(
  "video_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    courseId: uuid("course_id").notNull(),
    youtubeId: varchar("youtube_id", { length: 50 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    thumbnail: text("thumbnail"),
    duration: integer("duration").notNull(), // in seconds
    channel: varchar("channel", { length: 255 }),
    order: integer("order").notNull(),
    isAvailable: boolean("is_available").default(true),
    viewCount: integer("view_count").default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => ({
    courseIdx: index("video_course_idx").on(table.courseId),
    youtubeIdIdx: index("video_youtube_idx").on(table.youtubeId),
    availableIdx: index("video_available_idx").on(table.isAvailable),
    courseFk: foreignKey({
      columns: [table.courseId],
      foreignColumns: [curatedCourses.id],
      name: "video_course_fk",
    }).onDelete("cascade"),
  })
);




// ============================================================================
// PROGRESSO DO USUÁRIO
// ============================================================================
export const userProgress = pgTable(
  "user_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    videoId: uuid("video_id").notNull(),
    progressPercent: integer("progress_percent").default(0),
    isCompleted: boolean("is_completed").default(false),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    lastWatchedAt: timestamp("last_watched_at", { withTimezone: true }),
    watchTime: integer("watch_time").default(0), // in seconds
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => ({
    userIdx: index("progress_user_idx").on(table.userId),
    videoIdx: index("progress_video_idx").on(table.videoId),
    completedIdx: index("progress_completed_idx").on(table.isCompleted),
    userVideoIdx: index("progress_user_video_idx").on(table.userId, table.videoId),
    userFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "progress_user_fk",
    }).onDelete("cascade"),
    videoFk: foreignKey({
      columns: [table.videoId],
      foreignColumns: [videoItems.id],
      name: "progress_video_fk",
    }).onDelete("cascade"),
  })
);

// ============================================================================
// PLAYLISTS DO USUÁRIO
// ============================================================================
export const userPlaylists = pgTable(
  "user_playlists",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    isPublic: boolean("is_public").default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => ({
    userIdx: index("playlist_user_idx").on(table.userId),
    userFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "playlist_user_fk",
    }).onDelete("cascade"),
  })
);

// ============================================================================
// PLAYLIST ITEMS (JUNÇÃO DA TABELA PARA PLAYLISTS E VÍDEOS)
// ============================================================================
export const playlistItems = pgTable(
  "playlist_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    playlistId: uuid("playlist_id").notNull(),
    videoId: uuid("video_id").notNull(),
    order: integer("order").notNull(),
    addedAt: timestamp("added_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => ({
    playlistIdx: index("playlist_item_playlist_idx").on(table.playlistId),
    videoIdx: index("playlist_item_video_idx").on(table.videoId),
    playlistFk: foreignKey({
      columns: [table.playlistId],
      foreignColumns: [userPlaylists.id],
      name: "playlist_item_playlist_fk",
    }).onDelete("cascade"),
    videoFk: foreignKey({
      columns: [table.videoId],
      foreignColumns: [videoItems.id],
      name: "playlist_item_video_fk",
    }).onDelete("cascade"),
  })
);

// ============================================================================
// INSCRIÇÕES DO USUÁRIO (Matrículas em cursos)
// ============================================================================
export const userEnrollments = pgTable(
  "user_enrollments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    courseId: uuid("course_id").notNull(),
    enrolledAt: timestamp("enrolled_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    progressPercent: integer("progress_percent").default(0),
  },
  (table) => ({
    userIdx: index("enrollment_user_idx").on(table.userId),
    courseIdx: index("enrollment_course_idx").on(table.courseId),
    userCourseIdx: index("enrollment_user_course_idx").on(
      table.userId,
      table.courseId
    ),
    userFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "enrollment_user_fk",
    }).onDelete("cascade"),
    courseFk: foreignKey({
      columns: [table.courseId],
      foreignColumns: [curatedCourses.id],
      name: "enrollment_course_fk",
    }).onDelete("cascade"),
  })
);











// ============================================================================
// RELACIONAMENTOS
// ============================================================================

export const usersRelations = relations(users, ({ many }) => ({
  courses: many(curatedCourses),
  progress: many(userProgress),
  playlists: many(userPlaylists),
  enrollments: many(userEnrollments),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  courses: many(curatedCourses),
}));

export const curatedCoursesRelations = relations(
  curatedCourses,
  ({ one, many }) => ({
    category: one(categories, {
      fields: [curatedCourses.categoryId],
      references: [categories.id],
    }),
    instructor: one(users, {
      fields: [curatedCourses.instructorId],
      references: [users.id],
    }),
    videos: many(videoItems),
    enrollments: many(userEnrollments),
  })
);

export const videoItemsRelations = relations(
  videoItems,
  ({ one, many }) => ({
    course: one(curatedCourses, {
      fields: [videoItems.courseId],
      references: [curatedCourses.id],
    }),
    progress: many(userProgress),
    playlistItems: many(playlistItems),
  })
);

export const userProgressRelations = relations(
  userProgress,
  ({ one }) => ({
    user: one(users, {
      fields: [userProgress.userId],
      references: [users.id],
    }),
    video: one(videoItems, {
      fields: [userProgress.videoId],
      references: [videoItems.id],
    }),
  })
);

export const userPlaylistsRelations = relations(
  userPlaylists,
  ({ one, many }) => ({
    user: one(users, {
      fields: [userPlaylists.userId],
      references: [users.id],
    }),
    items: many(playlistItems),
  })
);

export const playlistItemsRelations = relations(playlistItems, ({ one }) => ({
  playlist: one(userPlaylists, {
    fields: [playlistItems.playlistId],
    references: [userPlaylists.id],
  }),
  video: one(videoItems, {
    fields: [playlistItems.videoId],
    references: [videoItems.id],
  }),
}));

export const userEnrollmentsRelations = relations(
  userEnrollments,
  ({ one }) => ({
    user: one(users, {
      fields: [userEnrollments.userId],
      references: [users.id],
    }),
    course: one(curatedCourses, {
      fields: [userEnrollments.courseId],
      references: [curatedCourses.id],
    }),
  })
);

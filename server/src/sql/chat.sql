DROP TABLE IF EXISTS "Messages";
DROP TABLE IF EXISTS "Conversations";
DROP TABLE IF EXISTS "Catalogs";
CREATE TABLE "Conversations" (
    "id" SERIAL PRIMARY KEY,
    "participant1" INT NOT NULL,
    "participant2" INT NOT NULL,
    "blackList" BOOLEAN ARRAY NOT NULL DEFAULT ARRAY [false, false],
    "favoriteList" BOOLEAN ARRAY NOT NULL DEFAULT ARRAY [false, false]
);
CREATE TABLE "Messages" (
    "id" SERIAL PRIMARY KEY,
    "sender" INT NOT NULL,
    "body" TEXT NOT NULL,
    "conversationId" INT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("sender") REFERENCES "Users"("id"),
    FOREIGN KEY ("conversationId") REFERENCES "Conversations"("id")
);
CREATE TABLE "Catalogs" (
    "id" SERIAL PRIMARY KEY,
    "userId" INT NOT NULL,
    "catalogName" TEXT NOT NULL,
    "conversations" INT ARRAY NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "Users"("id")
);

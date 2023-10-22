WITH "TopCreativeUsers" AS (
  SELECT "id", "rating"
  FROM "Users"
  WHERE "role" = 'creator'
  ORDER BY "rating" DESC
  LIMIT 3
)
UPDATE "Users"
SET "balance" = "balance" + 10
WHERE "id" IN (SELECT "id" FROM "TopCreativeUsers");
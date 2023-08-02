-- UPDATE "Users"
-- JOIN "Contests" ON "Users"."id" = "Contests"."userId"
-- SET "Users"."balance" = "Users"."balance" + SUM("Contests"."prize" * 0.1)
-- WHERE "Users"."role" = 'customer'
-- AND "Contests"."createdAt" BETWEEN '2023-01-01' AND '2023-12-30';
;

UPDATE "Users" AS "u"
SET "balance" = "u"."balance" + (0.1 * "c"."total_spent")
FROM (
        SELECT "userId",
            SUM("prize") as "total_spent"
        FROM "Contests"
        WHERE (
                DATE_PART('month', "createdAt") >= 1
                AND DATE_PART('day', "createdAt") >= 1
            )
            OR (
                DATE_PART('month', "createdAt") = 1
                AND DATE_PART('day', "createdAt") <= 14
            )
        GROUP BY "userId"
    ) AS "c"
WHERE "u"."id" = "c"."userId";
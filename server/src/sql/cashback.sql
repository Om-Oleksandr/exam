WITH "contests" AS (
    SELECT "u"."id",
        SUM("c"."prize" * 0.1) as "cashbackAmount"
    FROM "Users" "u"
        JOIN "Contests" "c" ON "u"."id" = "c"."userId"
    WHERE "u"."id" = "c"."userId"
        AND (
            DATE_PART('month', "c"."createdAt") = 12
            AND DATE_PART('day', "c"."createdAt") >= 25
        )
        OR (
            DATE_PART('month', "c"."createdAt") = 1
            AND DATE_PART('day', "c"."createdAt") <= 14
        )
    GROUP BY "u"."id"
)
UPDATE "Users"
SET "balance" = "balance" + "contests"."cashbackAmount"
FROM "contests"
WHERE "Users"."id" = "contests"."id" AND "Users"."role" = 'customer';

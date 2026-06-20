-- Winter Midweek Special – Stay 3, Pay 2
-- Adds the 2026 winter promotion to the `specials` table.
-- Run against the site's Postgres database (POSTGRES_URL), e.g. via the
-- Vercel Postgres query console. The Specials section reads active rows
-- ordered by sort_order (see getSpecials() in src/lib/content.ts).
--
-- Price card: normal_price (R4 620 = 3 nights) strikes through to
-- special_price (R3 080 = pay for 2). The card's label is a fixed
-- "per person per night"; here the figures are 3-night totals.

INSERT INTO specials (headline, description, duration, normal_price, special_price, src_url, is_active, sort_order)
VALUES (
    'Winter Midweek Special – Stay 3, Pay 2',
    'Book two nights and get your third night FREE at Ida Olive Shepherd''s Cottage. Enjoy crackling fires, spectacular stargazing, winter wildflowers and peaceful farm living just outside McGregor. Valid Monday to Thursday, 29 June – 28 September 2026. Rates from R1 540 per night.',
    'Valid Mon–Thu · 29 Jun – 28 Sep 2026',
    4620.00,
    3080.00,
    NULL,
    TRUE,
    1
);

# ER Diagram Design Notes

This document briefly clarifies any non-trivial or ambiguous implementations in the (E)ER diagram.

## Distinction between reviews as per functional requirements

Our solution integrates both **external** and **internal reviews**.

### External reviews
- Stored as attributes in the `PRODUCTS` entity (`rating` and `num_reviews`).
- Represent feedback gathered from sources outside our platform (e.g., Google Product Reviews, manufacturer sites).
- The `rating` represents an average out of 5, and `num_reviews` stores the total count of these external reviews.
- Storing this information provides context and credibility for users browsing a product, allowing them to make informed decisions, especially when comparing similar items.

### Internal reviews
- Captured through the `REVIEWS` relationship between `USER` and `PRODUCTS`.
- Internal reviews consist of two attributes: `rating` (score out of 5) and `review_body` (written feedback).
- This information is user-generated on our platform and kept logically separate from external reviews.
- The use of an M:N relationship reflects that users can review multiple products, and products can have multiple internal reviews.

## User specialization

The `USER` entity has been **specialized** into three disjoint subtypes: `ADMINISTRATOR`, `RETAILER`, and `CUSTOMER`.

- This **disjoint specialization** enforces that each user account must be exactly one of these roles.
- Each subtype inherits common attributes from `USER` (e.g., `user_id`, `name`, `contact_info`, `password_hash`) and has role-specific attributes:
  - `ADMINISTRATOR`: `privilege_level`
  - `RETAILER`: `retailer_name`
  - `CUSTOMER`: No additional attributes

### Retailers selling products
- The binary `SELL` relationship captures a many-to-many connection between `RETAILERS` and `PRODUCTS`.
- This design accounts for the fact that multiple retailers can offer the same product (e.g., laptops from different vendors), possibly at different prices.
- Attributes like `discount_price`, `price`, and `product_link` are specific to a retailer’s listing of a product.

## Watchlist functionality

The `WATCHLIST` associative entity models a **many-to-many** relationship between `USER` (specifically `CUSTOMER`s) and `PRODUCTS`.

- Each entry contains a `date_added` timestamp to track when a product was added to the user's watchlist.

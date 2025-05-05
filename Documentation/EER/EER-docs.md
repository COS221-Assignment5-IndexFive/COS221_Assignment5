This document briefly clarifies any non-trivial or ambiguous implementations in the (E)ER diagram

## Distinction between reviews as per functional requirements
Our solution integrates both **external** and **internal reviews**

External reviews:
- Stored as attributes in the `PRODUCTS` entity (`rating` and `nr_external_reviews`)
- Reviews made by users outside of out platform, for example using Google Product Reviews
- Indicates the number of reviews made as well as the average rating of the product obtained from external sources
- Caching the number of reviews will prove useful insight to our user. For example, when comparing two similar products with similar ratings, a user might op for the product with more reviews for purposes of integrity.

Internal reviews:
- Modeled via the `REVIEWS` relationship between the `USER` and `PRODUCTS` entities. The relationship has the attributes `rating` and `review_body`, where `rating` is a score out of 5 and `review_body` is a comment left by the user.
- Internal reviews are made explicitly by users of our platform and is functionally seperate from external reviews.

## The `COMPARISONS` entity and its relationships
The purpose of the `COMPARISONS` entity is to cache all of the comparisons that a user makes for the purposes of building a user "history". The user should be able to view past comparisons.

There exists the relationships `PRODUCTS_1` and `PRODUCTS_2` between the `COMPARISONS` entity and the `PRODUCTS` entity. These relationships are modelled to accompany the structure of the `COMPARISONS` entity. It accompanies the functional requirement of comparing two products belonging to the same entity.
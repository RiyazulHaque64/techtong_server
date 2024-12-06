"use strict";
/**
 * @swagger
 * tags:
 *   name: Review
 *   description: API endpoints related to review
 */
// Create review
/**
 * @swagger
 * /api/v1/review:
 *   post:
 *     summary: Create a new review
 *     description: Creates a new review
 *     tags: [Review]
 *     security:
 *       - RetailerAuth: []
 *       - UserAuth: []
 *     requestBody:
 *       description: Product ID, rating and comment is required to add a new review
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - rating
 *               - comment
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product to add a review
 *                 example: 656c6ccf-199c-454c-937b-f41c148f673b
 *               rating:
 *                 type: number
 *                 description: The rating of the review
 *                 example: 5
 *               comment:
 *                 type: string
 *                 description: The comment of the review
 *                 example: This is a good product
 *     responses:
 *       201:
 *         description: If the review is created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: boolean
 *                    description: Indicates the success or failure of the operation
 *                  message:
 *                    type: string
 *                    description: A message indicating the result of the operation
 *                    example: Review provided successfully
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the new review
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the new review
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      user_id:
 *                        type: string
 *                        description: The ID of the user who provided the review
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      product_id:
 *                        type: string
 *                        description: The ID of the product
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      rating:
 *                        type: number
 *                        description: The rating of the review
 *                        example: 5
 *                      comment:
 *                        type: string
 *                        description: The comment of the review
 *                        example: This is a good product
 *                      created_at:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time the review was created
 *                        example: 2023-06-01T12:34:56.789Z
 *                      updated_at:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time the review was last updated
 *                        example: 2023-06-01T12:34:56.789Z
 *       401:
 *         description: If the user is not authenticated for the request. Only registered users can provide a review
 *       400:
 *         description: If the request is invalid or missing required fields
 */
// Get reviews by product id
/**
 * @swagger
 * /api/v1/review/{product_id}:
 *   get:
 *     summary: Retrieve reviews by product ID
 *     description: Retrieves a list of reviews for a specific product
 *     tags: [Review]
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve reviews for
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: The number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: The field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: asc | desc
 *           enum: [asc, desc]
 *         description: The order to sort by (asc or desc)
 *     responses:
 *       200:
 *         description: If the reviews are retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  success:
 *                    type: boolean
 *                    description: Indicates the success or failure of the operation
 *                  message:
 *                    type: string
 *                    description: A message indicating the result of the operation
 *                    example: Reviews retrieved successfully
 *                  meta:
 *                    type: object
 *                    description: A JSON object containing pagination information
 *                    properties:
 *                      total:
 *                        type: number
 *                        description: The total number of reviews
 *                        example: 14
 *                      limit:
 *                        type: number
 *                        description: The number of items per page
 *                        example: 10
 *                      page:
 *                        type: number
 *                        description: The current page number
 *                        example: 1
 *                  data:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                          description: The ID of the category
 *                          example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                        rating:
 *                          type: number
 *                          description: The rating of the review
 *                          example: 5
 *                        comment:
 *                          type: string
 *                          description: The comment of the review
 *                          example: This is a good product
 *                        user:
 *                          type: object
 *                          properties:
 *                            name:
 *                              type: string
 *                              description: The name of the user
 *                              example: John Doe
 *                            email:
 *                              type: string
 *                              format: email
 *                              nullable: true
 *                              description: The email of the user
 *                              example: user@example.com
 *                            contact_number:
 *                              type: string
 *                              description: The contact number of the user
 *                              example: '01511111111'
 *                            role:
 *                              type: string
 *                              description: The role of the user
 *                              example: USER | RETAILER
 *                        product:
 *                          type: object
 *                          properties:
 *                            name:
 *                              type: string
 *                              description: The name of the product
 *                              example: Microlab M-590 2:1 Speaker
 *                        created_at:
 *                          type: string
 *                          format: date-time
 *                          description: The date and time when the review was created
 *                          example: 2023-08-12T12:00:00.000Z
 *                        updated_at:
 *                          type: string
 *                          format: date-time
 *                          description: The date and time when the review was last updated
 *                          example: 2023-08-12T12:00:00.000Z
 */

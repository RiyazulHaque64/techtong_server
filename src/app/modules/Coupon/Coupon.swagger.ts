/**
 * @swagger
 * tags:
 *   name: Coupon
 *   description: API endpoints related to coupon
 */

// Create a new coupon
/**
 * @swagger
 * /api/v1/coupon/create-coupon:
 *   post:
 *     summary: Create a new coupon
 *     description: Create a new coupon
 *     tags: [Coupon]
 *     security:
 *       - AdminAuth: []
 *     requestBody:
 *       description: Code, discount value and expiration date is required to create a new coupon. If you don't provide the value of other fields, remove the fields from the request body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discount_value
 *               - expiration_date
 *             properties:
 *               code:
 *                 type: string
 *                 description: The code of the coupon
 *                 example: NEWYEAR25
 *               discount_type:
 *                 type: string
 *                 description: The discount type of the coupon
 *                 example: PERCENTAGE | AMOUNT
 *               discount_value:
 *                 type: number
 *                 description: The discount value of the coupon
 *                 example: 25
 *               maximum_value:
 *                 type: number
 *                 description: The maximum value of the discount
 *                 example: 100
 *               start_date:
 *                 type: string
 *                 description: The start date of the coupon
 *                 example: 2023-01-01
 *               expiration_date:
 *                 type: string
 *                 description: The expiration date of the coupon
 *                 example: 2023-12-31
 *               usage_limit:
 *                 type: number
 *                 description: The usage limit of the coupon
 *                 example: 10
 *               per_user_limit:
 *                 type: number
 *                 description: The per user limit of the coupon
 *                 example: 2
 *               min_order_amount:
 *                 type: number
 *                 description: The minimum order amount for the coupon
 *                 example: 2000
 *               min_product_amount:
 *                 type: number
 *                 description: The minimum product amount for the coupon
 *                 example: 2
 *               beneficiary_type:
 *                 type: string
 *                 description: The beneficiary type of the coupon
 *                 example: ALL | NEW_USER | EXISTING_USER
 *     responses:
 *       201:
 *         description: If the coupon is created successfully
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
 *                    example: Successfully created the coupon
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the coupon
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the new coupon
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      code:
 *                        type: string
 *                        description: The code of the coupon
 *                        example: NEWYEAR25
 *                      discount_type:
 *                        type: string
 *                        description: The discount type of the coupon
 *                        example: PERCENTAGE
 *                      discount_value:
 *                        type: number
 *                        description: The discount value of the coupon
 *                        example: 25
 *                      maximum_value:
 *                        type: number
 *                        description: The maximum value of the discount
 *                        example: 100
 *                      start_date:
 *                        type: string
 *                        description: The start date of the coupon
 *                        example: 2023-01-01
 *                      expiration_date:
 *                        type: string
 *                        description: The expiration date of the coupon
 *                        example: 2023-12-31
 *                      usage_limit:
 *                        type: number
 *                        description: The usage limit of the coupon
 *                        example: 10
 *                      per_user_limit:
 *                        type: number
 *                        description: The per user limit of the coupon
 *                        example: 2
 *                      min_order_amount:
 *                        type: number
 *                        description: The minimum order amount for the coupon
 *                        example: 2000
 *                      min_product_amount:
 *                        type: number
 *                        description: The minimum product amount for the coupon
 *                        example: 2
 *                      is_active:
 *                        type: boolean
 *                        description: The status of the coupon
 *                        example: true
 *                      used_count:
 *                        type: number
 *                        description: The number of times the coupon has been used
 *                        example: 0
 *                      beneficiary_type:
 *                        type: string
 *                        description: The beneficiary type of the coupon
 *                        example: ALL
 *                      created_at:
 *                        type: string
 *                        format: date-time
 *                        description: The creation date of the coupon
 *                        example: 2023-01-01T00:00:00.000Z
 *                      updated_at:
 *                        type: string
 *                        format: date-time
 *                        description: The last update date of the coupon
 *                        example: 2023-01-01T00:00:00.000Z
 *       401:
 *         description: If the user is not authenticated for the request. Only admin can add a coupon
 *       400:
 *         description: If the request is invalid or missing required fields
 *       409:
 *         description: If a coupon with the same code already exists
 */

// Get all coupons
/**
 * @swagger
 * /api/v1/coupon:
 *   get:
 *     summary: Retrieve all coupons
 *     description: Retrieves a list of all coupons
 *     tags: [Coupon]
 *     security:
 *       - AdminAuth: []
 *     parameters:
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
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: The search term for filtering
 *       - in: query
 *         name: minValue
 *         schema:
 *           type: number
 *         description: The minimum discount value for filtering
 *       - in: query
 *         name: maxValue
 *         schema:
 *           type: number
 *         description: The maximum discount value for filtering
 *       - in: query
 *         name: is_active
 *         required: false
 *         schema:
 *           type: boolean
 *           enum: [true, false]
 *         description: The status of the coupon for filtering
 *       - in: query
 *         name: discount_type
 *         schema:
 *           type: string
 *           enum: [PERCENTAGE, AMOUNT]
 *         description: The discount type of the coupon for filtering
 *       - in: query
 *         name: beneficiary_type
 *         schema:
 *           type: string
 *           enum: [ALL, NEW_USER, EXISTING_USER]
 *         description: The beneficiary type of the coupon for filtering
 *     responses:
 *       200:
 *         description: If retrieving all coupons is successful
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
 *                    example: Successfully retrieved the coupons
 *                  meta:
 *                    type: object
 *                    properties:
 *                      total:
 *                        type: number
 *                        description: The total number of coupons
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
 *                          description: The ID of the coupon
 *                          example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                        code:
 *                          type: string
 *                          description: The code of the coupon
 *                          example: NEWYEAR25
 *                        discount_type:
 *                          type: string
 *                          description: The discount type of the coupon
 *                          example: PERCENTAGE
 *                        discount_value:
 *                          type: number
 *                          description: The discount value of the coupon
 *                          example: 25
 *                        maximum_value:
 *                          type: number
 *                          description: The maximum value of the discount
 *                          example: 100
 *                        start_date:
 *                          type: string
 *                          description: The start date of the coupon
 *                          example: 2023-01-01
 *                        expiration_date:
 *                          type: string
 *                          description: The expiration date of the coupon
 *                          example: 2023-12-31
 *                        usage_limit:
 *                          type: number
 *                          description: The usage limit of the coupon
 *                          example: 10
 *                        per_user_limit:
 *                          type: number
 *                          description: The per user limit of the coupon
 *                          example: 2
 *                        min_order_amount:
 *                          type: number
 *                          description: The minimum order amount for the coupon
 *                          example: 2000
 *                        min_product_amount:
 *                          type: number
 *                          description: The minimum product amount for the coupon
 *                          example: 2
 *                        is_active:
 *                          type: boolean
 *                          description: The status of the coupon
 *                          example: true
 *                        used_count:
 *                          type: number
 *                          description: The number of times the coupon has been used
 *                          example: 0
 *                        beneficiary_type:
 *                          type: string
 *                          description: The beneficiary type of the coupon
 *                          example: ALL
 *                        created_at:
 *                          type: string
 *                          format: date-time
 *                          description: The creation date of the coupon
 *                          example: 2023-01-01T00:00:00.000Z
 *                        updated_at:
 *                          type: string
 *                          format: date-time
 *                          description: The last update date of the coupon
 *                          example: 2023-01-01T00:00:00.000Z
 */

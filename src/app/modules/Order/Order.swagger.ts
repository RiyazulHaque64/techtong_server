/**
 * @swagger
 * tags:
 *   name: Order
 *   description: API endpoints related to order
 */

// Create a order for registered user
/**
 * @swagger
 * /api/v1/order/create-order-for-user:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order for registered user
 *     tags: [Order]
 *     security:
 *       - AdminAuth: []
 *       - UserAuth: []
 *       - RetailerAuth: []
 *     requestBody:
 *       description: Request body for creating a new order. Address and city must be required to create order
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_information:
 *                 type: object
 *                 required:
 *                   - address
 *                   - city
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the customer
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: The email of the customer
 *                     example: user@example.com
 *                   contact_number:
 *                     type: string
 *                     description: The contact number of the customer
 *                     example: '01500000000'
 *                   address:
 *                     type: string
 *                     description: The address of the customer
 *                     example: 123 Main Street
 *                   city:
 *                     type: string
 *                     description: The city of the customer
 *                     example: New York
 *               payment_method:
 *                 type: string
 *                 description: The payment method for the order
 *                 example: CASH_ON_DELIVERY | ONLINE_PAYMENT
 *               delivery_method:
 *                 type: string
 *                 description: The delivery method for the order
 *                 example: STORE_PICKUP | HOME_DELIVERY
 *               coupon_code:
 *                 type: string
 *                 description: The coupon code for the order
 *                 example: NEWYEAR25
 *               comment:
 *                 type: string
 *                 description: The comment for the order
 *                 example: Special instructions for the order
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

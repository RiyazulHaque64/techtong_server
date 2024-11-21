/**
 * @swagger
 * tags:
 *   name: Order
 *   description: API endpoints related to order
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *        type: object
 *        description: A JSON object representing the order
 *        properties:
 *          id:
 *            type: string
 *            description: The ID of the order
 *            example: 656c6ccf-199c-454c-937b-f41c148f673b
 *          payment_method:
 *            type: string
 *            description: The payment method for the order
 *            example: CASH_ON_DELIVERY | ONLINE_PAYMENT
 *          delivery_method:
 *            type: string
 *            description: The delivery method for the order
 *            example: STORE_PICKUP | HOME_DELIVERY
 *          delivery_charge:
 *            type: number
 *            description: The delivery charge for the order
 *            example: 100
 *          discount_amount:
 *            type: number
 *            description: The discount amount of the coupon
 *            example: 250
 *          sub_amount:
 *            type: number
 *            description: The sub amount of the order
 *            example: 500
 *          total_amount:
 *            type: number
 *            description: The total amount of the order
 *            example: 750
 *          payable_amount:
 *            type: number
 *            description: The payable amount of the order
 *            example: 750
 *          payment_status:
 *            type: string
 *            description: The payment status of the order
 *            example: PAID | DUE
 *          order_status:
 *            type: string
 *            description: The order status of the order
 *            example: PENDING
 *          order_items:
 *            type: array
 *            description: An array of order items
 *            items:
 *              type: object
 *              properties:
 *                product:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *                      description: The name of the product
 *                      example: Microlab M-590 2:1 Speaker
 *                quantity:
 *                  type: number
 *                  description: The quantity of the product
 *                  example: 1
 *                price:
 *                  type: number
 *                  description: The price of the product
 *                  example: 1000
 *          user:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                description: The ID of the user
 *                example: 656c6ccf-199c-454c-937b-f41c148f673b
 *              name:
 *                type: string
 *                description: The name of the user
 *                example: John Doe
 *              email:
 *                type: string
 *                description: The email of the user
 *                example: user@example.com
 *              contact_number:
 *                type: string
 *                description: The contact number of the user
 *                example: '01500000000'
 *          customer_info:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the customer
 *                example: John Doe
 *              email:
 *                type: string
 *                format: email
 *                nullable: true
 *                description: The email of the customer
 *                example: user@example.com
 *              contact_number:
 *                type: string
 *                description: The contact number of the customer
 *                example: '01500000000'
 *              address:
 *                type: string
 *                description: The address of the customer
 *                example: 123 Main Street
 *              city:
 *                type: string
 *                description: The city of the customer
 *                example: New York
 *          coupon_code:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *                description: The code of the coupon
 *                example: ABC123
 *              discount_amount:
 *                type: number
 *                description: The discount amount of the coupon
 *                example: 250
 *          created_at:
 *            type: string
 *            format: date-time
 *            description: The date and time when the order was created
 *            example: 2023-01-01T00:00:00.000Z
 *          updated_at:
 *            type: string
 *            format: date-time
 *            description: The date and time when the order was last updated
 *            example: 2023-01-01T00:00:00.000Z
 */

// Create a order for registered user
/**
 * @swagger
 * /api/v1/order/create-order-for-user:
 *   post:
 *     summary: Create a new order for registered user
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
 *         description: If the order is created successfully
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
 *                    example: Order created successfully
 *                  data:
 *                    $ref: '#/components/schemas/Order'
 *       401:
 *         description: If the user is not authenticated for the request. Only registered user can create a order
 *       400:
 *         description: If the request is invalid or missing required fields
 */

// Create a order for guest user
/**
 * @swagger
 * /api/v1/order/create-order:
 *   post:
 *     summary: Create a new order for guest user
 *     description: Create a new order for guest user
 *     tags: [Order]
 *     requestBody:
 *       description: Request body for creating a new order. Name, contact number, address and city must be required to create order
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_information:
 *                 type: object
 *                 required:
 *                   - name
 *                   - contact_number
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
 *               order_items:
 *                 type: array
 *                 description: An array of order items
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: string
 *                       description: The ID of the product
 *                       example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                     quantity:
 *                       type: number
 *                       description: The quantity of the product
 *                       example: 1
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
 *         description: If the order is created successfully
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
 *                    example: Order created successfully
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the order
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the new order
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      payment_method:
 *                        type: string
 *                        description: The payment method for the order
 *                        example: CASH_ON_DELIVERY | ONLINE_PAYMENT
 *                      delivery_method:
 *                        type: string
 *                        description: The delivery method for the order
 *                        example: STORE_PICKUP | HOME_DELIVERY
 *                      delivery_charge:
 *                        type: number
 *                        description: The delivery charge for the order
 *                        example: 100
 *                      discount_amount:
 *                        type: number
 *                        description: The discount amount of the coupon
 *                        example: 250
 *                      sub_amount:
 *                        type: number
 *                        description: The sub amount of the order
 *                        example: 500
 *                      total_amount:
 *                        type: number
 *                        description: The total amount of the order
 *                        example: 750
 *                      payable_amount:
 *                        type: number
 *                        description: The payable amount of the order
 *                        example: 750
 *                      payment_status:
 *                        type: string
 *                        description: The payment status of the order
 *                        example: PAID | DUE
 *                      order_status:
 *                        type: string
 *                        description: The order status of the order
 *                        example: PENDING
 *                      order_items:
 *                        type: array
 *                        description: An array of order items
 *                        items:
 *                          type: object
 *                          properties:
 *                            product:
 *                              type: object
 *                              properties:
 *                                name:
 *                                  type: string
 *                                  description: The name of the product
 *                                  example: Microlab M-590 2:1 Speaker
 *                            quantity:
 *                              type: number
 *                              description: The quantity of the product
 *                              example: 1
 *                            price:
 *                              type: number
 *                              description: The price of the product
 *                              example: 1000
 *                      user:
 *                        type: null
 *                        description: The user associated with the order
 *                        example: null
 *                      customer_info:
 *                        type: object
 *                        properties:
 *                          name:
 *                            type: string
 *                            description: The name of the customer
 *                            example: John Doe
 *                          email:
 *                            type: string
 *                            format: email
 *                            nullable: true
 *                            description: The email of the customer
 *                            example: user@example.com
 *                          contact_number:
 *                            type: string
 *                            description: The contact number of the customer
 *                            example: '01500000000'
 *                          address:
 *                            type: string
 *                            description: The address of the customer
 *                            example: 123 Main Street
 *                          city:
 *                            type: string
 *                            description: The city of the customer
 *                            example: New York
 *                      coupon_code:
 *                        type: object
 *                        properties:
 *                          code:
 *                            type: string
 *                            description: The code of the coupon
 *                            example: ABC123
 *                          discount_amount:
 *                            type: number
 *                            description: The discount amount of the coupon
 *                            example: 250
 *                      created_at:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the order was created
 *                        example: 2023-01-01T00:00:00.000Z
 *                      updated_at:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the order was last updated
 *                        example: 2023-01-01T00:00:00.000Z
 *       400:
 *         description: If the request is invalid or missing required fields
 */

// Get Orders
/**
 * @swagger
 * /api/v1/order:
 *   get:
 *     summary: Get all orders
 *     description: Get all orders
 *     tags: [Order]
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
 *         name: order_status
 *         schema:
 *           type: string
 *           enum: [PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED]
 *         description: The order status to filter by
 *       - in: query
 *         name: delivery_method
 *         schema:
 *           type: string
 *           enum: [STORE_PICKUP, HOME_DELIVERY]
 *         description: The delivery method to filter by
 *       - in: query
 *         name: payment_status
 *         schema:
 *           type: string
 *           enum: [PAID, DUE]
 *         description: The payment status to filter by
 *       - in: query
 *         name: payment_method
 *         schema:
 *           type: string
 *           enum: [CASH_ON_DELIVERY, ONLINE_PAYMENT]
 *         description: The payment method to filter by
 *       - in: query
 *         name: min_order_amount
 *         schema:
 *           type: number
 *         description: The minimum order amount to filter by
 *       - in: query
 *         name: max_order_amount
 *         schema:
 *           type: number
 *         description: The maximum order amount to filter by
 *     responses:
 *       200:
 *         description: Returns a list of all orders
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
 *                    example: Orders retrieved successfully
 *                  meta:
 *                    type: object
 *                    properties:
 *                      total:
 *                        type: number
 *                        description: The total number of orders
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
 *                      $ref: '#/components/schemas/Order'
 */

// My Orders
/**
 * @swagger
 * /api/v1/order/my-order:
 *   get:
 *     summary: Get my orders
 *     description: Get my orders
 *     tags: [Order]
 *     security:
 *       - AdminAuth: []
 *       - UserAuth: []
 *       - RetailerAuth: []
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
 *         name: order_status
 *         schema:
 *           type: string
 *           enum: [PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED]
 *         description: The order status to filter by
 *       - in: query
 *         name: delivery_method
 *         schema:
 *           type: string
 *           enum: [STORE_PICKUP, HOME_DELIVERY]
 *         description: The delivery method to filter by
 *       - in: query
 *         name: payment_status
 *         schema:
 *           type: string
 *           enum: [PAID, DUE]
 *         description: The payment status to filter by
 *       - in: query
 *         name: payment_method
 *         schema:
 *           type: string
 *           enum: [CASH_ON_DELIVERY, ONLINE_PAYMENT]
 *         description: The payment method to filter by
 *       - in: query
 *         name: min_order_amount
 *         schema:
 *           type: number
 *         description: The minimum order amount to filter by
 *       - in: query
 *         name: max_order_amount
 *         schema:
 *           type: number
 *         description: The maximum order amount to filter by
 *     responses:
 *       200:
 *         description: Returns a list of all orders
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
 *                    example: Orders retrieved successfully
 *                  meta:
 *                    type: object
 *                    properties:
 *                      total:
 *                        type: number
 *                        description: The total number of orders
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
 *                      $ref: '#/components/schemas/Order'
 */

// Update order by admin
/**
 * @swagger
 * /api/v1/order/admin/{id}:
 *   patch:
 *     summary: Update order by admin
 *     description: Update order by admin
 *     tags: [Order]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the order
 *     requestBody:
 *       description: Data to update order
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payment_method:
 *                 type: string
 *                 description: The payment method for the order
 *                 example: CASH_ON_DELIVERY | ONLINE_PAYMENT
 *               delivery_method:
 *                 type: string
 *                 description: The delivery method for the order
 *                 example: STORE_PICKUP | HOME_DELIVERY
 *               payment_status:
 *                 type: string
 *                 description: The payment status for the order
 *                 example: PAID | DUE
 *               order_status:
 *                 type: string
 *                 description: The order status for the order
 *                 example: PENDING | PROCESSING | SHIPPED | DELIVERED | CANCELLED
 *               comment:
 *                 type: string
 *                 description: The comment for the order
 *                 example: Special instructions for the order
 *     responses:
 *       200:
 *         description: If the order is updated successfully
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
 *                    example: Order updated successfully
 *                  data:
 *                    $ref: '#/components/schemas/Order'
 *       401:
 *         description: If the user is not authenticated for the request. Only admin can update a order
 *       400:
 *         description: If the request is invalid or missing required fields
 */

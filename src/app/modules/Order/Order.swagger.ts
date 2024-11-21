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
 *                    example: Order created successfully
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the order
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the new coupon
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
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                            description: The ID of the user
 *                            example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                          name:
 *                            type: string
 *                            description: The name of the user
 *                            example: John Doe
 *                          email:
 *                            type: string
 *                            description: The email of the user
 *                            example: user@example.com
 *                          contact_number:
 *                            type: string
 *                            description: The contact number of the user
 *                            example: '01500000000'
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
 *       401:
 *         description: If the user is not authenticated for the request. Only admin can add a coupon
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
 *                    example: Order created successfully
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the order
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the new coupon
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

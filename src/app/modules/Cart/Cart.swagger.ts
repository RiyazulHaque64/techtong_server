/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API endpoints related to cart
 */

// Add to cart
/**
 * @swagger
 * /api/v1/cart/add-to-cart:
 *   post:
 *     summary: Add a product to cart
 *     description: Adds a product to the cart of the registered user
 *     tags: [Cart]
 *     security:
 *       - AdminAuth: []
 *       - RetailerAuth: []
 *       - UserAuth: []
 *     requestBody:
 *       description: Product must be available and required field
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product to add to the cart
 *                 example: 656c6ccf-199c-454c-937b-f41c148f673b
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product to add to the cart
 *                 example: 1
 *     responses:
 *       201:
 *         description: Successfully added the product to the cart
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
 *                    example: Product added to cart successfully
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the cart item
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the cart item
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      cart_id:
 *                        type: string
 *                        description: The ID of the cart
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      product_id:
 *                        type: string
 *                        description: The ID of the product
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      quantity:
 *                        type: number
 *                        description: The quantity of the product in the cart
 *                        example: 1
 *                      price:
 *                        type: number
 *                        description: The unit price of the product
 *                        example: 2200
 *       401:
 *         description: If the user is not authenticated for the request.
 *       400:
 *         description: If the request is invalid or missing required fields
 */

// Get cart
/**
 * @swagger
 * /api/v1/cart:
 *   get:
 *     summary: Get cart
 *     description: Retrieves the cart of the registered user
 *     tags: [Cart]
 *     security:
 *       - AdminAuth: []
 *       - RetailerAuth: []
 *       - UserAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                    success:
 *                      type: boolean
 *                      description: Indicates the success or failure of the operation
 *                    message:
 *                      type: string
 *                      description: A message indicating the result of the operation
 *                      example: Successfully fetched the cart
 *                    data:
 *                      type: object
 *                      description: A JSON object representing the cart
 *                      properties:
 *                        id:
 *                          type: string
 *                          description: The ID of the cart
 *                          example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                        user_id:
 *                          type: string
 *                          description: The ID of the user
 *                          example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                        cart_items:
 *                          type: array
 *                          description: A array of JSON object representing the cart items
 *                          items:
 *                            type: object
 *                            properties:
 *                              id:
 *                                type: string
 *                                description: The ID of the cart item
 *                                example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                              cart_id:
 *                                type: string
 *                                description: The ID of the cart
 *                                example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                              product_id:
 *                                type: string
 *                                description: The ID of the product
 *                                example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                              quantity:
 *                                type: number
 *                                description: The quantity of the product in the cart
 *                                example: 2
 *                              price:
 *                                type: number
 *                                description: The unit price of the product
 *                                example: 2200
 *                              total:
 *                                type: number
 *                                description: The total price of the product
 *                                example: 4400
 *                        cart_total:
 *                          type: number
 *                          description: The total price of the cart
 *                          example: 4400
 *                        created_at:
 *                          type: string
 *                          description: The date and time the cart was created
 *                          example: 2023-08-12T12:00:00.000Z
 *                        updated_at:
 *                          type: string
 *                          description: The date and time the cart was last updated
 *                          example: 2023-08-12T12:00:00.000Z
 *       401:
 *         description: If the user is not authenticated for the request.
 *       400:
 *         description: If the request is invalid or missing required fields
 */

// Update cart items
/**
 * @swagger
 * /api/v1/cart/update/{cartItemId}:
 *   patch:
 *     summary: Update cart item quantity
 *     description: Updates the quantity of a cart item
 *     tags: [Cart]
 *     security:
 *       - AdminAuth: []
 *       - RetailerAuth: []
 *       - UserAuth: []
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         description: The ID of the cart item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product to update cart item
 *                 example: 2
 *     responses:
 *       201:
 *         description: Successfully updated the cart item
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
 *                    example: Cart item updated successfully
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the cart item
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the cart item
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      cart_id:
 *                        type: string
 *                        description: The ID of the cart
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      product_id:
 *                        type: string
 *                        description: The ID of the product
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      quantity:
 *                        type: number
 *                        description: The quantity of the product in the cart
 *                        example: 1
 *                      price:
 *                        type: number
 *                        description: The unit price of the product
 *                        example: 2200
 *       401:
 *         description: If the user is not authenticated for the request.
 *       400:
 *         description: If the request is invalid or missing required fields
 */

// Remove product from cart
/**
 * @swagger
 * /api/v1/cart/{cartItemId}:
 *   delete:
 *     summary: Remove product from cart
 *     description: Removes a product from the cart
 *     tags: [Cart]
 *     security:
 *       - AdminAuth: []
 *       - RetailerAuth: []
 *       - UserAuth: []
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         description: The ID of the cart item to remove
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully removed the product from the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                    success:
 *                      type: boolean
 *                      description: Indicates the success or failure of the operation
 *                    message:
 *                      type: string
 *                      description: A message indicating the result of the operation
 *                      example: Successfully removed the product from the cart
 *                    data:
 *                      type: string
 *                      description: No data is returned
 *                      example: null
 *       401:
 *         description: If the user is not authenticated for the request.
 *       404:
 *         description: If the cart item is not found
 */

/**
 * @swagger
 * tags:
 *   name: Brand
 *   description: API endpoints related to brand
 */

// Add a new brand
/**
 * @swagger
 * /api/v1/brand/add-brand:
 *   post:
 *     summary: Add a new brand
 *     description: Adds a new brand.
 *     tags: [Brand]
 *     security:
 *       - AdminAuth: []
 *     requestBody:
 *       description: Name must be unique and required field
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the brand
 *                 example: Logitech
 *               description:
 *                 type: string
 *                 description: The description of the brand
 *                 example: This is a description of the brand
 *               icon:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 description: The url of the icon of the brand
 *                 example: https://example.com/icon.png
 *     responses:
 *       201:
 *         description: Successfully added the brand
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
 *                    example: Successfully added the brand
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the brand
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the brand
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      name:
 *                        type: string
 *                        description: The name of the brand
 *                        example: Logitech
 *                      slug:
 *                        type: string
 *                        description: The slug of the brand
 *                        example: logitech
 *                      icon:
 *                        type: string
 *                        format: uri
 *                        nullable: true
 *                        description: The icon of the brand if available
 *                        example: https://example.com/icon.png
 *                      description:
 *                        type: string
 *                        description: The description of the brand
 *                        example: This is an international accessories brand
 *                      created_at:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the brand was created
 *                        example: 2023-08-12T12:00:00.000Z
 *                      updated_at:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the brand was last updated
 *                        example: 2023-08-12T12:00:00.000Z
 *       401:
 *         description: If the user is not authenticated for the request. Only admin can add a brand
 *       400:
 *         description: If the request is invalid or missing required fields
 *       409:
 *         description: If a brand with the same name already exists
 */

// Get all brands
/**
 * @swagger
 * /api/v1/brand:
 *   get:
 *     summary: Retrieve all brands
 *     description: Fetches all brands.
 *     tags: [Brand]
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
 *         description: The order to sort by (asc or desc)
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: The search term for filtering
 *     responses:
 *       200:
 *         description: A JSON Array representing all brands
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
 *                    example: Successfully fetched all brands
 *                  meta:
 *                    type: object
 *                    properties:
 *                      total:
 *                        type: number
 *                        description: The total number of brands
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
 *                          description: The ID of the brand
 *                          example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                        name:
 *                          type: string
 *                          description: The name of the brand
 *                          example: Logitech
 *                        slug:
 *                          type: string
 *                          description: The slug of the brand
 *                          example: logitech
 *                        icon:
 *                          type: string
 *                          format: uri
 *                          nullable: true
 *                          description: The icon of the brand if available
 *                          example: https://example.com/icon.png
 *                        description:
 *                          type: string
 *                          description: The description of the brand
 *                          example: This is an international accessories brand
 *                        created_at:
 *                          type: string
 *                          format: date-time
 *                          description: The date and time when the brand was created
 *                          example: 2023-08-12T12:00:00.000Z
 *                        updated_at:
 *                          type: string
 *                          format: date-time
 *                          description: The date and time when the brand was last updated
 *                          example: 2023-08-12T12:00:00.000Z
 */

// Get a single brand
/**
 * @swagger
 * /api/v1/brand/{id}:
 *   get:
 *     summary: Retrieve a single brand by ID
 *     description: Fetches a single brand by its ID.
 *     tags: [Brand]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     responses:
 *       200:
 *         description: A JSON object representing the brand
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
 *                    example: Successfully fetched the brand
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the brand
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the brand
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      name:
 *                        type: string
 *                        description: The name of the brand
 *                        example: Logitech
 *                      slug:
 *                        type: string
 *                        description: The slug of the brand
 *                        example: logitech
 *                      icon:
 *                        type: string
 *                        format: uri
 *                        nullable: true
 *                        description: The icon of the brand if available
 *                        example: https://example.com/icon.png
 *                      description:
 *                        type: string
 *                        description: The description of the brand
 *                        example: This is an international accessories brand
 *                      created_at:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the brand was created
 *                        example: 2023-08-12T12:00:00.000Z
 *                      updated_at:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the brand was last updated
 *                        example: 2023-08-12T12:00:00.000Z
 */

// Update a single brand
/**
 * @swagger
 * /api/v1/brand/{id}:
 *   patch:
 *     summary: Update an existing brand by ID
 *     description: Updates an existing brand by its ID.
 *     tags: [Brand]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     security:
 *       - AdminAuth: []
 *     requestBody:
 *       description: You can update the name, description or icon
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the brand
 *                 example: Logitech
 *               description:
 *                 type: string
 *                 description: The description of the brand
 *                 example: This is a description of the brand
 *               icon:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 description: The url of the icon of the brand
 *                 example: https://example.com/icon.png
 *     responses:
 *       200:
 *         description: A JSON object representing the updated brand
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
 *                    example: Successfully fetched the brand
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the brand
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the brand
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      name:
 *                        type: string
 *                        description: The name of the brand
 *                        example: Logitech
 *                      slug:
 *                        type: string
 *                        description: The slug of the brand
 *                        example: logitech
 *                      icon:
 *                        type: string
 *                        format: uri
 *                        nullable: true
 *                        description: The icon of the brand if available
 *                        example: https://example.com/icon.png
 *                      description:
 *                        type: string
 *                        description: The description of the brand
 *                        example: This is an international accessories brand
 *                      created_at:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the brand was created
 *                        example: 2023-08-12T12:00:00.000Z
 *                      updated_at:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the brand was last updated
 *                        example: 2023-08-12T12:00:00.000Z
 */

// Delete a single brand
/**
 * @swagger
 * /api/v1/brand/{id}:
 *   delete:
 *     summary: Delete a single brand by ID
 *     description: Deletes a single brand by its ID.
 *     tags: [Brand]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *     responses:
 *       200:
 *         description: No data is returned
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
 *                    example: Successfully deleted the brand
 *                  data:
 *                    type: 'string'
 *                    nullable: true
 *                    description: A null value
 *                    example: null
 */

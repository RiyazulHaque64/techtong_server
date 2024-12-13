/**
 * @swagger
 * tags:
 *   name: Attribute
 *   description: API endpoints related to attribute
 */

// Add a new attribute
/**
 * @swagger
 * /api/v1/attribute/add-attribute:
 *   post:
 *     summary: Add a new attribute
 *     description: Adds a new attribute.
 *     tags: [Attribute]
 *     security:
 *       - AdminAuth: []
 *     requestBody:
 *       description: Name must be required field, category id and value is optional. You can assign multiple values by update api.
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
 *                 description: The name of the attribute
 *                 example: interface
 *               category_id:
 *                 type: string
 *                 description: The category id of the attribute
 *                 example: 656c6ccf-199c-454c-937b-f41c148f673b
 *               value:
 *                 type: arry
 *                 description: The value of the attribute
 *                 example: ["wireless", "bluetooth"]
 *     responses:
 *       201:
 *         description: A JSON object representing the added attribute
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
 *                    example: Successfully added the attribute
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the added attribute
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the attribute
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      category_id:
 *                        type: string
 *                        description: The category id of the attribute
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      name:
 *                        type: string
 *                        description: The name of the attribute
 *                        example: interface
 *                      slug:
 *                        type: string
 *                        description: The slug of the attribute
 *                        example: interface
 *                      value:
 *                        type: array
 *                        description: The values of the attribute
 *                        example: ["wireless", "bluetooth"]
 *                      createdAt:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the attribute was created
 *                        example: 2023-08-12T12:00:00.000Z
 *                      updatedAt:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the attribute was last updated
 *                        example: 2023-08-12T12:00:00.000Z
 *                      category:
 *                        type: object
 *                        description: The category of the attribute if the category id is provided
 *                        properties:
 *                          id:
 *                            type: string
 *                            description: The ID of the category
 *                            example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                          title:
 *                            type: string
 *                            description: The title of the category
 *                            example: speaker
 *       401:
 *         description: If the user is not authenticated for the request. Only admin can add a attribute
 *       400:
 *         description: If the request is invalid or missing required fields
 */

// Get all attribute
/**
 * @swagger
 * /api/v1/attribute:
 *   get:
 *     summary: Get all attributes
 *     description: Retrieves a list of all attributes.
 *     tags: [Attribute]
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
 *         description: The order to sort by (asc or desc)
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: The search term for filtering
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: The category name for filtering
 *     responses:
 *       200:
 *         description: A Array of JSON objects representing the list of attributes
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
 *                    example: Successfully retrieved the attributes
 *                  meta:
 *                    type: object
 *                    properties:
 *                      total:
 *                        type: number
 *                        description: The total number of attributes
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
 *                          description: The ID of the attribute
 *                          example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                        category_id:
 *                          type: string
 *                          description: The category id of the attribute
 *                          example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                        name:
 *                          type: string
 *                          description: The name of the attribute
 *                          example: interface
 *                        slug:
 *                          type: string
 *                          description: The slug of the attribute
 *                          example: interface
 *                        value:
 *                          type: array
 *                          description: The values of the attribute
 *                          example: ["wireless", "bluetooth"]
 *                        createdAt:
 *                          type: string
 *                          format: date-time
 *                          description: The date and time when the attribute was created
 *                          example: 2023-08-12T12:00:00.000Z
 *                        updatedAt:
 *                          type: string
 *                          format: date-time
 *                          description: The date and time when the attribute was last updated
 *                          example: 2023-08-12T12:00:00.000Z
 *                        category:
 *                          type: object
 *                          description: The category of the attribute if the category id is provided
 *                          properties:
 *                            id:
 *                              type: string
 *                              description: The ID of the category
 *                              example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                            title:
 *                              type: string
 *                              description: The title of the category
 *                              example: speaker
 *       401:
 *         description: If the user is not authenticated for the request. Only admin can add a attribute
 */

// Get a single attribute
/**
 * @swagger
 * /api/v1/attribute/{id}:
 *   get:
 *     summary: Retrieve a single attribute by ID
 *     description: Retrieves a single attribute by its ID.
 *     tags: [Attribute]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the attribute to retrieve
 *     responses:
 *       200:
 *         description: A JSON object representing the attribute
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
 *                    example: Successfully retrieved the attribute
 *                  data:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                          description: The ID of the attribute
 *                          example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                        category_id:
 *                          type: string
 *                          description: The category id of the attribute
 *                          example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                        name:
 *                          type: string
 *                          description: The name of the attribute
 *                          example: interface
 *                        slug:
 *                          type: string
 *                          description: The slug of the attribute
 *                          example: interface
 *                        value:
 *                          type: array
 *                          description: The values of the attribute
 *                          example: ["wireless", "bluetooth"]
 *                        createdAt:
 *                          type: string
 *                          format: date-time
 *                          description: The date and time when the attribute was created
 *                          example: 2023-08-12T12:00:00.000Z
 *                        updatedAt:
 *                          type: string
 *                          format: date-time
 *                          description: The date and time when the attribute was last updated
 *                          example: 2023-08-12T12:00:00.000Z
 *                        category:
 *                          type: object
 *                          description: The category of the attribute if the category id is provided
 *                          properties:
 *                            id:
 *                              type: string
 *                              description: The ID of the category
 *                              example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                            title:
 *                              type: string
 *                              description: The title of the category
 *                              example: speaker
 *                            slug:
 *                              type: string
 *                              description: The slug of the category
 *                              example: speaker
 *                            icon:
 *                              type: string
 *                              format: uri
 *                              nullable: true
 *                              description: The icon of the category if available
 *                              example: https://example.com/icon.png
 *                            description:
 *                              type: string
 *                              description: The description of the category
 *                              example: The category is specified for the speaker
 *                            parent_id:
 *                              type: string
 *                              description: The parent id of the category
 *                              example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                            created_at:
 *                              type: string
 *                              format: date-time
 *                              description: The date and time when the attribute was created
 *                              example: 2023-08-12T12:00:00.000Z
 *                            updated_at:
 *                              type: string
 *                              format: date-time
 *                              description: The date and time when the attribute was last updated
 *                              example: 2023-08-12T12:00:00.000Z
 *       401:
 *         description: If the user is not authenticated for the request. Only admin can add a attribute
 *       404:
 *         description: If the attribute is not found
 */

// Update a attribute
/**
 * @swagger
 * /api/v1/attribute/{id}:
 *   patch:
 *     summary: Update an existing attribute
 *     description: Updates an existing attribute by its ID.
 *     tags: [Attribute]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the attribute to update
 *     requestBody:
 *       description: You can update attribute name, category id and value. value must be an array containing all values
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the attribute
 *                 example: interface
 *               category_id:
 *                 type: string
 *                 description: The category id of the attribute
 *                 example: 656c6ccf-199c-454c-937b-f41c148f673b
 *               value:
 *                 type: arry
 *                 description: The value of the attribute
 *                 example: ["wireless", "bluetooth"]
 *     responses:
 *       200:
 *         description: A JSON object representing the updated attribute
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
 *                    example: Successfully updated the attribute
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the updated attribute
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the attribute
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      category_id:
 *                        type: string
 *                        description: The category id of the attribute
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      name:
 *                        type: string
 *                        description: The name of the attribute
 *                        example: interface
 *                      slug:
 *                        type: string
 *                        description: The slug of the attribute
 *                        example: interface
 *                      value:
 *                        type: array
 *                        description: The values of the attribute
 *                        example: ["wireless", "bluetooth"]
 *                      createdAt:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the attribute was created
 *                        example: 2023-08-12T12:00:00.000Z
 *                      updatedAt:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the attribute was last updated
 *                        example: 2023-08-12T12:00:00.000Z
 *                      category:
 *                        type: object
 *                        description: The category of the attribute if the category id is provided
 *                        properties:
 *                          id:
 *                            type: string
 *                            description: The ID of the category
 *                            example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                          title:
 *                            type: string
 *                            description: The title of the category
 *                            example: speaker
 *                          slug:
 *                            type: string
 *                            description: The slug of the category
 *                            example: speaker
 *                          icon:
 *                            type: string
 *                            format: uri
 *                            nullable: true
 *                            description: The icon of the category if available
 *                            example: https://example.com/icon.png
 *                          description:
 *                            type: string
 *                            description: The description of the category
 *                            example: The category is specified for the speaker
 *                          parent_id:
 *                            type: string
 *                            description: The parent id of the category
 *                            example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                          created_at:
 *                            type: string
 *                            format: date-time
 *                            description: The date and time when attribute was created
 *                            example: 2023-08-12T12:00:00.000Z
 *                          updated_at:
 *                            type: string
 *                            format: date-time
 *                            description: The date and time when the attribute was last updated
 *                            example: 2023-08-12T12:00:00.000Z
 *       401:
 *         description: If the user is not authenticated for the request. Only admin can add a attribute
 *       404:
 *         description: If the attribute is not found
 */

// Delete attributes
/**
 * @swagger
 * /api/v1/attribute/delete-attribute:
 *   delete:
 *     summary: Delete attributes by IDs
 *     description: Delete attributes by its ID.
 *     tags: [Attribute]
 *     security:
 *       - AdminAuth: []
 *     requestBody:
 *       description: You can delete multiple attributes by IDs
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The IDs of the attributes to delete
 *                 example: [656c6ccf-199c-454c-937b-f41c148f673b]
 *     responses:
 *       200:
 *         description: A JSON object representing the deleted response
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
 *                    example: Successfully deleted the attribute
 *                  data:
 *                    type: string
 *                    nullable: true
 *                    description: A null value
 *                    example: null
 *       401:
 *         description: If the user is not authenticated for the request. Only admin can add a attribute
 *       404:
 *         description: If the attribute is not exists
 */

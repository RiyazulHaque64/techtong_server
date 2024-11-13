/**
 * @swagger
 * tags:
 *   name: Category
 *   description: API endpoints related to category
 */

// Add a new category
/**
 * @swagger
 * /api/v1/category/add-category:
 *   post:
 *     summary: Add a new category
 *     description: Adds a new category
 *     tags: [Category]
 *     security:
 *       - AdminAuth: []
 *     requestBody:
 *       description: Title must be required for a new category
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: The name of the category
 *                 example: speaker
 *               description:
 *                 type: string
 *                 description: The description of the category
 *                 example: This is a description of the category
 *               parent_id:
 *                 type: string
 *                 description: The parent category id of the category
 *                 example: 656c6ccf-199c-454c-937b-f41c148f673b
 *               icon:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 description: The url of the icon of the category
 *                 example: https://example.com/icon.png
 *     responses:
 *       201:
 *         description: Successfully added the category
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
 *                    example: Successfully added the category
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the new category
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the new category
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      title:
 *                        type: string
 *                        description: The name of the new category
 *                        example: Speaker
 *                      slug:
 *                        type: string
 *                        description: The slug of the new category
 *                        example: speaker
 *                      icon:
 *                        type: string
 *                        format: uri
 *                        nullable: true
 *                        description: The icon of the category if available
 *                        example: https://example.com/icon.png | null
 *                      description:
 *                        type: string
 *                        description: The description of the category
 *                        example: The category is specified for the speaker | null
 *                      parent_id:
 *                        type: string
 *                        description: The parent category id of the category
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b | null
 *                      created_at:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the category was created
 *                        example: 2023-08-12T12:00:00.000Z
 *                      updated_at:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the category was last updated
 *                        example: 2023-08-12T12:00:00.000Z
 *       401:
 *         description: If the user is not authenticated for the request. Only admin can add a category
 *       400:
 *         description: If the request is invalid or missing required fields
 *       409:
 *         description: If a category with the same name already exists
 */

// Get all categories
/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Retrieve all categories
 *     description: Retrieves a list of all categories
 *     tags: [Category]
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
 *         name: parent
 *         schema:
 *           type: string
 *         description: The parent category name for filtering
 *     responses:
 *       200:
 *         description: Successfully retrieved the categories
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
 *                    example: Successfully retrieved the categories
 *                  meta:
 *                    type: object
 *                    description: A JSON object containing pagination information
 *                    properties:
 *                      total:
 *                        type: number
 *                        description: The total number of categories
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
 *                        title:
 *                          type: string
 *                          description: The name of the category
 *                          example: Speaker
 *                        slug:
 *                          type: string
 *                          description: The slug of the category
 *                          example: speaker
 *                        icon:
 *                          type: string
 *                          format: uri
 *                          nullable: true
 *                          description: The icon of the category if available
 *                          example: https://example.com/icon.png
 *                        description:
 *                          type: string
 *                          description: The description of the category
 *                          example: The category is specified for the speaker
 *                        parent_id:
 *                          type: string
 *                          description: The parent category id of the category
 *                          example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                        created_at:
 *                          type: string
 *                          format: date-time
 *                          description: The date and time when the category was created
 *                          example: 2023-08-12T12:00:00.000Z
 *                        updated_at:
 *                          type: string
 *                          format: date-time
 *                          description: The date and time when the category was last updated
 *                          example: 2023-08-12T12:00:00.000Z
 *                        parent:
 *                          type: object
 *                          properties:
 *                            id:
 *                              type: string
 *                              description: The ID of the parent category
 *                              example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                            title:
 *                              type: string
 *                              description: The name of the parent category
 *                              example: Speaker
 *                            slug:
 *                              type: string
 *                              description: The slug of the parent category
 *                              example: speaker
 *                            icon:
 *                              type: string
 *                              format: uri
 *                              nullable: true
 *                              description: The icon of the parent category if available
 *                              example: https://example.com/icon.png
 *                            description:
 *                              type: string
 *                              description: The description of the parent category
 *                              example: The category is specified for the speaker
 *                            parent_id:
 *                              type: string
 *                              description: The parent category id of the parent category
 *                              example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                            created_at:
 *                              type: string
 *                              format: date-time
 *                              description: The date and time when the parent category was created
 *                              example: 2023-08-12T12:00:00.000Z
 *                            updated_at:
 *                              type: string
 *                              format: date-time
 *                              description: The date and time when the parent category was last updated
 *                              example: 2023-08-12T12:00:00.000Z
 */

// Get a single category
/**
 * @swagger
 * /api/v1/category/{id}:
 *   get:
 *     summary: Retrieve a single category by ID
 *     description: Retrieve a single category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the category
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
 *                    example: Successfully retrieved the category
 *                  data:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                          description: The ID of the category
 *                          example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                        title:
 *                          type: string
 *                          description: The name of the category
 *                          example: Speaker
 *                        slug:
 *                          type: string
 *                          description: The slug of the category
 *                          example: speaker
 *                        icon:
 *                          type: string
 *                          format: uri
 *                          nullable: true
 *                          description: The icon of the category if available
 *                          example: https://example.com/icon.png
 *                        description:
 *                          type: string
 *                          description: The description of the category
 *                          example: The category is specified for the speaker
 *                        parent_id:
 *                          type: string
 *                          description: The parent category id of the category
 *                          example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                        created_at:
 *                          type: string
 *                          format: date-time
 *                          description: The date and time when the category was created
 *                          example: 2023-08-12T12:00:00.000Z
 *                        updated_at:
 *                          type: string
 *                          format: date-time
 *                          description: The date and time when the category was last updated
 *                          example: 2023-08-12T12:00:00.000Z
 *                        parent:
 *                          type: object
 *                          properties:
 *                            id:
 *                              type: string
 *                              description: The ID of the parent category
 *                              example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                            title:
 *                              type: string
 *                              description: The name of the parent category
 *                              example: Speaker
 *                            slug:
 *                              type: string
 *                              description: The slug of the parent category
 *                              example: speaker
 *                            icon:
 *                              type: string
 *                              format: uri
 *                              nullable: true
 *                              description: The icon of the parent category if available
 *                              example: https://example.com/icon.png
 *                            description:
 *                              type: string
 *                              description: The description of the parent category
 *                              example: The category is specified for the speaker
 *                            parent_id:
 *                              type: string
 *                              description: The parent category id of the parent category
 *                              example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                            created_at:
 *                              type: string
 *                              format: date-time
 *                              description: The date and time when the parent category was created
 *                              example: 2023-08-12T12:00:00.000Z
 *                            updated_at:
 *                              type: string
 *                              format: date-time
 *                              description: The date and time when the parent category was last updated
 *                              example: 2023-08-12T12:00:00.000Z
 */

// Update a category
/**
 * @swagger
 * /api/v1/category/{id}:
 *   patch:
 *     summary: Update an existing category by ID
 *     description: Updates an existing category
 *     tags: [Category]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: You can udpate the title, description, parent_id and icon
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The name of the category
 *                 example: speaker
 *               description:
 *                 type: string
 *                 description: The description of the category
 *                 example: This is a description of the category
 *               parent_id:
 *                 type: string
 *                 description: The parent category id of the category
 *                 example: 656c6ccf-199c-454c-937b-f41c148f673b
 *               icon:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 description: The url of the icon of the category
 *                 example: https://example.com/icon.png
 *     responses:
 *       201:
 *         description: Successfully added the category
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
 *                    example: Successfully updated the category
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the updated category
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the updated category
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      title:
 *                        type: string
 *                        description: The name of the updated category
 *                        example: Speaker
 *                      slug:
 *                        type: string
 *                        description: The slug of the updated category
 *                        example: speaker
 *                      icon:
 *                        type: string
 *                        format: uri
 *                        nullable: true
 *                        description: The icon of the category if available
 *                        example: https://example.com/icon.png | null
 *                      description:
 *                        type: string
 *                        description: The description of the category
 *                        example: The category is specified for the speaker | null
 *                      parent_id:
 *                        type: string
 *                        description: The parent category id of the category
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b | null
 *                      created_at:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the category was created
 *                        example: 2023-08-12T12:00:00.000Z
 *                      updated_at:
 *                        type: string
 *                        format: date-time
 *                        description: The date and time when the category was last updated
 *                        example: 2023-08-12T12:00:00.000Z
 *                      parent:
 *                          type: object
 *                          properties:
 *                            id:
 *                              type: string
 *                              description: The ID of the parent category
 *                              example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                            title:
 *                              type: string
 *                              description: The name of the parent category
 *                              example: Speaker
 *                            slug:
 *                              type: string
 *                              description: The slug of the parent category
 *                              example: speaker
 *                            icon:
 *                              type: string
 *                              format: uri
 *                              nullable: true
 *                              description: The icon of the parent category if available
 *                              example: https://example.com/icon.png
 *                            description:
 *                              type: string
 *                              description: The description of the parent category
 *                              example: The category is specified for the speaker
 *                            parent_id:
 *                              type: string
 *                              description: The parent category id of the parent category
 *                              example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                            created_at:
 *                              type: string
 *                              format: date-time
 *                              description: The date and time when the parent category was created
 *                              example: 2023-08-12T12:00:00.000Z
 *                            updated_at:
 *                              type: string
 *                              format: date-time
 *                              description: The date and time when the parent category was last updated
 *                              example: 2023-08-12T12:00:00.000Z
 *       401:
 *         description: If the user is not authenticated for the request. Only admin can update a category
 *       404:
 *         description: If the category is not found
 */

// Delete a category
/**
 * @swagger
 * /api/v1/category/{id}:
 *   delete:
 *     summary: Delete a single category by ID
 *     description: Delete a single category
 *     tags: [Category]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: If the category is deleted successfully
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
 *                    example: Successfully deleted the category
 *                  data:
 *                    type: object
 *                    description: Null if the category is deleted successfully
 *                    example: null
 *       401:
 *         description: If the user is not authenticated for the request. Only admin can delete a category
 *       404:
 *         description: If the category is not exists
 */

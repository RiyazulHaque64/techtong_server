"use strict";
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API endpoints related to product
 */
// Add a new product
/**
 * @swagger
 * /api/v1/product/add-product:
 *   post:
 *     summary: Add a new product
 *     description: Add a new product
 *     tags: [Product]
 *     security:
 *       - AdminAuth: []
 *     requestBody:
 *       description: Name, model and price is required to add a new product
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - model
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: Microlab M-590 2:1 Speaker
 *               model:
 *                 type: string
 *                 description: The model of the product
 *                 example: M-590
 *               brand_id:
 *                 type: string
 *                 description: The ID of the brand associated with the product
 *                 example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *               category_id:
 *                 type: string
 *                 description: The ID of the category associated with the product
 *                 example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *               tags:
 *                 type: array
 *                 description: The tags associated with the product
 *                 example: [tag1, tag2, tag3]
 *               code:
 *                 type: string
 *                 description: The code of the product
 *                 example: SPK590
 *               stock:
 *                 type: number
 *                 description: The stock of the product
 *                 example: 10
 *               price:
 *                 type: number
 *                 description: The price of the product
 *                 example: 1000
 *               discount_price:
 *                 type: number
 *                 description: The discount price of the product
 *                 example: 900
 *               retailer_price:
 *                 type: number
 *                 description: The retailer price of the product
 *                 example: 800
 *               thumbnail:
 *                 type: string
 *                 format: uri
 *                 description: The thumbnail of the product
 *                 example: https://example.com/thumbnail.jpg
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                 description: The images of the product
 *                 example: [https://example.com/image1.jpg, https://example.com/image2.jpg]
 *               description:
 *                 type: string
 *                 description: The description of the product (plain text or HTML)
 *                 example: "<p>This is an example of product description.</p>"
 *               specification:
 *                 type: string
 *                 description: The specification of the product (plain text or HTML)
 *                 example: "<p>This is an example of product specification.</p>"
 *               additional_information:
 *                 type: string
 *                 description: The additional information of the product (plain text or HTML)
 *                 example: "<p>This is an example of product additional information.</p>"
 *               key_features:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The key features of the product
 *                 example: ["Feature 1", "Feature 2", "Feature 3"]
 *               video_url:
 *                 type: string
 *                 format: uri
 *                 description: The video url of the product
 *                 example: https://example.com/video_url.mp4
 *               attributes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     slug:
 *                       type: string
 *                       description: The slug of the attribute
 *                       example: color
 *                     value:
 *                       type: string
 *                       description: The value of the attribute
 *                       example: Red
 *                 description: The attributes of the product
 *     responses:
 *       201:
 *         description: If the product is added successfully
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
 *                    example: Successfully added the product
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the new product
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the new product
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      name:
 *                        type: string
 *                        description: The name of the new product
 *                        example: Microlab M-590 2:1 Speaker
 *                      slug:
 *                        type: string
 *                        description: The slug of the new product
 *                        example: microlab-m-590-2-1-speaker
 *                      model:
 *                        type: string
 *                        description: The model of the new product
 *                        example: M-590
 *                      brand_id:
 *                        type: string
 *                        description: The ID of the brand associated with the new product
 *                        example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *                      category_id:
 *                        type: string
 *                        description: The ID of the category associated with the new product
 *                        example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *                      tags:
 *                        type: array
 *                        items:
 *                          type: string
 *                        description: The tags associated with the new product
 *                        example: [tag1, tag2, tag3]
 *                      code:
 *                        type: string
 *                        description: The code of the new product
 *                        example: SPK590
 *                      stock:
 *                        type: number
 *                        description: The stock quantity of the new product
 *                        example: 10
 *                      price:
 *                        type: number
 *                        description: The price of the new product
 *                        example: 900
 *                      discount_price:
 *                        type: number
 *                        description: The discount price of the new product
 *                        example: 800
 *                      retailer_price:
 *                        type: number
 *                        description: The retailer price of the new product
 *                        example: 700
 *                      thumbnail:
 *                        type: string
 *                        format: uri
 *                        description: The thumbnail URL of the new product
 *                        example: https://example.com/thumbnail.jpg
 *                      images:
 *                        type: array
 *                        items:
 *                          type: string
 *                        description: The image URLs of the new product
 *                        example: [https://example.com/image1.jpg, https://example.com/image2.jpg]
 *                      published:
 *                        type: boolean
 *                        description: Indicates whether the new product is published or not
 *                        example: true
 *                      featured:
 *                        type: boolean
 *                        description: Indicates whether the new product is featured or not
 *                        example: false
 *                      description:
 *                        type: string
 *                        description: The description of the new product (Plain text or HTML)
 *                        example: <p>This is an example of product description.</p>
 *                      specification:
 *                        type: string
 *                        description: The specification of the new product (Plain text or HTML)
 *                        example: <p>This is an example of product specification.</p>
 *                      additional_information:
 *                        type: string
 *                        description: The additional information of the new product (Plain text or HTML)
 *                        example: <p>This is an example of product additional information.</p>
 *                      key_features:
 *                        type: array
 *                        items:
 *                          type: string
 *                        description: The key features of the new product
 *                        example: [Feature 1, Feature 2, Feature 3]
 *                      video_url:
 *                        type: string
 *                        format: uri
 *                        description: The video url of the product
 *                        example: https://example.com/video_url.mp4
 *                      attributes:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                            slug:
 *                              type: string
 *                              description: The slug of the attribute
 *                              example: color
 *                            value:
 *                              type: string
 *                              description: The value of the attribute
 *                              example: Red
 *                      created_at:
 *                        type: string
 *                        format: date-time
 *                        description: The creation date of the new product
 *                        example: 2023-01-01T00:00:00.000Z
 *                      updated_at:
 *                        type: string
 *                        format: date-time
 *                        description: The last update date of the product
 *                        example: 2023-01-01T00:00:00.000Z
 *                      brand:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                            description: The ID of the brand associated with the product
 *                            example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *                          name:
 *                            type: string
 *                            description: The name of the brand associated with the product
 *                            example: Logitech
 *                          slug:
 *                            type: string
 *                            description: The slug of the brand associated with the product
 *                            example: logitech
 *                          icon:
 *                            type: string
 *                            format: uri
 *                            description: The icon URL of the brand associated with the product
 *                            example: https://example.com/icon.png
 *                      category:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                            description: The ID of the category associated with the product
 *                            example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *                          title:
 *                            type: string
 *                            description: The title of the category associated with the product
 *                            example: Speakers
 *                          slug:
 *                            type: string
 *                            description: The slug of the category associated with the product
 *                            example: speakers
 *                          icon:
 *                            type: string
 *                            format: uri
 *                            description: The icon URL of the category associated with the product
 *                            example: https://example.com/icon.png
 *
 *       401:
 *         description: If the user is not authenticated for the request. Only admin can add a product
 *       400:
 *         description: If the request is invalid or missing required fields
 *       409:
 *         description: If a product already exists with the same name
 */
// Get all products
/**
 * @swagger
 * /api/v1/product:
 *   get:
 *     summary: Retrieve all products
 *     description: Retrieves a list of all products
 *     tags: [Product]
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
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: The minimum price for filtering
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: The maximum price for filtering
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         description: The brand name for filtering
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: The category name for filtering
 *       - in: query
 *         name: published
 *         schema:
 *           type: boolean
 *           enum: [true, false]
 *         description: The published status for filtering
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *           enum: [true, false]
 *         description: The featured status for filtering
 *       - in: query
 *         name: filters
 *         required: false
 *         schema:
 *           type: object
 *           additionalProperties:
 *             type: string
 *         style: form
 *         explode: true
 *         description: Dynamic query parameters for filtering, e.g., `interface`, `type`, etc.
 *     responses:
 *       200:
 *         description: If retrieving all products is successful
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
 *                    example: Products have been successfully retrieved
 *                  meta:
 *                    type: object
 *                    properties:
 *                      total:
 *                        type: number
 *                        description: The total number of products
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
 *                          description: The ID of the product
 *                          example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                        name:
 *                          type: string
 *                          description: The name of the product
 *                          example: Microlab FC361 BT 2:1 Speaker
 *                        slug:
 *                          type: string
 *                          description: The slug of the product
 *                          example: microlab-fc361-bt-21-speaker
 *                        model:
 *                          type: string
 *                          description: The model of the product
 *                          example: FC361 BT
 *                        brand_id:
 *                          type: string
 *                          description: The ID of the brand associated with the product
 *                          example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                        category_id:
 *                          type: string
 *                          description: The ID of the category associated with the product
 *                          example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                        tags:
 *                          type: array
 *                          description: The tags associated with the product
 *                          example: ["Wireless", "Bluetooth"]
 *                        code:
 *                          type: string
 *                          description: The code of the product
 *                          example: SPK361
 *                        stock:
 *                          type: number
 *                          description: The stock quantity of the product
 *                          example: 10
 *                        price:
 *                          type: number
 *                          description: The price of the product
 *                          example: 2200
 *                        discount_price:
 *                          type: number
 *                          description: The discounted price of the product
 *                          example: 2000
 *                        retailer_price:
 *                          type: number
 *                          description: The retailer price of the product
 *                          example: 1800
 *                        thumbnail:
 *                          type: string
 *                          format: uri
 *                          description: The thumbnail URL of the product
 *                          example: https://example.com/thumbnail.jpg
 *                        images:
 *                          type: array
 *                          items:
 *                            type: string
 *                            format: uri
 *                          description: The image URLs of the product
 *                          example: [https://example.com/image1.jpg, https://example.com/image2.jpg]
 *                        published:
 *                          type: boolean
 *                          description: The published status of the product
 *                          example: true
 *                        featured:
 *                          type: boolean
 *                          description: The featured status of the product
 *                          example: true
 *                        description:
 *                          type: string
 *                          description: The description of the product (Plain text or HTML)
 *                          example: <p>This is an example of product description.</p>
 *                        specification:
 *                          type: string
 *                          description: The specification of the product (Plain text or HTML)
 *                          example: <p>This is an example of product specification.</p>
 *                        additional_information:
 *                          type: string
 *                          description: The additional information of the product (Plain text or HTML)
 *                          example: <p>This is an example of product additional information.</p>
 *                        key_features:
 *                          type: array
 *                          items:
 *                            type: string
 *                          description: The key features of the product
 *                          example: ["Feature 1", "Feature 2", "Feature 3"]
 *                        video_url:
 *                          type: string
 *                          format: uri
 *                          description: The video url of the product
 *                          example: https://example.com/video_url.mp4
 *                        attributes:
 *                          type: array
 *                          items:
 *                            type: object
 *                            properties:
 *                              slug:
 *                                type: string
 *                                description: The slug of the attribute
 *                                example: interface
 *                              value:
 *                                type: string
 *                                description: The value of the attribute
 *                                example: wireless
 *                          description: The attributes of the product
 *                          example: [{ "slug": "interface", "value": "wireless" }]
 *                        is_deleted:
 *                          type: boolean
 *                          description: The deleted status of the product
 *                          example: false
 *                        created_at:
 *                          type: string
 *                          format: date-time
 *                          description: The date and time when the product was created
 *                          example: 2023-08-12T12:00:00.000Z
 *                        updated_at:
 *                          type: string
 *                          format: date-time
 *                          description: The date and time when the product was last updated
 *                          example: 2023-08-12T12:00:00.000Z
 *                        brand:
 *                          type: object
 *                          properties:
 *                            id:
 *                              type: string
 *                              description: The ID of the brand associated with the product
 *                              example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                            name:
 *                              type: string
 *                              description: The name of the brand associated with the product
 *                              example: Microlab
 *                            slug:
 *                              type: string
 *                              description: The slug of the brand associated with the product
 *                              example: microlab
 *                            icon:
 *                              type: string
 *                              format: uri
 *                              nullable: true
 *                              description: The icon of the brand associated with the product if available
 *                              example: https://example.com/icon.png
 *                        category:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               description: The ID of the category associated with the product
 *                               example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                             title:
 *                               type: string
 *                               description: The title of the category associated with the product
 *                               example: Speaker
 *                             slug:
 *                               type: string
 *                               description: The slug of the category associated with the product
 *                               example: speaker
 *                             icon:
 *                               type: string
 *                               format: uri
 *                               nullable: true
 *                               description: The icon of the category associated with the product if available
 *                               example: https://example.com/icon.png
 *
 */
// Get single product
/**
 * @swagger
 * /api/v1/product/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     description: Retrieves a product by its ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: If the product is retrieved successfully
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
 *                    example: Successfully retrieved the product
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the product
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the product
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      name:
 *                        type: string
 *                        description: The name of the product
 *                        example: Microlab M-590 2:1 Speaker
 *                      slug:
 *                        type: string
 *                        description: The slug of the product
 *                        example: microlab-m-590-2-1-speaker
 *                      model:
 *                        type: string
 *                        description: The model of the product
 *                        example: M-590
 *                      brand_id:
 *                        type: string
 *                        description: The ID of the brand associated with the product
 *                        example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *                      category_id:
 *                        type: string
 *                        description: The ID of the category associated with the product
 *                        example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *                      tags:
 *                        type: array
 *                        items:
 *                          type: string
 *                        description: The tags associated with the product
 *                        example: [tag1, tag2, tag3]
 *                      code:
 *                        type: string
 *                        description: The code of the product
 *                        example: SPK590
 *                      stock:
 *                        type: number
 *                        description: The stock quantity of the product
 *                        example: 10
 *                      price:
 *                        type: number
 *                        description: The price of the product
 *                        example: 900
 *                      discount_price:
 *                        type: number
 *                        description: The discount price of the product
 *                        example: 800
 *                      retailer_price:
 *                        type: number
 *                        description: The retailer price of the product
 *                        example: 700
 *                      thumbnail:
 *                        type: string
 *                        format: uri
 *                        description: The thumbnail URL of the product
 *                        example: https://example.com/thumbnail.jpg
 *                      images:
 *                        type: array
 *                        items:
 *                          type: string
 *                        description: The image URLs of the product
 *                        example: [https://example.com/image1.jpg, https://example.com/image2.jpg]
 *                      published:
 *                        type: boolean
 *                        description: Indicates whether the new product is published or not
 *                        example: true
 *                      featured:
 *                        type: boolean
 *                        description: Indicates whether the new product is featured or not
 *                        example: false
 *                      description:
 *                        type: string
 *                        description: The description of the product (Plain text or HTML)
 *                        example: <p>This is an example of product description.</p>
 *                      specification:
 *                        type: string
 *                        description: The specification of the product (Plain text or HTML)
 *                        example: <p>This is an example of product specification.</p>
 *                      additional_information:
 *                        type: string
 *                        description: The additional information of the product (Plain text or HTML)
 *                        example: <p>This is an example of product additional information.</p>
 *                      key_features:
 *                        type: array
 *                        items:
 *                          type: string
 *                        description: The key features of the product
 *                        example: [Feature 1, Feature 2, Feature 3]
 *                      video_url:
 *                        type: string
 *                        format: uri
 *                        description: The video url of the product
 *                        example: https://example.com/video_url.mp4
 *                      attributes:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                            slug:
 *                              type: string
 *                              description: The slug of the attribute
 *                              example: color
 *                            value:
 *                              type: string
 *                              description: The value of the attribute
 *                              example: Red
 *                      created_at:
 *                        type: string
 *                        format: date-time
 *                        description: The creation date of the product
 *                        example: 2023-01-01T00:00:00.000Z
 *                      updated_at:
 *                        type: string
 *                        format: date-time
 *                        description: The last update date of the product
 *                        example: 2023-01-01T00:00:00.000Z
 *                      brand:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                            description: The ID of the brand associated with the product
 *                            example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *                          name:
 *                            type: string
 *                            description: The name of the brand associated with the product
 *                            example: Logitech
 *                          slug:
 *                            type: string
 *                            description: The slug of the brand associated with the product
 *                            example: logitech
 *                          icon:
 *                            type: string
 *                            format: uri
 *                            description: The icon URL of the brand associated with the product
 *                            example: https://example.com/icon.png
 *                      category:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                            description: The ID of the category associated with the product
 *                            example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *                          title:
 *                            type: string
 *                            description: The title of the category associated with the product
 *                            example: Speakers
 *                          slug:
 *                            type: string
 *                            description: The slug of the category associated with the product
 *                            example: speakers
 *                          icon:
 *                            type: string
 *                            format: uri
 *                            description: The icon URL of the category associated with the product
 *                            example: https://example.com/icon.png
 *
 *       404:
 *         description: Product not found
 */
// Update Product
/**
 * @swagger
 * /api/v1/product/update-product/{id}:
 *   patch:
 *     summary: Update a product
 *     description: Update a product by ID
 *     tags: [Product]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update
 *     requestBody:
 *       description: You can update name, model, brand id, category id, tags, code, stock, price, discount price, retailer price, thumbnail, images, published, featured, description, specification, additional information, key features, attributes
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: Microlab M-590 2:1 Speaker
 *               model:
 *                 type: string
 *                 description: The model of the product
 *                 example: M-590
 *               brand_id:
 *                 type: string
 *                 description: The ID of the brand associated with the product
 *                 example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *               category_id:
 *                 type: string
 *                 description: The ID of the category associated with the product
 *                 example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *               tags:
 *                 type: array
 *                 description: The tags associated with the product
 *                 example: [tag1, tag2, tag3]
 *               code:
 *                 type: string
 *                 description: The code of the product
 *                 example: SPK590
 *               stock:
 *                 type: number
 *                 description: The stock of the product
 *                 example: 10
 *               price:
 *                 type: number
 *                 description: The price of the product
 *                 example: 1000
 *               discount_price:
 *                 type: number
 *                 description: The discount price of the product
 *                 example: 900
 *               retailer_price:
 *                 type: number
 *                 description: The retailer price of the product
 *                 example: 800
 *               thumbnail:
 *                 type: string
 *                 format: uri
 *                 description: The thumbnail of the product
 *                 example: https://example.com/thumbnail.jpg
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                 description: The images of the product
 *                 example: [https://example.com/image1.jpg, https://example.com/image2.jpg]
 *               description:
 *                 type: string
 *                 description: The description of the product (plain text or HTML)
 *                 example: "<p>This is an example of product description.</p>"
 *               specification:
 *                 type: string
 *                 description: The specification of the product (plain text or HTML)
 *                 example: "<p>This is an example of product specification.</p>"
 *               additional_information:
 *                 type: string
 *                 description: The additional information of the product (plain text or HTML)
 *                 example: "<p>This is an example of product additional information.</p>"
 *               key_features:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The key features of the product
 *                 example: ["Feature 1", "Feature 2", "Feature 3"]
 *               video_url:
 *                 type: string
 *                 format: uri
 *                 description: The video url of the product
 *                 example: https://example.com/video_url.mp4
 *               attributes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     slug:
 *                       type: string
 *                       description: The slug of the attribute
 *                       example: color
 *                     value:
 *                       type: string
 *                       description: The value of the attribute
 *                       example: Red
 *                 description: The attributes of the product
 *               featured:
 *                 type: boolean
 *                 description: The featured status of the product
 *                 example: true
 *               published:
 *                 type: boolean
 *                 description: The published status of the product
 *                 example: true
 *     responses:
 *       200:
 *         description: If the product is updated successfully
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
 *                    example: Successfully added the product
 *                  data:
 *                    type: object
 *                    description: A JSON object representing the new product
 *                    properties:
 *                      id:
 *                        type: string
 *                        description: The ID of the new product
 *                        example: 656c6ccf-199c-454c-937b-f41c148f673b
 *                      name:
 *                        type: string
 *                        description: The name of the new product
 *                        example: Microlab M-590 2:1 Speaker
 *                      slug:
 *                        type: string
 *                        description: The slug of the new product
 *                        example: microlab-m-590-2-1-speaker
 *                      model:
 *                        type: string
 *                        description: The model of the new product
 *                        example: M-590
 *                      brand_id:
 *                        type: string
 *                        description: The ID of the brand associated with the new product
 *                        example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *                      category_id:
 *                        type: string
 *                        description: The ID of the category associated with the new product
 *                        example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *                      tags:
 *                        type: array
 *                        items:
 *                          type: string
 *                        description: The tags associated with the new product
 *                        example: [tag1, tag2, tag3]
 *                      code:
 *                        type: string
 *                        description: The code of the new product
 *                        example: SPK590
 *                      stock:
 *                        type: number
 *                        description: The stock quantity of the new product
 *                        example: 10
 *                      price:
 *                        type: number
 *                        description: The price of the new product
 *                        example: 900
 *                      discount_price:
 *                        type: number
 *                        description: The discount price of the new product
 *                        example: 800
 *                      retailer_price:
 *                        type: number
 *                        description: The retailer price of the new product
 *                        example: 700
 *                      thumbnail:
 *                        type: string
 *                        format: uri
 *                        description: The thumbnail URL of the new product
 *                        example: https://example.com/thumbnail.jpg
 *                      images:
 *                        type: array
 *                        items:
 *                          type: string
 *                        description: The image URLs of the new product
 *                        example: [https://example.com/image1.jpg, https://example.com/image2.jpg]
 *                      published:
 *                        type: boolean
 *                        description: Indicates whether the new product is published or not
 *                        example: true
 *                      featured:
 *                        type: boolean
 *                        description: Indicates whether the new product is featured or not
 *                        example: false
 *                      description:
 *                        type: string
 *                        description: The description of the new product (Plain text or HTML)
 *                        example: <p>This is an example of product description.</p>
 *                      specification:
 *                        type: string
 *                        description: The specification of the new product (Plain text or HTML)
 *                        example: <p>This is an example of product specification.</p>
 *                      additional_information:
 *                        type: string
 *                        description: The additional information of the new product (Plain text or HTML)
 *                        example: <p>This is an example of product additional information.</p>
 *                      key_features:
 *                        type: array
 *                        items:
 *                          type: string
 *                        description: The key features of the new product
 *                        example: [Feature 1, Feature 2, Feature 3]
 *                      video_url:
 *                        type: string
 *                        format: uri
 *                        description: The video url of the product
 *                        example: https://example.com/video_url.mp4
 *                      attributes:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                            slug:
 *                              type: string
 *                              description: The slug of the attribute
 *                              example: color
 *                            value:
 *                              type: string
 *                              description: The value of the attribute
 *                              example: Red
 *                      created_at:
 *                        type: string
 *                        format: date-time
 *                        description: The creation date of the new product
 *                        example: 2023-01-01T00:00:00.000Z
 *                      updated_at:
 *                        type: string
 *                        format: date-time
 *                        description: The last update date of the product
 *                        example: 2023-01-01T00:00:00.000Z
 *                      brand:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                            description: The ID of the brand associated with the product
 *                            example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *                          name:
 *                            type: string
 *                            description: The name of the brand associated with the product
 *                            example: Logitech
 *                          slug:
 *                            type: string
 *                            description: The slug of the brand associated with the product
 *                            example: logitech
 *                          icon:
 *                            type: string
 *                            format: uri
 *                            description: The icon URL of the brand associated with the product
 *                            example: https://example.com/icon.png
 *                      category:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                            description: The ID of the category associated with the product
 *                            example: 040fec96-2847-41d8-91cf-ae1aedeb45d2
 *                          title:
 *                            type: string
 *                            description: The title of the category associated with the product
 *                            example: Speakers
 *                          slug:
 *                            type: string
 *                            description: The slug of the category associated with the product
 *                            example: speakers
 *                          icon:
 *                            type: string
 *                            format: uri
 *                            description: The icon URL of the category associated with the product
 *                            example: https://example.com/icon.png
 *
 *       401:
 *         description: If the user is not authenticated for the request. Only admin can update a product
 *       404:
 *         description: If the product is not found
 */
// Delete Product
/**
 * @swagger
 * /api/v1/product/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product
 *     tags: [Product]
 *     security:
 *       - AdminAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: If the product is deleted successfully
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
 *                    example: Successfully deleted the product
 *                  data:
 *                    type: null
 *                    description: No data is returned
 *                    example: null
 *       401:
 *         description: If the user is not authenticated for the request. Only admin can delete a product
 */

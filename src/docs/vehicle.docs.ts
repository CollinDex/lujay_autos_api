export const createVehicle = `
/**
 * @swagger
 * /api/v1/vehicles:
 *   post:
 *     summary: Create a new vehicle listing
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *                 example: Toyota
 *               model:
 *                 type: string
 *                 example: Corolla
 *               year:
 *                 type: number
 *                 example: 2020
 *               price:
 *                 type: number
 *                 example: 15000
 *               quantity:
 *                 type: number
 *                 example: 3
 *               posterId:
 *                 type: string
 *                 example: 6738d09e3f5d23a12b4cfa00
 *               media:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: https://res.cloudinary.com/demo/image/upload/sample1.jpg
 *                     type:
 *                       type: string
 *                       example: image/jpeg
 *                     publicId:
 *                       type: string
 *                       example: sample1
 *                     index:
 *                       type: number
 *                       example: 1
 *     responses:
 *       201:
 *         description: Vehicle listing created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Vehicle created successfully
 *                 status_code:
 *                   type: number
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     vehicle:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 6738d09e3f5d23a12b4cfa00
 *                         make:
 *                           type: string
 *                         model:
 *                           type: string
 *                         year:
 *                           type: number
 *                         price:
 *                           type: number
 *                         quantity:
 *                           type: number
 *                         posterId:
 *                           type: string
 *                         media:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               url:
 *                                 type: string
 *                               type:
 *                                 type: string
 *                               publicId:
 *                                 type: string
 *                               index:
 *                                 type: number
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Server error
 */
`;


export const getAllVehicles = `
/**
 * @swagger
 * /api/v1/vehicles:
 *   get:
 *     summary: Retrieve all vehicle listings
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of vehicles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Vehicles retrieved successfully
 *                 status_code:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     vehicles:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 6738d09e3f5d23a12b4cfa00
 *                           make:
 *                             type: string
 *                             example: Toyota
 *                           model:
 *                             type: string
 *                             example: Corolla
 *                           year:
 *                             type: number
 *                             example: 2020
 *                           price:
 *                             type: number
 *                             example: 15000
 *                           quantity:
 *                             type: number
 *                             example: 3
 *                           posterId:
 *                             type: string
 *                             example: 6738d09e3f5d23a12b4cfa00
 *                           media:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 url:
 *                                   type: string
 *                                   example: https://res.cloudinary.com/demo/image/upload/sample1.jpg
 *                                 type:
 *                                   type: string
 *                                   example: image/jpeg
 *                                 publicId:
 *                                   type: string
 *                                   example: sample1
 *                                 index:
 *                                   type: number
 *                                   example: 1
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Server error
 */
`;


export const getVehicleById = `
/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   get:
 *     summary: Retrieve a single vehicle listing by ID
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the vehicle to retrieve
 *         schema:
 *           type: string
 *           example: 6738d09e3f5d23a12b4cfa00
 *     responses:
 *       200:
 *         description: Vehicle retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Vehicle retrieved successfully
 *                 status_code:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     vehicle:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 6738d09e3f5d23a12b4cfa00
 *                         make:
 *                           type: string
 *                           example: Toyota
 *                         model:
 *                           type: string
 *                           example: Corolla
 *                         year:
 *                           type: number
 *                           example: 2020
 *                         price:
 *                           type: number
 *                           example: 15000
 *                         quantity:
 *                           type: number
 *                           example: 3
 *                         posterId:
 *                           type: string
 *                           example: 6738d09e3f5d23a12b4cfa00
 *                         media:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               url:
 *                                 type: string
 *                                 example: https://res.cloudinary.com/demo/image/upload/sample1.jpg
 *                               type:
 *                                 type: string
 *                                 example: image/jpeg
 *                               publicId:
 *                                 type: string
 *                                 example: sample1
 *                               index:
 *                                 type: number
 *                                 example: 1
 *       404:
 *         description: Vehicle not found
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Server error
 */
`;

export const updateVehicleDoc = `
/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   put:
 *     summary: Update an existing vehicle listing
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 6738d09e3f5d23a12b4cfa00
 *         description: Vehicle ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *                 example: Toyota
 *               model:
 *                 type: string
 *                 example: Corolla
 *               year:
 *                 type: number
 *                 example: 2020
 *               price:
 *                 type: number
 *                 example: 12000
 *               quantity:
 *                 type: number
 *                 example: 2
 *               media:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                     type:
 *                       type: string
 *                     publicId:
 *                       type: string
 *                     index:
 *                       type: number
 *     responses:
 *       200:
 *         description: Vehicle listing updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Vehicle listing updated successfully
 *                 status_code:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     vehicle:
 *                       $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: No fields provided or invalid data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (updating someone else's vehicle)
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */
`;

export const deleteVehicleDoc = `
/**
 * @swagger
 * /api/v1/vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle listing
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 6738d09e3f5d23a12b4cfa00
 *         description: Vehicle ID to delete
 *     responses:
 *       200:
 *         description: Vehicle deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Vehicle deleted successfully
 *                 status_code:
 *                   type: number
 *                   example: 200
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (deleting someone else's vehicle)
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Server error
 */
`;


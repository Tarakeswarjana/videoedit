require('dotenv').config();
const cors = require('cors');
const express = require('express');
const swaggerUIPath = require("swagger-ui-express");
const swaggerjsonFilePath = require("./swagger.json");
const app = express();
const upload = require('./middlewares/upload.middleware');
const videoController = require('./controllers/video.controller')
app.use(cors());
const videoRoutes = require('./routes/video.routes');

app.use(express.json());

/**
 * @swagger
 * /api/videos/upload::
 *   post:
 *     tags:
 *       - VIDEO EDIT
 *     summary: Upload a video file
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: video
 *         type: file
 *         required: true
 *         description: The video file to upload
 *       - in: formData
 *         name: title
 *         type: string
 *         required: false
 *         description: Title for the video
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Internal Server Error
 */

app.post('/api/videos/upload', upload.single('video'), videoController.uploadVideo);
app.use('/api/videos', videoRoutes);

app.use("/api-docs", swaggerUIPath.serve, swaggerUIPath.setup(swaggerjsonFilePath));
module.exports = app;

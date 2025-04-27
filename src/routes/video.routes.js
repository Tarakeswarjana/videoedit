const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const videoController = require('../controllers/video.controller');

router.post('/upload', upload.single('video'), videoController.uploadVideo);
router.post('/:id/trim', videoController.trimVideo);
router.post('/:id/subtitles', videoController.addSubtitles);
router.post('/:id/render', videoController.renderVideo);
router.get('/:id/download', videoController.downloadVideo);

module.exports = router;

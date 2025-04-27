const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const { trimVideo, addSubtitles } = require('../services/ffmpeg.service');

exports.uploadVideo = async (req, res) => {
    try {
        const { filename, size } = req.file;
        const videoPath = path.join(process.env.UPLOAD_FOLDER, filename);

        const video = await prisma.video.create({
            data: {
                name: filename,
                path: videoPath,
                size: size,
                duration: 0, // We can update later if needed
            },
        });

        res.status(201).json(video);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.trimVideo = async (req, res) => {
    const { id } = req.params;
    const { start, end } = req.body;

    try {
        const video = await prisma.video.findUnique({ where: { id: Number(id) } });
        const outputPath = `uploads/trimmed_${Date.now()}.mp4`;
        const duration = end - start;
        console.log(video, "pppp");
        await trimVideo(video.path, outputPath, start, duration);
        console.log("===2")
        const updated = await prisma.video.update({
            where: { id: Number(id) },
            data: { path: outputPath },
        });

        res.json(updated);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};


function sanitizeFilename(text) {
    return text
        .replace(/\s+/g, '_')      // Replace spaces with _
        .replace(/[^\w\-]/g, '')    // Remove all non-word characters
        .substring(0, 30);          // Limit length
}

exports.addSubtitles = async (req, res) => {
    const { id } = req.params;
    const { text, start, end } = req.body;

    try {
        const video = await prisma.video.findUnique({ where: { id: Number(id) } });

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        const dir = path.dirname(video.path);
        const extension = path.extname(video.path) || '.mp4';
        const safeText = sanitizeFilename(text);
        const outputFilename = `${safeText}${extension}`;
        const tempPath = path.join(dir, outputFilename);

        console.log(tempPath, "--==");

        await addSubtitles(video.path, tempPath, { text, start, end });

        // Now update the database with the new path!
        const updatedVideo = await prisma.video.update({
            where: { id: Number(id) },
            data: { path: tempPath }, // 👈 Updating the video path
        });

        res.json(updatedVideo); // Send updated video info
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.renderVideo = async (req, res) => {
    const { id } = req.params;

    try {
        const video = await prisma.video.findUnique({ where: { id: Number(id) } });


        const renderedPath = `uploads/rendered_${Date.now()}.mp4`;
        const fs = require('fs');
        fs.copyFileSync(video.path, renderedPath);

        const updated = await prisma.video.update({
            where: { id: Number(id) },
            data: { path: renderedPath, status: 'rendered' },
        });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.downloadVideo = async (req, res) => {
    const { id } = req.params;

    try {
        const video = await prisma.video.findUnique({ where: { id: Number(id) } });

        res.download(video.path);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

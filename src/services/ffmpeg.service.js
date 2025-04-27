const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs/promises');
const path = require('path');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

ffmpeg.setFfmpegPath(ffmpegPath);

const trimVideo = (inputPath, outputPath, startTime, duration) => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .setStartTime(startTime)
            .setDuration(duration)
            .output(outputPath)
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(err))
            .run();
    });
};



async function addSubtitles(inputPath, outputPath, subtitles) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .videoFilter(`drawtext=text='${subtitles.text}':fontcolor=white:fontsize=24:x=10:y=H-th-10:enable='between(t,${subtitles.start},${subtitles.end})'`)
            .save(outputPath)
            .on('end', () => resolve())
            .on('error', (err) => reject(err));
    });
}


module.exports = { trimVideo, addSubtitles };

require('dotenv').config();
const express = require('express');
const app = express();
const videoRoutes = require('./routes/video.routes');

app.use(express.json());
app.use('/api/videos', videoRoutes);
app.get('/', (req, res) => {
    console.log("kkkk")
    return (res.send({ data: { name: "poltu" }, message: "done" }))
})

module.exports = app;

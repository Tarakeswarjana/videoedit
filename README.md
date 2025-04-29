

env details::

PORT=5000
DATABASE_URL="postgresql://postgres:123@localhost:5432/video_editor_db"
UPLOAD_FOLDER=uploads/







for swagger docs run bellow command 
npm run swagger-autogen


replace the swagger.json    of  "/api/videos/upload"
  "/api/videos/upload": {
    "post": {
      "tags": ["VIDEO EDIT"],
      "summary": "Upload a video file",
      "consumes": ["multipart/form-data"],
      "parameters": [
        {
          "in": "formData",
          "name": "video",
          "type": "file",
          "required": true,
          "description": "The video file to upload"
        },
        {
          "in": "formData",
          "name": "title",
          "type": "string",
          "required": false,
          "description": "Title for the video"
        }
      ],
      "responses": {
        "201": {
          "description": "Created"
        },
        "500": {
          "description": "Internal Server Error"
        }
      }
    }
  }
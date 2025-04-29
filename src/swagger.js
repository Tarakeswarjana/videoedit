const options = {
    openapi: "OpenAPI 3",
    language: "en-US",
    disableLogs: false,
    autoHeaders: false,
    autoQuery: false,
    autoBody: false,
};
const generateSwagger = require("swagger-autogen")();

const swaggerDocument = {
    info: {
        version: "1.0.0",
        title: "Video Apis",
        description: "API for Managing video edit",
        contact: {
            name: "API Support",
            email: "tarakeswarjana9402@gmail.com",
        },
    },
    host: "localhost:5000",
    basePath: "/",
    schemes: ["http"],
    consumes: ["application/json", "multipart/form-data"],

    produces: ["application/json"],
    tags: [
        {
            name: "VIDEO EDIT",
            description: "VIDEO EDIT related apis",
        },
        {
            name: "VIDEO EDIT",
            description: "VIDEO EDIT App",
        },
    ],
    securityDefinitions: {},
    definitions: {
        videoEditResponse: {
            code: 200,
            message: "Success",
        },
        "errorResponse.400": {
            code: 400,
            message:
                "The request was malformed or invalid. Please check the request parameters.",
        },
        "errorResponse.401": {
            code: 401,
            message: "Authentication failed or user lacks proper authorization.",
        },
        "errorResponse.403": {
            code: 403,
            message: "You do not have permission to access this resource.",
        },
        "errorResponse.404": {
            code: "404",
            message: "The requested resource could not be found on the server.",
        },
        "errorResponse.500": {
            code: 500,
            message:
                "An unexpected error occurred on the server. Please try again later.",
        },
    },
};
const swaggerFile = "./src/swagger.json";
const apiRouteFile = ["./app.js"];
generateSwagger(swaggerFile, apiRouteFile, swaggerDocument);
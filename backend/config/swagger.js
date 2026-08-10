import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Resume Builder API",
            version: "1.0.0",
            description: "API documentation for Resume Builder Application",
            contact: {
                name: "Resume Builder Team",
            },
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Development Server",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);

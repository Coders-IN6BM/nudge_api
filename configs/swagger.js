import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API Gestión de App Nudge",
            version: "1.5.0",
            description: "API para gestionar la aplicación Nudge, incluyendo usuarios, publicaciones, comentarios y categorías.",
            contact: {
                name: "Coders",
                email: ""
            }
        },
        servers: [
            {
                url: "http://127.0.0.1:3005/nudge/v1"
            }
        ]
    },
    apis: [

    ]
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };

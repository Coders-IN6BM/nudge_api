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
                url: "http://127.0.0.1:3005/nudge/v1",
                description: "Servidor de desarrollo"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string", description: "ID único del usuario" },
                        name: { type: "string", description: "Nombre del usuario" },
                        surname: { type: "string", description: "Apellido del usuario" },
                        userName: { type: "string", description: "Nombre de usuario único" },
                        email: { type: "string", format: "email", description: "Correo electrónico" },
                        phone: { type: "string", description: "Número de teléfono" },
                        role: { type: "string", enum: ["ADMIN_ROLE", "USER_ROLE"], description: "Rol del usuario" },
                        status: { type: "boolean", description: "Estado activo/inactivo del usuario" }
                    }
                },
                Error: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", description: "Mensaje de error" },
                        error: { type: "string", description: "Detalle del error" }
                    }
                },
                Success: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", description: "Mensaje de éxito" }
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [
        "./src/user/user.routes.js",
        "./src/auth/auth.routes.js",
        "./src/publication/publication.routes.js",
        "./src/comments/comment.routes.js",
        "./src/category/category.routes.js"
    ]
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };

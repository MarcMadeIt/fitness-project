import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import graphQlSchema from "./graphql/schemas/index.js";
import rootResolver from "./graphql/resolvers/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { secureAuth } from "./middleware/middleware.js";

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster-1.qktqy.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster-1`;

export default async function handler(req, res) {
    // Connect to MongoDB
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(MONGO_URI);
    }

    // Apply CORS middleware
    cors({
        origin: 'https://staystrong.vercel.app',
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })(req, res, (err) => {
        if (err) {
            res.status(500).send('CORS error');
            return;
        }
    });

    // Apply bodyParser middleware
    bodyParser.json()(req, res, (err) => {
        if (err) {
            res.status(400).send('Invalid JSON');
            return;
        }
    });

    // Apply cookieParser middleware
    cookieParser()(req, res, (err) => {
        if (err) {
            res.status(500).send('Cookie parsing error');
            return;
        }
    });

    // Apply secureAuth middleware
    await secureAuth(req, res, (err) => {
        if (err) {
            res.status(401).send('Authentication error');
            return;
        }
    });

    // GraphQL endpoint
    return graphqlHTTP({
        schema: graphQlSchema,
        rootValue: rootResolver,
        graphiql: true,
        context: {
            req,
            res,
            userId: req.userId,
            secureAuth: req.secureAuth,
        },
    })(req, res);
}

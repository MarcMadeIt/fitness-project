import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import graphQlSchema from "./graphql/schemas/index.js";
import rootResolver from "./graphql/resolvers/index.js";
import { secureAuth } from "./middleware/middleware.js";

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'https://staystrong.vercel.app'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(secureAuth);

app.use(
    "/graphql",
    graphqlHTTP((req, res) => {

        return {
            schema: graphQlSchema,
            rootValue: rootResolver,
            graphiql: true,
            context: {
                req, res,
                userId: req.userId,
                secureAuth: req.secureAuth

            },
        };
    })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster-1.qktqy.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster-1`)
    .then(() => app.listen(3000))
    .catch((err) => console.log(err));

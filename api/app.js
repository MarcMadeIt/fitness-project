import express from "express"
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import graphQlSchema from "./graphql/schemas/index.js"
import rootResolver from "./graphql/resolvers/index.js";
import { secureAuth } from "./middleware/middleware.js";


const app = express();


app.use(secureAuth);

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    rootValue: rootResolver,
    graphiql: true,
}));

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster-1.qktqy.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster-1`).then(() => {
    app.listen(3000);
}).catch(err => { console.log(err) });

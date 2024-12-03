import { buildSchema } from "graphql";

const graphQlSchema = buildSchema(`
    type WorkoutSession {
        _id: ID!
        creator: User!
        workoutLogs: [WorkoutLog!]! 
    
    }

    type WorkoutLog {
        _id: ID!
        workoutType: WorkoutType!
        creator: User!
        weight: Float!
        sets: Int!
        reps: Int!
       
    }

    type WorkoutType {
        _id: ID!
        name: String!
        desc: String!
        part: String!
        creator: User!
        
    }

    type User {
        _id: ID!
        username: String!
        password: String
        createdWorkout: [WorkoutType!]
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input UserInput {
        username: String!
        password: String!

    }

    input WorkoutTypeInput {
        name: String!
        desc: String!
        part: String! 
        creator: ID! 
    }

    input WorkoutLogInput {
        workoutTypeId: ID!
        weight: Float!
        sets: Int!
        reps: Int!
        creator: ID!
        createdAt: String!
        sessionId: ID! 
    }

    input WorkoutSessionInput {
        creator: ID!
        workoutLogIds: [ID!]!
        createdAt: String! 
    }

    type RootQuery {
        getUsers: [User!]! 
        getWorkoutTypes: [WorkoutType!]!
        getWorkoutLogs: [WorkoutLog!]!
        getWorkoutSessions: [WorkoutSession!]!
        login(username: String!, password: String!): AuthData!

    }

    type RootMutation {
        createWorkoutType(workoutTypeInput: WorkoutTypeInput): WorkoutType
        createUser(userInput: UserInput): User
        createWorkoutSession(workoutSessionInput: WorkoutSessionInput!): WorkoutSession!
        createWorkoutLog(workoutLogInput: WorkoutLogInput!): WorkoutLog!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

export default graphQlSchema;

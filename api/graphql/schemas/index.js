import { buildSchema } from "graphql";

const graphQlSchema = buildSchema(`
    type WorkoutSession {
        _id: ID!
        creator: User!
        workoutLogs: [WorkoutLog!]!
        createdAt: String! 
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
        token: String!
    }

    type AuthData {
        userId: ID!
        token: String!
        username: String!
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
    }

    input WorkoutLogInput {
        workoutTypeId: ID!
        weight: Float!
        sets: Int!
        reps: Int!
        creator: ID!
    }

    input WorkoutSessionInput {
        creator: ID!
        workoutLogIds: [ID!]!
         
    }

    type RootQuery {
        getUsers: [User!]! 
        getWorkoutTypes: [WorkoutType!]!
        getWorkoutLogs: [WorkoutLog!]!
        getWorkoutSessions: [WorkoutSession!]!
        getAllWorkoutSessions: [WorkoutSession!]!
        getWorkoutLimitSessions: [WorkoutSession!]!
        login(username: String!, password: String!): AuthData!
        logout: String!

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

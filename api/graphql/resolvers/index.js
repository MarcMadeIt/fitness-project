import authResolver from "./auth.js"
import workoutLogsResolver from "./workoutLogs.js"
import workoutSessionsResolver from "./workoutSessions.js"
import workoutTypesResolver from "./workoutTypes.js"

const rootResolver = {
    ...authResolver,
    ...workoutLogsResolver,
    ...workoutSessionsResolver,
    ...workoutTypesResolver,
}

export default rootResolver
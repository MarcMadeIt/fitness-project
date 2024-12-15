import { WorkoutLog } from "../../../store/workout/workoutSlice";

interface WorkoutLogProps {
  logs: WorkoutLog[];
}

const ActivityContent = ({ logs }: WorkoutLogProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Workout Type</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Sets</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.workoutType?.name || "N/A"}</td>
              <td>{log.reps}</td>
              <td>{log.weight}</td>
              <td>{log.sets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityContent;

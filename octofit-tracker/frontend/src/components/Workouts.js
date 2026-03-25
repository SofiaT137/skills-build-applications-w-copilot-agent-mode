import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        setLoading(false);
        console.log('Fetched workouts:', results);
        console.log('API endpoint:', API_URL);
      });
  }, []);

  return (
    <div className="card p-4">
      <h2 className="mb-4">Workouts</h2>
      {loading ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div> : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map(workout => (
              <tr key={workout.id || workout._id}>
                <td>{workout.id || workout._id}</td>
                <td>{workout.name}</td>
                <td>{workout.description}</td>
                <td>{workout.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Workouts;

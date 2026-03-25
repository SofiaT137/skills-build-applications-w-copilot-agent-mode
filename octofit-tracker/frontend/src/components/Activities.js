import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        setLoading(false);
        console.log('Fetched activities:', results);
        console.log('API endpoint:', API_URL);
      });
  }, []);

  return (
    <div className="card p-4">
      <h2 className="mb-4">Activities</h2>
      {loading ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div> : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity.id || activity._id}>
                <td>{activity.id || activity._id}</td>
                <td>{activity.user?.username || activity.user}</td>
                <td>{activity.type}</td>
                <td>{activity.duration}</td>
                <td>{activity.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Activities;

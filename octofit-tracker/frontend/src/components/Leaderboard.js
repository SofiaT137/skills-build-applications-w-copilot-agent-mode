import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        setLoading(false);
        console.log('Fetched leaderboard:', results);
        console.log('API endpoint:', API_URL);
      });
  }, []);

  return (
    <div className="card p-4">
      <h2 className="mb-4">Leaderboard</h2>
      {loading ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div> : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(entry => (
              <tr key={entry.id || entry._id}>
                <td>{entry.id || entry._id}</td>
                <td>{entry.user?.username || entry.user}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leaderboard;

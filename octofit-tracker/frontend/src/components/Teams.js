import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        setLoading(false);
        console.log('Fetched teams:', results);
        console.log('API endpoint:', API_URL);
      });
  }, []);

  return (
    <div className="card p-4">
      <h2 className="mb-4">Teams</h2>
      {loading ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div> : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr key={team.id || team._id}>
                <td>{team.id || team._id}</td>
                <td>{team.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Teams;

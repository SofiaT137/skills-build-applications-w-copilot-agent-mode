import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        setLoading(false);
        console.log('Fetched users:', results);
        console.log('API endpoint:', API_URL);
      });
  }, []);

  return (
    <div className="card p-4">
      <h2 className="mb-4">Users</h2>
      {loading ? <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div> : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id || user._id}>
                <td>{user.id || user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.team?.name || user.team}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;

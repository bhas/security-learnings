import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:32770/api/users')
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);

  return (
    <div className="admin-page main-container">
      <h2>Admin: All Users</h2>
      <ul>
        {users.length === 0 && <li>No users found.</li>}
        {users.map(user => (
          <li key={user.username}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

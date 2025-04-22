import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';

interface User {
  username: string;
  password: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAddUser = () => {
    const newUser = { username, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsername('');
    setPassword('');
    alert('User added successfully!');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">User Management</h1>
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Add New Cashier</h2>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <Button variant="success" onClick={handleAddUser}>
            Add Cashier
          </Button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">Cashier List</h2>
          <ul className="list-disc pl-5">
            {users.map((user, index) => (
              <li key={index} className="text-gray-700">
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default UserManagement; 
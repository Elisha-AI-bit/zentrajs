import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Modal from '../components/Modal';

interface User {
  username: string;
  password: string;
  name: string;
  staffId: string;
  tillNumber: string;
  image: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [staffId, setStaffId] = useState('');
  const [tillNumber, setTillNumber] = useState('');
  const [image, setImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
  }, []);

  const handleAddUser = () => {
    const newUser = { username, password, name, staffId, tillNumber, image };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsername('');
    setPassword('');
    setName('');
    setStaffId('');
    setTillNumber('');
    setImage('');
    alert('User added successfully!');
  };

  const handleEditUser = (index: number) => {
    const userToEdit = users[index];
    setUsername(userToEdit.username);
    setPassword(userToEdit.password);
    setName(userToEdit.name);
    setStaffId(userToEdit.staffId);
    setTillNumber(userToEdit.tillNumber);
    handleDeleteUser(index);
  };

  const handleDeleteUser = (index: number) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">User Management</h1>
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Manage your cashiers efficiently with the tools below.</p>
          <Button variant="success" onClick={openModal} className="shadow-md hover:shadow-lg transition-shadow">
            Add New Cashier
          </Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Cashier</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700" htmlFor="staffId">Staff ID</label>
                <input
                  type="text"
                  id="staffId"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700" htmlFor="tillNumber">Till Number</label>
                <input
                  type="text"
                  id="tillNumber"
                  value={tillNumber}
                  onChange={(e) => setTillNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700" htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700" htmlFor="image">Image</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="success" onClick={() => { handleAddUser(); closeModal(); }} className="shadow-md hover:shadow-lg transition-shadow">
                Add Cashier
              </Button>
            </div>
          </div>
        </Modal>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Cashier List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                {user.image && <img src={user.image} alt={user.name} className="w-full h-32 object-cover rounded-md mb-4" />}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{user.name}</h3>
                <p className="text-sm text-gray-600"><strong>Username:</strong> {user.username}</p>
                <p className="text-sm text-gray-600"><strong>Staff ID:</strong> {user.staffId}</p>
                <p className="text-sm text-gray-600"><strong>Till Number:</strong> {user.tillNumber}</p>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditUser(index)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteUser(index)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserManagement; 
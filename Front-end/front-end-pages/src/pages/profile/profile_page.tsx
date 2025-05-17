import React, { useState } from 'react';

interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  name: string;
  address: string;
}

interface ProfilePageProps {
  initialUserData: User;
  onSave: (user: User) => Promise<void>;
  brandName?: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  initialUserData,
  onSave,
  brandName = '# BRAND',
}) => {
  const [user, setUser] = useState<User>(initialUserData);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field: keyof User, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMessage('');
    setErrorMessage('');
    try {
      await onSave(user);
      setSuccessMessage('Settings saved successfully!');
      setIsDirty(false);
    } catch (error) {
      setErrorMessage('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-blue-600">{brandName}</h1>
        <input
          type="text"
          placeholder="Search for..."
          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </header>

      {/* Profile Section */}
      <main className="mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Picture */}
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Change Photo
            </button>
          </div>

          {/* User Settings */}
          <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">User Settings</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    value={user.username}
                    readOnly
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={(e) =>
                      !validateEmail(e.target.value) &&
                      setErrorMessage('Please enter a valid email address.')
                    }
                    className={`w-full mt-1 px-3 py-2 border ${
                      validateEmail(user.email) ? 'border-gray-300' : 'border-red-500'
                    } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {!validateEmail(user.email) && (
                    <p className="text-red-500 text-sm">Invalid email address.</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={user.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={user.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={user.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={handleSave}
                disabled={!isDirty || isSaving}
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  isSaving
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
                }`}
              >
                {isSaving ? 'Saving...' : 'Save Settings'}
              </button>
            </form>
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-6 text-center text-sm text-gray-600">
        Copyright © Brand 2025
      </footer>
    </div>
  );
};

export default ProfilePage;
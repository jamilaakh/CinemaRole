import { useState } from 'react';
import { Settings, Save, Globe, Bell, Shield, Mail } from 'lucide-react';

const AdminSettings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'CinemaRole',
    siteDescription: 'Your ultimate platform for movie reviews and ratings',
    allowGuestReviews: false,
    requireEmailVerification: true,
    moderationEnabled: true,
    maxReviewLength: 2000,
  });

  const [emailSettings, setEmailSettings] = useState({
    notifyOnNewReviews: true,
    notifyOnNewUsers: true,
    notifyOnReports: true,
    adminEmail: 'admin@cinemarole.com',
  });

  // --- JSX version: remove type annotations ---
  const handleGeneralSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? checked
        : type === 'number'
          ? parseInt(value)
          : value
    }));
  };

  const handleEmailSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmailSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save the settings to the backend
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Admin Settings</h1>
      <form onSubmit={handleSubmit}>
        {/* General Settings */}
        <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-md mb-6">
          <div className="p-4 border-b border-neutral-700 flex items-center">
            <Globe className="h-5 w-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold text-white">General Settings</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-300 mb-1">
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={generalSettings.siteName}
                onChange={handleGeneralSettingsChange}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-300 mb-1">
                Site Description
              </label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                value={generalSettings.siteDescription}
                onChange={handleGeneralSettingsChange}
                rows={3}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              ></textarea>
            </div>
            <div>
              <label htmlFor="maxReviewLength" className="block text-sm font-medium text-gray-300 mb-1">
                Maximum Review Length (characters)
              </label>
              <input
                type="number"
                id="maxReviewLength"
                name="maxReviewLength"
                value={generalSettings.maxReviewLength}
                onChange={handleGeneralSettingsChange}
                min={100}
                max={10000}
                className="w-full bg-neutral-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="allowGuestReviews"
                name="allowGuestReviews"
                checked={generalSettings.allowGuestReviews}
                onChange={handleGeneralSettingsChange}
                className="h-4 w-4 text-red-600 focus:ring-red-600 border-gray-600 rounded"
              />
              <label htmlFor="allowGuestReviews" className="ml-2 block text-sm text-gray-300">
                Allow guest reviews (without registration)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="requireEmailVerification"
                name="requireEmailVerification"
                checked={generalSettings.requireEmailVerification}
                onChange={handleGeneralSettingsChange}
                className="h-4 w-4 text-red-600 focus:ring-red-600 border-gray-600 rounded"
              />
              <label htmlFor="requireEmailVerification" className="ml-2 block text-sm text-gray-300">
                Require email verification for new users
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="moderationEnabled"
                name="moderationEnabled"
                checked={generalSettings.moderationEnabled}
                onChange={handleGeneralSettingsChange}
                className="h-4 w-4 text-red-600 focus:ring-red-600 border-gray-600 rounded"
              />
              <label htmlFor="moderationEnabled" className="ml-2 block text-sm text-gray-300">
                Enable content moderation for reviews
              </label>
            </div>
          </div>
        </div>
        {/* Email Notification Settings */}
        <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-md mb-6">
          <div className="p-4 border-b border-neutral-700 flex items-center">
            <Bell className="h-5 w-5 text-yellow-500 mr-2" />
            <h2 className="text-lg font-semibold text-white">Email Notifications</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-300 mb-1">
                Admin Email Address
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-neutral-600 bg-neutral-700 text-gray-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  id="adminEmail"
                  name="adminEmail"
                  value={emailSettings.adminEmail}
                  onChange={handleEmailSettingsChange}
                  className="w-full bg-neutral-700 text-white px-4 py-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifyOnNewReviews"
                name="notifyOnNewReviews"
                checked={emailSettings.notifyOnNewReviews}
                onChange={handleEmailSettingsChange}
                className="h-4 w-4 text-red-600 focus:ring-red-600 border-gray-600 rounded"
              />
              <label htmlFor="notifyOnNewReviews" className="ml-2 block text-sm text-gray-300">
                Notify when new reviews are submitted
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifyOnNewUsers"
                name="notifyOnNewUsers"
                checked={emailSettings.notifyOnNewUsers}
                onChange={handleEmailSettingsChange}
                className="h-4 w-4 text-red-600 focus:ring-red-600 border-gray-600 rounded"
              />
              <label htmlFor="notifyOnNewUsers" className="ml-2 block text-sm text-gray-300">
                Notify when new users register
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifyOnReports"
                name="notifyOnReports"
                checked={emailSettings.notifyOnReports}
                onChange={handleEmailSettingsChange}
                className="h-4 w-4 text-red-600 focus:ring-red-600 border-gray-600 rounded"
              />
              <label htmlFor="notifyOnReports" className="ml-2 block text-sm text-gray-300">
                Notify when content is reported
              </label>
            </div>
          </div>
        </div>
        {/* Security Settings */}
        <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-md mb-6">
          <div className="p-4 border-b border-neutral-700 flex items-center">
            <Shield className="h-5 w-5 text-green-500 mr-2" />
            <h2 className="text-lg font-semibold text-white">Security Settings</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-400 mb-4">
              Security settings are managed through the main application configuration for enhanced protection.
              Please contact the system administrator to modify security parameters.
            </p>
            <div className="bg-neutral-700 rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Two-factor authentication</span>
                <span className="text-green-500 text-sm">Enabled</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Password policy</span>
                <span className="text-green-500 text-sm">Strong</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">API access control</span>
                <span className="text-green-500 text-sm">Restricted</span>
              </div>
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            <Save className="h-5 w-5 mr-2" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
import { useState } from 'react';
import { Settings, Save, Globe, Bell, Shield, Mail } from 'lucide-react';
import './AdminSettings.css';

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
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <h1 className="admin-settings-title">Admin Settings</h1>
      <form onSubmit={handleSubmit}>
        {/* General Settings */}
        <div className="admin-settings-form-section">
          <div className="admin-settings-section-header">
            <Globe style={{ color: '#3b82f6' }} />
            <h2 className="admin-settings-section-title">General Settings</h2>
          </div>
          <div className="admin-settings-section-content">
            <div>
              <label htmlFor="siteName" className="admin-settings-label">
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={generalSettings.siteName}
                onChange={handleGeneralSettingsChange}
                className="admin-settings-input"
              />
            </div>
            <div>
              <label htmlFor="siteDescription" className="admin-settings-label">
                Site Description
              </label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                value={generalSettings.siteDescription}
                onChange={handleGeneralSettingsChange}
                rows={3}
                className="admin-settings-textarea"
              ></textarea>
            </div>
            <div>
              <label htmlFor="maxReviewLength" className="admin-settings-label">
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
                className="admin-settings-input"
              />
            </div>
            <div className="admin-settings-checkbox-row">
              <input
                type="checkbox"
                id="allowGuestReviews"
                name="allowGuestReviews"
                checked={generalSettings.allowGuestReviews}
                onChange={handleGeneralSettingsChange}
                className="admin-settings-checkbox"
              />
              <label htmlFor="allowGuestReviews" className="admin-settings-checkbox-label">
                Allow guest reviews (without registration)
              </label>
            </div>
            <div className="admin-settings-checkbox-row">
              <input
                type="checkbox"
                id="requireEmailVerification"
                name="requireEmailVerification"
                checked={generalSettings.requireEmailVerification}
                onChange={handleGeneralSettingsChange}
                className="admin-settings-checkbox"
              />
              <label htmlFor="requireEmailVerification" className="admin-settings-checkbox-label">
                Require email verification for new users
              </label>
            </div>
            <div className="admin-settings-checkbox-row">
              <input
                type="checkbox"
                id="moderationEnabled"
                name="moderationEnabled"
                checked={generalSettings.moderationEnabled}
                onChange={handleGeneralSettingsChange}
                className="admin-settings-checkbox"
              />
              <label htmlFor="moderationEnabled" className="admin-settings-checkbox-label">
                Enable content moderation for reviews
              </label>
            </div>
          </div>
        </div>
        {/* Email Notification Settings */}
        <div className="admin-settings-form-section">
          <div className="admin-settings-section-header">
            <Bell style={{ color: '#facc15' }} />
            <h2 className="admin-settings-section-title">Email Notifications</h2>
          </div>
          <div className="admin-settings-section-content">
            <div>
              <label htmlFor="adminEmail" className="admin-settings-label">
                Admin Email Address
              </label>
              <div className="admin-settings-email-input-row">
                <span className="admin-settings-email-prefix">
                  <Mail style={{ width: '1rem', height: '1rem' }} />
                </span>
                <input
                  type="email"
                  id="adminEmail"
                  name="adminEmail"
                  value={emailSettings.adminEmail}
                  onChange={handleEmailSettingsChange}
                  className="admin-settings-email-input"
                />
              </div>
            </div>
            <div className="admin-settings-checkbox-row">
              <input
                type="checkbox"
                id="notifyOnNewReviews"
                name="notifyOnNewReviews"
                checked={emailSettings.notifyOnNewReviews}
                onChange={handleEmailSettingsChange}
                className="admin-settings-checkbox"
              />
              <label htmlFor="notifyOnNewReviews" className="admin-settings-checkbox-label">
                Notify when new reviews are submitted
              </label>
            </div>
            <div className="admin-settings-checkbox-row">
              <input
                type="checkbox"
                id="notifyOnNewUsers"
                name="notifyOnNewUsers"
                checked={emailSettings.notifyOnNewUsers}
                onChange={handleEmailSettingsChange}
                className="admin-settings-checkbox"
              />
              <label htmlFor="notifyOnNewUsers" className="admin-settings-checkbox-label">
                Notify when new users register
              </label>
            </div>
            <div className="admin-settings-checkbox-row">
              <input
                type="checkbox"
                id="notifyOnReports"
                name="notifyOnReports"
                checked={emailSettings.notifyOnReports}
                onChange={handleEmailSettingsChange}
                className="admin-settings-checkbox"
              />
              <label htmlFor="notifyOnReports" className="admin-settings-checkbox-label">
                Notify when content is reported
              </label>
            </div>
          </div>
        </div>
        {/* Security Settings */}
        <div className="admin-settings-form-section">
          <div className="admin-settings-section-header">
            <Shield style={{ color: '#22c55e' }} />
            <h2 className="admin-settings-section-title">Security Settings</h2>
          </div>
          <div className="admin-settings-section-content">
            <p className="admin-settings-security-info">
              Security settings are managed through the main application configuration for enhanced protection.
              Please contact the system administrator to modify security parameters.
            </p>
            <div className="admin-settings-security-box">
              <div className="admin-settings-security-row">
                <span className="admin-settings-security-label">Two-factor authentication</span>
                <span className="admin-settings-security-value">Enabled</span>
              </div>
              <div className="admin-settings-security-row">
                <span className="admin-settings-security-label">Password policy</span>
                <span className="admin-settings-security-value">Strong</span>
              </div>
              <div className="admin-settings-security-row" style={{ marginBottom: 0 }}>
                <span className="admin-settings-security-label">API access control</span>
                <span className="admin-settings-security-value">Restricted</span>
              </div>
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="admin-settings-submit-row">
          <button
            type="submit"
            className="admin-settings-submit-btn"
          >
            <Save style={{ width: '1.25rem', height: '1.25rem' }} />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
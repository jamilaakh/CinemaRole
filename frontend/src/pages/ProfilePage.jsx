import React, { useState } from 'react';
import { Camera, User, Mail, Lock, Eye, EyeOff, Save } from 'lucide-react';

const ProfilePage = ({ user, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPersonalInfo, setShowPersonalInfo] = useState(user.showPersonalInfo);
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }
    if (newPassword && !currentPassword) {
      setPasswordError("Please enter your current password");
      return;
    }
    setPasswordError('');
    onUpdateUser({
      ...user,
      name,
      email,
      avatar: avatarPreview,
      showPersonalInfo,
    });
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const togglePrivacy = () => {
    setShowPersonalInfo(!showPersonalInfo);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile Management</h1>
      {successMessage && (
        <div className="profile-success">
          <Save className="h-5 w-5" style={{ marginRight: '0.5rem' }} />
          {successMessage}
        </div>
      )}
      <div className="profile-card">
        {/* Avatar section */}
        <div className="profile-avatar-section">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              {avatarPreview ? (
                <img 
                  src={avatarPreview} 
                  alt="Profile" 
                  className="profile-avatar-img"
                />
              ) : (
                <User className="h-16 w-16" style={{ color: '#9ca3af' }} />
              )}
            </div>
            <label htmlFor="avatar-upload" className="profile-avatar-upload">
              <Camera className="h-4 w-4" />
              <input 
                id="avatar-upload" 
                type="file" 
                accept="image/*" 
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <div className="profile-user-info">
            <h2 className="profile-user-name">{name}</h2>
            <p className="profile-user-email">{email}</p>
            <p className="profile-user-role">
              Role: <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{user.role}</span>
            </p>
            <div>
              <button
                onClick={togglePrivacy}
                className="profile-privacy-btn"
              >
                {showPersonalInfo ? (
                  <>
                    <EyeOff className="h-4 w-4" style={{ marginRight: '0.25rem' }} />
                    Hide personal information
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" style={{ marginRight: '0.25rem' }} />
                    Show personal information
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Profile form */}
        <form onSubmit={handleProfileUpdate} className="profile-form">
          <div className="profile-form-group">
            {/* Personal information section */}
            <div>
              <h3 className="profile-section-title">Personal Information</h3>
              <div className="profile-form-group">
                <div>
                  <label htmlFor="name" className="profile-label">
                    Name
                  </label>
                  <div className="profile-input-wrapper">
                    <div className="profile-input-icon">
                      <User className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="profile-input"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="profile-label">
                    Email
                  </label>
                  <div className="profile-input-wrapper">
                    <div className="profile-input-icon">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="profile-input"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Password section */}
            <div>
              <h3 className="profile-section-title">Change Password</h3>
              {passwordError && (
                <div className="profile-error">
                  {passwordError}
                </div>
              )}
              <div className="profile-form-group">
                <div>
                  <label htmlFor="current-password" className="profile-label">
                    Current Password
                  </label>
                  <div className="profile-input-wrapper">
                    <div className="profile-input-icon">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                      type="password"
                      id="current-password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="profile-input"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="new-password" className="profile-label">
                    New Password
                  </label>
                  <div className="profile-input-wrapper">
                    <div className="profile-input-icon">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                      type="password"
                      id="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="profile-input"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="profile-label">
                    Confirm New Password
                  </label>
                  <div className="profile-input-wrapper">
                    <div className="profile-input-icon">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                      type="password"
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="profile-input"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Privacy settings */}
            <div>
              <h3 className="profile-section-title">Privacy Settings</h3>
              <div className="profile-checkbox-row">
                <input
                  type="checkbox"
                  id="show-personal-info"
                  checked={showPersonalInfo}
                  onChange={() => setShowPersonalInfo(!showPersonalInfo)}
                  className="profile-checkbox"
                />
                <label htmlFor="show-personal-info" className="profile-checkbox-label">
                  Show my personal information to other users
                </label>
              </div>
            </div>
            {/* Submit button */}
            <div className="profile-form-actions">
              <button
                type="submit"
                className="profile-save-btn"
              >
                <Save className="h-4 w-4" style={{ marginRight: '0.5rem' }} />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
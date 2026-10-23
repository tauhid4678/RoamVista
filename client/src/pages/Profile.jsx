import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, Camera, CheckCircle, Shield, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Card, Input, Textarea, Button, Badge, Modal } from '../components/common';
import api from '../services/api';

export const Profile = () => {
  const { user, isAdmin, updateUserSession } = useAuth();
  const toast = useToast();

  const [name, setName] = useState(user?.name || 'Elena Rostova');
  const [email] = useState(user?.email || 'traveler@roamvista.com');
  const [phone, setPhone] = useState(user?.phone || '+1 (415) 890-2341');
  const [bio, setBio] = useState(
    user?.bio ||
      'Passionate alpine trekker and documentary photographer with a passion for South American glaciers and Japanese mountain culture.'
  );
  const [avatar, setAvatar] = useState(
    user?.avatar ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  );

  // Photo modal state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [tempAvatarUrl, setTempAvatarUrl] = useState('');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.name) setName(user.name);
      if (user.phone) setPhone(user.phone);
      if (user.bio) setBio(user.bio);
      if (user.avatar) setAvatar(user.avatar);
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    try {
      const res = await api.put('/auth/profile', {
        name,
        phone,
        bio,
        avatar,
      });

      if (res.data?.user) {
        updateUserSession(res.data.user);
      } else if (res.data?.data) {
        updateUserSession(res.data.data);
      } else {
        updateUserSession({ name, phone, bio, avatar });
      }

      toast.success('Profile details updated in database successfully.');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update profile. Please try again.';
      toast.error(msg);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error('Current password is required.');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match.');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await api.put('/auth/change-password', {
        currentPassword,
        newPassword,
      });

      toast.success('Your password has been changed securely in the database.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      const msg = err.response?.data?.message || 'Password update failed. Verify your current password.';
      toast.error(msg);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSaveAvatar = () => {
    if (tempAvatarUrl.trim()) {
      setAvatar(tempAvatarUrl.trim());
      toast.success('Profile image URL updated. Click "Save Profile Changes" to persist.');
    }
    setIsPhotoModalOpen(false);
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-1">
        <Badge variant={isAdmin ? 'secondary' : 'primary'} size="sm">
          {isAdmin ? 'Administrator Account' : 'Verified Member'}
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-sand-900 dark:text-sand-50">
          Account Profile & Security
        </h1>
        <p className="text-xs text-sand-500">
          Manage your personal details, concierge notifications, and security credentials.
        </p>
      </div>

      {/* Profile Card */}
      <Card padding="p-6 sm:p-8">
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-sand-200/80 dark:border-darkSurface-700/80">
            <div className="relative group">
              <img
                src={avatar}
                alt={name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-primary-500/20"
              />
              <button
                type="button"
                onClick={() => {
                  setTempAvatarUrl(avatar);
                  setIsPhotoModalOpen(true);
                }}
                aria-label="Change profile photo"
                className="absolute inset-0 bg-neutral-900/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-1 text-center sm:text-left flex-1">
              <h2 className="text-lg font-bold text-sand-900 dark:text-sand-50">{name}</h2>
              <p className="text-xs text-sand-500">{email}</p>
              <div className="pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTempAvatarUrl(avatar);
                    setIsPhotoModalOpen(true);
                  }}
                  icon={<ImageIcon className="w-3.5 h-3.5" />}
                >
                  Change Profile Photo
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="prof-name"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User className="w-4 h-4" />}
              required
            />

            <Input
              id="prof-email"
              type="email"
              label="Email Address (Locked)"
              value={email}
              disabled
              icon={<Mail className="w-4 h-4" />}
            />

            <Input
              id="prof-phone"
              label="Direct Telephone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              icon={<Phone className="w-4 h-4" />}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-sand-800 dark:text-sand-200">
                Expedition Role
              </label>
              <div className="p-2.5 rounded-xl border border-sand-300 dark:border-darkSurface-700 bg-sand-100/50 dark:bg-darkSurface-900 text-xs font-medium text-sand-700 dark:text-sand-300">
                {isAdmin ? 'Platform Administrator' : 'Verified Expedition Traveler'}
              </div>
            </div>
          </div>

          <Textarea
            id="prof-bio"
            label="Traveler Bio & Adventure Interests"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isUpdatingProfile}
              disabled={isUpdatingProfile}
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Password Update Card */}
      <Card padding="p-6 sm:p-8">
        <div className="pb-4 border-b border-sand-200/80 dark:border-darkSurface-700/80 space-y-1">
          <h2 className="text-base font-bold text-sand-900 dark:text-sand-50 flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary-600" />
            <span>Update Account Password</span>
          </h2>
          <p className="text-xs text-sand-500">Ensure your account uses an encrypted, high-entropy password.</p>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-4 mt-4">
          <Input
            id="curr-pass"
            type="password"
            label="Current Password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="new-pass"
              type="password"
              label="New Password (min 8 chars)"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <Input
              id="confirm-new-pass"
              type="password"
              label="Confirm New Password"
              placeholder="••••••••"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="outline"
              size="md"
              isLoading={isUpdatingPassword}
              disabled={isUpdatingPassword}
            >
              Change Password
            </Button>
          </div>
        </form>
      </Card>

      {/* Profile Photo Modal with Live Preview and Quick Presets */}
      <Modal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        title="Update Profile Photo"
        description="Provide a direct image URL or choose from curated expedition avatars."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-center p-4 bg-sand-100/60 dark:bg-darkSurface-900 rounded-2xl">
            <img
              src={tempAvatarUrl || avatar}
              alt="Avatar Preview"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-primary-500/30"
              onError={(e) => {
                e.target.src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
              }}
            />
          </div>

          <Input
            id="avatar-url-input"
            label="Direct Image URL"
            placeholder="https://images.unsplash.com/..."
            value={tempAvatarUrl}
            onChange={(e) => setTempAvatarUrl(e.target.value)}
          />

          <div>
            <label className="text-xs font-semibold text-sand-800 dark:text-sand-200 block mb-2">
              Or Select a Preset Avatar:
            </label>
            <div className="flex items-center gap-3">
              {sampleAvatars.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTempAvatarUrl(url)}
                  className={`w-11 h-11 rounded-full overflow-hidden border-2 transition-transform hover:scale-110 ${
                    tempAvatarUrl === url ? 'border-primary-500 scale-105 ring-2 ring-primary-500/30' : 'border-transparent'
                  }`}
                >
                  <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-sand-200/80 dark:border-darkSurface-700/80">
            <Button variant="outline" size="sm" onClick={() => setIsPhotoModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveAvatar}>
              Select Avatar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;

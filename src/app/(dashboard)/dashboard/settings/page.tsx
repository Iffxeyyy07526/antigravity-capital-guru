'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema, changePasswordSchema, type ProfileFormData, type ChangePasswordFormData } from '@/lib/validations'
import { useAuthStore } from '@/stores/auth-store'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const { profile, fetchProfile } = useAuthStore()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Profile form
  const { register: regProfile, handleSubmit: handleProfile, formState: { errors: profileErrors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { full_name: profile?.full_name || '', phone: profile?.phone || '' },
  })

  const onUpdateProfile = async (data: ProfileFormData) => {
    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: data.full_name, phone: data.phone, updated_at: new Date().toISOString() })
      .eq('id', profile?.id)

    if (error) {
      toast.error('Failed to update profile.')
    } else {
      toast.success('Profile updated!')
      fetchProfile()
    }
  }

  // Password form
  const { register: regPassword, handleSubmit: handlePassword, formState: { errors: passwordErrors }, reset: resetPassword } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  })

  const onChangePassword = async (data: ChangePasswordFormData) => {
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: data.new_password })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Password updated!')
      resetPassword()
    }
  }

  const handleDeleteAccount = async () => {
    toast.error('Please contact support@thecapitalguru.net to delete your account.')
    setShowDeleteModal(false)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="font-display font-bold text-2xl text-on-surface">Settings</h1>

      {/* Profile Section */}
      <div className="bg-surface border border-primary/10 rounded-xl p-6">
        <h2 className="font-display font-semibold text-lg text-on-surface mb-5">Update Profile</h2>
        <form onSubmit={handleProfile(onUpdateProfile)} className="space-y-4">
          <div>
            <label className="form-label">Full Name</label>
            <input type="text" {...regProfile('full_name')} className="form-input" />
            {profileErrors.full_name && <p className="text-red-400 text-xs mt-1">{profileErrors.full_name.message}</p>}
          </div>
          <div>
            <label className="form-label">Phone</label>
            <input type="tel" {...regProfile('phone')} className="form-input" placeholder="+91 9876543210" />
          </div>
          <button type="submit" className="btn-primary px-6 py-2.5 text-sm">Save Changes</button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-surface border border-primary/10 rounded-xl p-6">
        <h2 className="font-display font-semibold text-lg text-on-surface mb-5">Change Password</h2>
        <form onSubmit={handlePassword(onChangePassword)} className="space-y-4">
          <div>
            <label className="form-label">New Password</label>
            <input type="password" {...regPassword('new_password')} className="form-input" placeholder="Min 8 chars, 1 uppercase, 1 number" />
            {passwordErrors.new_password && <p className="text-red-400 text-xs mt-1">{passwordErrors.new_password.message}</p>}
          </div>
          <div>
            <label className="form-label">Confirm New Password</label>
            <input type="password" {...regPassword('confirm_password')} className="form-input" />
            {passwordErrors.confirm_password && <p className="text-red-400 text-xs mt-1">{passwordErrors.confirm_password.message}</p>}
          </div>
          <button type="submit" className="btn-primary px-6 py-2.5 text-sm">Update Password</button>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="bg-surface border border-red-500/30 rounded-xl p-6">
        <h2 className="font-display font-semibold text-lg text-on-surface mb-2">Danger Zone</h2>
        <p className="text-on-surface/55 text-sm mb-4 font-body">
          Once you delete your account, there is no going back. All your data will be permanently removed.
        </p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-500/10 text-red-400 font-semibold text-sm px-5 py-2.5 rounded-full border border-red-500/30 hover:bg-red-500/20 transition-colors cursor-pointer"
        >
          Delete Account
        </button>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface border border-red-500/30 rounded-2xl p-8 max-w-md w-full">
            <h3 className="font-display font-bold text-xl text-on-surface mb-3">Delete Account?</h3>
            <p className="text-on-surface/60 text-sm mb-6">
              This action is irreversible. All your data, subscriptions, and payment records will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="btn-ghost flex-1 py-2.5 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-500 text-white font-bold text-sm py-2.5 rounded-full hover:bg-red-600 transition-colors cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

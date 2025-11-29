'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserProfile {
    id: string;
    email: string;
    name: string;
    preferred_reciter_id?: string;
    language: string;
    timezone: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }

        fetchProfile(token);
    }, [router]);

    const fetchProfile = async (token: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }

            const data = await response.json();
            setProfile(data.user);
            setName(data.user.name);
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            setProfile(data.user);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-green-900">🕌 Quran Memorization</h1>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                            Dashboard
                        </Button>
                        <Button variant="outline" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h2>

                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={profile?.email || ''}
                                disabled
                                className="mt-1 bg-gray-100"
                            />
                            <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                        </div>

                        <div>
                            <Label htmlFor="language">Language</Label>
                            <select
                                id="language"
                                className="mt-1 w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                                value={profile?.language || 'en'}
                                disabled
                            >
                                <option value="en">English</option>
                                <option value="ar">Arabic</option>
                                <option value="ur">Urdu</option>
                            </select>
                            <p className="text-sm text-gray-500 mt-1">Language settings coming soon</p>
                        </div>

                        <div className="pt-4">
                            <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
                                {saving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
                        <div className="space-y-3">
                            <Button variant="outline" className="w-full sm:w-auto">
                                Change Password
                            </Button>
                            <Button variant="destructive" className="w-full sm:w-auto ml-0 sm:ml-3">
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

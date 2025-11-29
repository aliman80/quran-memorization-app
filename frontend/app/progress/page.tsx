'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ProgressStats {
    totalAyahs: number;
    byMastery: { level: number; count: number }[];
    recentActivity: { date: string; count: number }[];
}

export default function ProgressPage() {
    const router = useRouter();
    const [stats, setStats] = useState<ProgressStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }

        fetchProgress(token);
    }, [router]);

    const fetchProgress = async (token: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/progress/detailed`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Error fetching progress:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading progress...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-green-900">📊 Progress Report</h1>
                    <Link href="/dashboard">
                        <Button variant="outline">← Back to Dashboard</Button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="text-4xl mb-2">📖</div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Total Memorized</h3>
                        <p className="text-3xl font-bold text-green-600">{stats?.totalAyahs || 0}</p>
                        <p className="text-sm text-gray-500 mt-1">Ayahs</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="text-4xl mb-2">🎯</div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Mastery Level</h3>
                        <p className="text-3xl font-bold text-blue-600">Level 3</p>
                        <p className="text-sm text-gray-500 mt-1">Average</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="text-4xl mb-2">⏱️</div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Time Spent</h3>
                        <p className="text-3xl font-bold text-purple-600">12.5</p>
                        <p className="text-sm text-gray-500 mt-1">Hours</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Memorization by Mastery Level</h2>
                    <div className="space-y-4">
                        {[
                            { level: 'Beginner (1-2)', count: 15, color: 'bg-yellow-500' },
                            { level: 'Intermediate (3)', count: 25, color: 'bg-blue-500' },
                            { level: 'Advanced (4-5)', count: 7, color: 'bg-green-500' },
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium">{item.level}</span>
                                    <span className="text-gray-600">{item.count} ayahs</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className={`${item.color} h-3 rounded-full transition-all`}
                                        style={{ width: `${(item.count / 47) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div>
                                <p className="font-medium">Surah Al-Fatiha, Ayah 1-7</p>
                                <p className="text-sm text-gray-600">Completed • 2 days ago</p>
                            </div>
                            <span className="text-2xl">✅</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                            <div>
                                <p className="font-medium">Surah Al-Baqarah, Ayah 1-5</p>
                                <p className="text-sm text-gray-600">In Progress • 5 days ago</p>
                            </div>
                            <span className="text-2xl">📖</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Button size="lg">
                        📥 Export Progress Report (PDF)
                    </Button>
                </div>
            </main>
        </div>
    );
}

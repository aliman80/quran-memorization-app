'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, Target, Flame, TrendingUp, Calendar, Headphones, Award, Clock } from 'lucide-react';

interface DashboardStats {
    dailyGoal: { completed: number; total: number };
    streak: number;
    totalAyahs: number;
    reviewQueue: number;
}

export default function DashboardPage() {
    const router = useRouter();
    const [stats, setStats] = useState<DashboardStats>({
        dailyGoal: { completed: 0, total: 5 },
        streak: 0,
        totalAyahs: 0,
        reviewQueue: 0,
    });
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }

        fetchDashboardData(token);
        fetchUserProfile(token);
    }, [router]);

    const fetchDashboardData = async (token: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/progress/dashboard`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dashboard data');
            }

            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserProfile = async (token: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserName(data.user.name.split(' ')[0]);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-700 font-medium">Loading your journey...</p>
                </div>
            </div>
        );
    }

    const progressPercentage = (stats.dailyGoal.completed / stats.dailyGoal.total) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-purple-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl">
                                🕌
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Quran Memorization
                            </h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/profile">
                                <Button variant="ghost" className="hover:bg-purple-100">Profile</Button>
                            </Link>
                            <Button variant="outline" onClick={handleLogout} className="border-purple-200 hover:bg-purple-50">
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-4xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                            As-salamu alaykum{userName ? `, ${userName}` : ''}! 🌙
                        </span>
                    </h2>
                    <p className="text-gray-600 text-lg">Continue your blessed journey of memorizing the Holy Quran</p>
                </div>

                {/* Stats Cards - Colorful Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Daily Goal Card */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                        <div className="relative">
                            <Target className="w-8 h-8 text-white/90 mb-3" />
                            <h3 className="text-white/90 text-sm font-medium mb-2">Daily Goal</h3>
                            <p className="text-3xl font-bold text-white mb-3">
                                {stats.dailyGoal.completed}/{stats.dailyGoal.total}
                            </p>
                            <div className="w-full bg-white/20 rounded-full h-2">
                                <div
                                    className="bg-white h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Streak Card */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                        <div className="relative">
                            <Flame className="w-8 h-8 text-white/90 mb-3" />
                            <h3 className="text-white/90 text-sm font-medium mb-2">Current Streak</h3>
                            <p className="text-3xl font-bold text-white mb-1">
                                {stats.streak}
                            </p>
                            <p className="text-white/80 text-sm">Days in a row</p>
                        </div>
                    </div>

                    {/* Total Ayahs Card */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                        <div className="relative">
                            <BookOpen className="w-8 h-8 text-white/90 mb-3" />
                            <h3 className="text-white/90 text-sm font-medium mb-2">Total Memorized</h3>
                            <p className="text-3xl font-bold text-white mb-1">
                                {stats.totalAyahs}
                            </p>
                            <p className="text-white/80 text-sm">Ayahs mastered</p>
                        </div>
                    </div>

                    {/* Review Queue Card */}
                    <div className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                        <div className="relative">
                            <Calendar className="w-8 h-8 text-white/90 mb-3" />
                            <h3 className="text-white/90 text-sm font-medium mb-2">Review Queue</h3>
                            <p className="text-3xl font-bold text-white mb-1">
                                {stats.reviewQueue}
                            </p>
                            <p className="text-white/80 text-sm">Due today</p>
                        </div>
                    </div>
                </div>

                {/* Main Action Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Start Memorizing Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100 hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                                <Headphones className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Start Memorizing</h3>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Choose from 114 surahs and begin your journey with world-class reciters. Listen, repeat, and master each ayah with confidence.
                        </p>
                        <Link href="/memorize">
                            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                                Browse Surahs →
                            </Button>
                        </Link>
                    </div>

                    {/* Progress Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Track Progress</h3>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            View detailed analytics, mastery levels, and your memorization timeline. Export reports and celebrate your achievements.
                        </p>
                        <Link href="/progress">
                            <Button variant="outline" className="w-full border-2 border-green-500 text-green-700 hover:bg-green-50 font-semibold py-6 text-lg transition-all">
                                View Analytics →
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Quick Stats Banner */}
                <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-2xl shadow-xl p-8 text-white mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <Award className="w-8 h-8 mx-auto mb-2 opacity-90" />
                            <p className="text-3xl font-bold mb-1">Level 3</p>
                            <p className="text-white/80 text-sm">Current Mastery</p>
                        </div>
                        <div className="text-center">
                            <Clock className="w-8 h-8 mx-auto mb-2 opacity-90" />
                            <p className="text-3xl font-bold mb-1">12.5h</p>
                            <p className="text-white/80 text-sm">Time Invested</p>
                        </div>
                        <div className="text-center">
                            <Target className="w-8 h-8 mx-auto mb-2 opacity-90" />
                            <p className="text-3xl font-bold mb-1">85%</p>
                            <p className="text-white/80 text-sm">Weekly Goal</p>
                        </div>
                    </div>
                </div>

                {/* Motivational Quote */}
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-purple-100 text-center">
                    <p className="text-2xl font-arabic text-gray-800 mb-3" dir="rtl">
                        إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ
                    </p>
                    <p className="text-gray-600 italic">
                        "Indeed, this Quran guides to that which is most suitable"
                    </p>
                    <p className="text-sm text-gray-500 mt-2">— Surah Al-Isra, 17:9</p>
                </div>
            </main>
        </div>
    );
}

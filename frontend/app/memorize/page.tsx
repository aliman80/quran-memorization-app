'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Surah {
    id: number;
    number: number;
    name: string;
    name_ar: string;
    name_transliteration: string;
    revelation_place: string;
    ayah_count: number;
}

export default function SurahListPage() {
    const router = useRouter();
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }

        fetchSurahs();
    }, [router]);

    const fetchSurahs = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/surahs`);
            const data = await response.json();
            setSurahs(data.surahs);
        } catch (error) {
            console.error('Error fetching surahs:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading Surahs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-green-900">🕌 Select Surah</h1>
                    <Link href="/dashboard">
                        <Button variant="outline">← Back to Dashboard</Button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose a Surah to Memorize</h2>
                    <p className="text-gray-600">Select any surah from the Holy Quran to begin your memorization journey</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {surahs.map((surah) => (
                        <Link key={surah.id} href={`/memorize/${surah.id}`}>
                            <div className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-300 cursor-pointer">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                                                {surah.number}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition-colors">
                                                    {surah.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">{surah.name_transliteration}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-2xl text-gray-400 group-hover:text-green-600 transition-colors">
                                        {surah.name_ar}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t">
                                    <span className="flex items-center gap-1">
                                        📖 {surah.ayah_count} Ayahs
                                    </span>
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                                        {surah.revelation_place}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}

'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Settings2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Ayah {
    id: number;
    ayah_number: number;
    text_ar: string;
    text_transliteration: string;
    text_translation_en: string;
}

interface Reciter {
    id: string;
    name: string;
    name_ar: string;
}

export default function MemorizePage() {
    const router = useRouter();
    const params = useParams();
    const surahId = params.surahId as string;

    const audioRef = useRef<HTMLAudioElement>(null);
    const [ayahs, setAyahs] = useState<Ayah[]>([]);
    const [reciters, setReciters] = useState<Reciter[]>([]);
    const [selectedReciter, setSelectedReciter] = useState<string>('');
    const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [loopMode, setLoopMode] = useState(false);
    const [showTranslation, setShowTranslation] = useState(true);
    const [showTransliteration, setShowTransliteration] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }

        fetchData();
    }, [surahId, router]);

    const fetchData = async () => {
        try {
            // Fetch ayahs
            const ayahsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/surahs/${surahId}/ayahs`);
            const ayahsData = await ayahsRes.json();
            setAyahs(ayahsData.ayahs);

            // Fetch reciters
            const recitersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reciters`);
            const recitersData = await recitersRes.json();
            setReciters(recitersData.reciters);

            if (recitersData.reciters.length > 0) {
                setSelectedReciter(recitersData.reciters[0].id);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            try {
                // Fetch audio URL from API
                const ayah = ayahs[currentAyahIndex];
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/audio/ayah/${ayah.id}/reciter/${selectedReciter}`
                );

                if (response.ok) {
                    const data = await response.json();
                    audio.src = data.audio.audio_url;
                    await audio.play();
                    setIsPlaying(true);
                } else {
                    console.error('Audio not found for this ayah');
                    alert('Audio not available for this ayah. Please try another surah or reciter.');
                }
            } catch (error) {
                console.error('Error playing audio:', error);
                alert('Failed to load audio. Please check your connection.');
            }
        }
    };

    const changeSpeed = (speed: number) => {
        if (audioRef.current) {
            audioRef.current.playbackRate = speed;
            setPlaybackSpeed(speed);
        }
    };

    const previousAyah = () => {
        if (currentAyahIndex > 0) {
            setCurrentAyahIndex(currentAyahIndex - 1);
            setIsPlaying(false);
        }
    };

    const nextAyah = () => {
        if (currentAyahIndex < ayahs.length - 1) {
            setCurrentAyahIndex(currentAyahIndex + 1);
            setIsPlaying(false);
        }
    };

    const markAsMemorized = async () => {
        try {
            const token = localStorage.getItem('token');
            const ayah = ayahs[currentAyahIndex];

            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/memorization/entries`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ayah_id: ayah.id,
                    mastery_level: 3,
                }),
            });

            alert('Marked as memorized! ✅');
            nextAyah();
        } catch (error) {
            console.error('Error marking as memorized:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (ayahs.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600">No ayahs found for this surah</p>
                    <Link href="/memorize">
                        <Button className="mt-4">← Back to Surah List</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const currentAyah = ayahs[currentAyahIndex];

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/memorize">
                            <Button variant="ghost">← Back</Button>
                        </Link>
                        <div className="text-center">
                            <h1 className="text-xl font-bold text-gray-900">
                                Ayah {currentAyah.ayah_number} of {ayahs.length}
                            </h1>
                        </div>
                        <Link href="/dashboard">
                            <Button variant="outline">Dashboard</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Reciter Selection */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Reciter
                    </label>
                    <select
                        value={selectedReciter}
                        onChange={(e) => setSelectedReciter(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        {reciters.map((reciter) => (
                            <option key={reciter.id} value={reciter.id}>
                                {reciter.name} ({reciter.name_ar})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Ayah Display */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                    <div className="text-center mb-8">
                        <p className="text-4xl md:text-5xl leading-loose text-gray-900 font-arabic mb-6" dir="rtl">
                            {currentAyah.text_ar}
                        </p>

                        {showTransliteration && (
                            <p className="text-xl text-gray-600 mb-4 italic">
                                {currentAyah.text_transliteration}
                            </p>
                        )}

                        {showTranslation && (
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {currentAyah.text_translation_en}
                            </p>
                        )}
                    </div>

                    {/* Display Options */}
                    <div className="flex flex-wrap gap-3 justify-center pt-6 border-t">
                        <Button
                            variant={showTransliteration ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowTransliteration(!showTransliteration)}
                        >
                            Transliteration
                        </Button>
                        <Button
                            variant={showTranslation ? "default" : "outline"}
                            size="sm"
                            onClick={() => setShowTranslation(!showTranslation)}
                        >
                            Translation
                        </Button>
                    </div>
                </div>

                {/* Audio Player */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Settings2 size={20} />
                        Audio Controls
                    </h3>

                    <audio ref={audioRef} />

                    {/* Playback Controls */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <Button
                            onClick={previousAyah}
                            disabled={currentAyahIndex === 0}
                            variant="outline"
                            size="icon"
                        >
                            <ChevronLeft />
                        </Button>

                        <Button
                            onClick={togglePlay}
                            size="lg"
                            className="w-16 h-16 rounded-full"
                        >
                            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                        </Button>

                        <Button
                            onClick={nextAyah}
                            disabled={currentAyahIndex === ayahs.length - 1}
                            variant="outline"
                            size="icon"
                        >
                            <ChevronRight />
                        </Button>
                    </div>

                    {/* Speed Control */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Playback Speed</label>
                        <div className="flex gap-2 justify-center">
                            {[0.75, 1, 1.25, 1.5].map((speed) => (
                                <Button
                                    key={speed}
                                    onClick={() => changeSpeed(speed)}
                                    variant={playbackSpeed === speed ? "default" : "outline"}
                                    size="sm"
                                >
                                    {speed}x
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Loop Mode */}
                    <div className="flex items-center justify-center">
                        <Button
                            onClick={() => setLoopMode(!loopMode)}
                            variant={loopMode ? "default" : "outline"}
                            size="sm"
                        >
                            <RotateCcw size={16} className="mr-2" />
                            Loop Mode {loopMode ? 'ON' : 'OFF'}
                        </Button>
                    </div>

                    <p className="text-sm text-gray-500 text-center mt-4">
                        ℹ️ Audio playback requires licensed recitation files
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={markAsMemorized} className="flex-1" size="lg">
                        ✅ Mark as Memorized
                    </Button>
                    <Button variant="outline" className="flex-1" size="lg">
                        🎤 Record Yourself
                    </Button>
                </div>
            </main>
        </div>
    );
}

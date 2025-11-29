import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="inline-block mb-4 px-4 py-2 bg-green-100 rounded-full">
                            <span className="text-green-800 font-semibold text-sm">🌙 Ramadan Ready</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            Master the Quran
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
                            Memorize with confidence using spaced repetition, world-class reciters, and AI-powered progress tracking
                        </p>

                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Join thousands of Muslims worldwide on their journey to memorize the Holy Quran
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link href="/auth/signup">
                                <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                                    Start Free Today →
                                </Button>
                            </Link>
                            <Link href="/auth/login">
                                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                                    Sign In
                                </Button>
                            </Link>
                        </div>

                        {/* Trust badges */}
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <span className="text-green-600">✓</span>
                                <span>100% Free</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-600">✓</span>
                                <span>No Ads</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Offline Mode</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-600">✓</span>
                                <span>Privacy First</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
                    Everything You Need to Succeed
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎧</div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">World-Class Reciters</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Listen to Mishary Alafasy, Abdul Rahman Al-Sudais, and other renowned reciters with crystal-clear audio quality
                        </p>
                    </div>

                    <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🧠</div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Smart Spaced Repetition</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Our AI-powered system schedules reviews at optimal times to maximize retention and minimize forgetting
                        </p>
                    </div>

                    <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎤</div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Record & Compare</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Practice your recitation, record yourself, and compare with professional reciters to perfect your tajweed
                        </p>
                    </div>

                    <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📊</div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Detailed Progress Tracking</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Monitor your journey with beautiful dashboards, streak tracking, and exportable progress reports
                        </p>
                    </div>

                    <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📱</div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Mobile & Web</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Seamlessly switch between your phone, tablet, and computer. Your progress syncs everywhere
                        </p>
                    </div>

                    <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🌙</div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Islamic Design</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Beautiful, respectful interface designed with Islamic principles and etiquette in mind
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Begin Your Journey Today
                    </h2>
                    <p className="text-xl text-green-50 mb-8">
                        Join our community and start memorizing the Quran with the best tools available
                    </p>
                    <Link href="/auth/signup">
                        <Button size="lg" variant="secondary" className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl">
                            Get Started Free →
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}

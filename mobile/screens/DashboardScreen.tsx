import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ navigation }: any) {
    const [stats, setStats] = useState({
        dailyGoal: { completed: 0, total: 5 },
        streak: 0,
        totalAyahs: 0,
        reviewQueue: 0,
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/progress/dashboard`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        navigation.replace('Login');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Welcome back! 🌙</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* Stats Cards */}
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statIcon}>🎯</Text>
                    <Text style={styles.statLabel}>Daily Goal</Text>
                    <Text style={styles.statValue}>
                        {stats.dailyGoal.completed}/{stats.dailyGoal.total}
                    </Text>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${(stats.dailyGoal.completed / stats.dailyGoal.total) * 100}%` },
                            ]}
                        />
                    </View>
                </View>

                <View style={styles.statCard}>
                    <Text style={styles.statIcon}>🔥</Text>
                    <Text style={styles.statLabel}>Streak</Text>
                    <Text style={styles.statValue}>{stats.streak} Days</Text>
                </View>

                <View style={styles.statCard}>
                    <Text style={styles.statIcon}>📊</Text>
                    <Text style={styles.statLabel}>Total</Text>
                    <Text style={styles.statValue}>{stats.totalAyahs} Ayahs</Text>
                </View>
            </View>

            {/* Review Queue */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    📅 Review Queue ({stats.reviewQueue} due today)
                </Text>
                <TouchableOpacity style={styles.reviewCard}>
                    <View>
                        <Text style={styles.reviewTitle}>Surah Al-Baqarah, Ayah 1-3</Text>
                        <Text style={styles.reviewSubtitle}>Due: Today</Text>
                    </View>
                    <Text style={styles.arrow}>→</Text>
                </TouchableOpacity>
            </View>

            {/* Continue Memorizing */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>🎧 Continue Memorizing</Text>
                <View style={styles.continueCard}>
                    <Text style={styles.continueTitle}>Surah Al-Kahf</Text>
                    <View style={styles.progressContainer}>
                        <Text style={styles.progressText}>Progress: 65%</Text>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '65%' }]} />
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() => navigation.navigate('Memorize', { surahId: 18 })}
                    >
                        <Text style={styles.continueButtonText}>Continue →</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.newButton}>
                    <Text style={styles.newButtonText}>+ Start New Surah</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    logoutText: {
        color: '#16a34a',
        fontSize: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    statIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#16a34a',
    },
    progressBar: {
        width: '100%',
        height: 4,
        backgroundColor: '#e5e7eb',
        borderRadius: 2,
        marginTop: 8,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#16a34a',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#1f2937',
    },
    reviewCard: {
        backgroundColor: '#dcfce7',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
    },
    reviewSubtitle: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
    },
    arrow: {
        fontSize: 24,
        color: '#16a34a',
    },
    continueCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    continueTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    progressContainer: {
        marginBottom: 16,
    },
    progressText: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 8,
    },
    continueButton: {
        backgroundColor: '#16a34a',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    continueButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    newButton: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginTop: 12,
        backgroundColor: 'white',
    },
    newButtonText: {
        color: '#16a34a',
        fontSize: 16,
        fontWeight: '600',
    },
});

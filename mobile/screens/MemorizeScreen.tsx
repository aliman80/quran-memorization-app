import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MemorizeScreen({ route }: any) {
    const { surahId } = route.params || {};

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Memorization Session</Text>
            <Text style={styles.subtitle}>Surah ID: {surahId}</Text>
            <Text style={styles.note}>
                Audio player and memorization features will be implemented here
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9fafb',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#6b7280',
        marginBottom: 20,
    },
    note: {
        fontSize: 14,
        color: '#9ca3af',
        textAlign: 'center',
    },
});

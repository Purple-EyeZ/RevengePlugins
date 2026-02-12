import { findByProps } from '@revenge-mod/metro'
import { ReactNative } from '@revenge-mod/metro/common'
import { LOGO_URL } from '../index'

const { View, Text, Image, StyleSheet } = ReactNative

const LinearGradient = findByProps('LinearGradient')?.default

const Colors = {
    primary: '#E146C6',
    secondary: '#14acc0',
    white: '#ffffff',
    lightGray: '#aaaaaa',
}

interface CountdownToastProps {
    days: number
}

const styles = StyleSheet.create({
    gradientBorder: {
        borderRadius: 8,
        padding: 1,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000000e6',
        borderRadius: 7,
        padding: 8,
        minWidth: 200,
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    separator: {
        width: 1,
        height: '80%',
        backgroundColor: Colors.secondary,
        marginHorizontal: 10,
        opacity: 0.6,
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    headerText: {
        color: Colors.white,
        fontSize: 10,
        fontWeight: 'bold',
        opacity: 0.8,
        letterSpacing: 1,
    },
    countdownRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    daysText: {
        color: Colors.primary,
        fontSize: 22,
        fontWeight: '900',
        textShadowColor: 'rgba(255, 0, 255, 0.7)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 12,
        marginRight: 4,
    },
    subText: {
        color: Colors.secondary,
        fontSize: 14,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 213, 255, 0.7)',
        textShadowRadius: 10,
    },
    footerText: {
        color: Colors.lightGray,
        fontSize: 9,
    },
})

export default function CountdownToast({ days }: CountdownToastProps) {
    if (!LinearGradient) return null

    return (
        <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.gradientBorder}
        >
            <View style={styles.container}>
                <Image source={{ uri: LOGO_URL }} style={styles.logo} />

                <View style={styles.separator} />

                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>GRAND THEFT AUTO VI</Text>

                    <View style={styles.countdownRow}>
                        <Text style={styles.daysText}>{days}</Text>
                        <Text style={styles.subText}>DAYS LEFT</Text>
                    </View>

                    <Text style={styles.footerText}>Coming 19th Nov 2026</Text>
                </View>
            </View>
        </LinearGradient>
    )
}

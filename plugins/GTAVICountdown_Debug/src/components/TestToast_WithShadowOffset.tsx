import { ReactNative } from '@revenge-mod/metro/common'
import { LOGO_URL } from '../index'

const { View, Text, Image, StyleSheet } = ReactNative
const Colors = { primary: '#E146C6', secondary: '#14acc0', white: '#ffffff', lightGray: '#aaaaaa' }

const styles = StyleSheet.create({
    fakeBorder: { borderRadius: 8, padding: 1, backgroundColor: Colors.primary },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000000e6',
        borderRadius: 7,
        padding: 8,
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
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    headerText: {
        color: Colors.white,
        fontSize: 10,
        fontWeight: 'bold',
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
    footerText: { color: Colors.lightGray, fontSize: 9 },
})

export const ToastTest_ShadowOffset = ({ days }: { days: number }) => (
    <View style={styles.fakeBorder}>
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
    </View>
)

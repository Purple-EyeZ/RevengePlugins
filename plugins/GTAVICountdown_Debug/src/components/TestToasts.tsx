import { ReactNative } from '@revenge-mod/metro/common'
import { LOGO_URL } from '../index'

const { View, Text, Image } = ReactNative

// V0: BASE (Fallback Border)
export const ToastV0_Base = ({ days }: { days: number }) => (
    <View style={{ borderRadius: 8, padding: 1, backgroundColor: '#E146C6' }}>
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#000000e6',
                borderRadius: 7,
                padding: 8,
            }}
        >
            <Image source={{ uri: LOGO_URL }} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
            <View style={{ width: 1, height: '80%', backgroundColor: '#14acc0', marginHorizontal: 10 }} />
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff', fontSize: 10, fontWeight: 'bold' }}>GRAND THEFT AUTO VI</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
                    <Text
                        style={{
                            color: '#E146C6',
                            fontSize: 22,
                            fontWeight: '900',
                            textShadowColor: 'rgba(255, 0, 255, 0.7)',
                            textShadowRadius: 12,
                            marginRight: 4,
                        }}
                    >
                        {days}
                    </Text>
                    <Text
                        style={{
                            color: '#14acc0',
                            fontSize: 14,
                            fontWeight: 'bold',
                            textShadowColor: 'rgba(0, 213, 255, 0.7)',
                            textShadowRadius: 10,
                        }}
                    >
                        DAYS LEFT
                    </Text>
                </View>
                <Text style={{ color: '#aaaaaa', fontSize: 9 }}>Coming 19th Nov 2026</Text>
            </View>
        </View>
    </View>
)

// V1: NO IMAGE
export const ToastV1_NoImage = ({ days }: { days: number }) => (
    <View style={{ borderRadius: 8, padding: 1, backgroundColor: '#E146C6' }}>
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#000000e6',
                borderRadius: 7,
                padding: 8,
            }}
        >
            <View style={{ width: 1, height: '80%', backgroundColor: '#14acc0', marginHorizontal: 10 }} />
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff', fontSize: 10, fontWeight: 'bold' }}>GRAND THEFT AUTO VI</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
                    <Text
                        style={{
                            color: '#E146C6',
                            fontSize: 22,
                            fontWeight: '900',
                            textShadowColor: 'rgba(255, 0, 255, 0.7)',
                            textShadowRadius: 12,
                            marginRight: 4,
                        }}
                    >
                        {days}
                    </Text>
                    <Text
                        style={{
                            color: '#14acc0',
                            fontSize: 14,
                            fontWeight: 'bold',
                            textShadowColor: 'rgba(0, 213, 255, 0.7)',
                            textShadowRadius: 10,
                        }}
                    >
                        DAYS LEFT
                    </Text>
                </View>
                <Text style={{ color: '#aaaaaa', fontSize: 9 }}>Coming 19th Nov 2026</Text>
            </View>
        </View>
    </View>
)

// --- V2: NO HEX8 (Opacity Color) ---
export const ToastV2_NoHex8 = ({ days }: { days: number }) => (
    <View style={{ borderRadius: 8, padding: 1, backgroundColor: '#E146C6' }}>
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.9)',
                borderRadius: 7,
                padding: 8,
            }}
        >
            <View style={{ width: 1, height: '80%', backgroundColor: '#14acc0', marginHorizontal: 10 }} />
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff', fontSize: 10, fontWeight: 'bold' }}>GRAND THEFT AUTO VI</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
                    <Text
                        style={{
                            color: '#E146C6',
                            fontSize: 22,
                            fontWeight: '900',
                            textShadowColor: 'rgba(255, 0, 255, 0.7)',
                            textShadowRadius: 12,
                            marginRight: 4,
                        }}
                    >
                        {days}
                    </Text>
                    <Text
                        style={{
                            color: '#14acc0',
                            fontSize: 14,
                            fontWeight: 'bold',
                            textShadowColor: 'rgba(0, 213, 255, 0.7)',
                            textShadowRadius: 10,
                        }}
                    >
                        DAYS LEFT
                    </Text>
                </View>
                <Text style={{ color: '#aaaaaa', fontSize: 9 }}>Coming 19th Nov 2026</Text>
            </View>
        </View>
    </View>
)

// --- V3: NO SHADOWS ---
export const ToastV3_NoShadows = ({ days }: { days: number }) => (
    <View style={{ borderRadius: 8, padding: 1, backgroundColor: '#E146C6' }}>
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.9)',
                borderRadius: 7,
                padding: 8,
            }}
        >
            <View style={{ width: 1, height: '80%', backgroundColor: '#14acc0', marginHorizontal: 10 }} />
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff', fontSize: 10, fontWeight: 'bold' }}>GRAND THEFT AUTO VI</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
                    <Text style={{ color: '#E146C6', fontSize: 22, fontWeight: '900', marginRight: 4 }}>{days}</Text>
                    <Text style={{ color: '#14acc0', fontSize: 14, fontWeight: 'bold' }}>DAYS LEFT</Text>
                </View>
                <Text style={{ color: '#aaaaaa', fontSize: 9 }}>Coming 19th Nov 2026</Text>
            </View>
        </View>
    </View>
)

// --- V4: NO FLEX ---
// Stack the views instead of using flexDirection: 'row'
export const ToastV4_NoFlex = ({ days }: { days: number }) => (
    <View style={{ borderRadius: 8, padding: 1, backgroundColor: '#E146C6' }}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.9)', borderRadius: 7, padding: 8 }}>
            <Text style={{ color: '#ffffff', fontSize: 10, fontWeight: 'bold' }}>GRAND THEFT AUTO VI</Text>
            <Text style={{ color: '#E146C6', fontSize: 22, fontWeight: '900', marginVertical: 4 }}>
                {days} DAYS LEFT
            </Text>
            <Text style={{ color: '#aaaaaa', fontSize: 9 }}>Coming 19th Nov 2026</Text>
        </View>
    </View>
)

// --- V5: BASIC LAYOUT WITHOUT CONTAINER ---
export const ToastV5_BasicBorder = ({ days }: { days: number }) => (
    <View
        style={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            borderRadius: 7,
            padding: 12,
            borderWidth: 1,
            borderColor: '#E146C6',
        }}
    >
        <Text style={{ color: '#ffffff', fontSize: 12, fontWeight: 'bold' }}>GRAND THEFT AUTO VI</Text>
        <Text style={{ color: '#E146C6', fontSize: 20, fontWeight: 'bold', marginTop: 4 }}>{days} DAYS LEFT</Text>
    </View>
)

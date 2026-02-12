import { findByProps } from '@revenge-mod/metro'
import { FluxDispatcher, ReactNative } from '@revenge-mod/metro/common'
import { storage } from '@vendetta/plugin'
import CountdownToast from './components/CountdownToast'
import Settings from './Settings'

const { Image } = ReactNative as any
const Toasts = findByProps('open', 'close')
const UuidModule = findByProps('uuid4')
const ConnectionStore = findByProps('isConnected', 'isDisconnected')

const TARGET_DATE = new Date('2026-11-19T00:00:00')

export const LOGO_URL = 'https://i.imgur.com/x91idXI.png'
export const IMAGE_URL = 'https://i.imgur.com/M5K8i6m.jpeg'
export const ROCKSTAR_VI_URL = 'https://www.rockstargames.com/VI'

const DEFAULT_DURATION = 3
const DEFAULT_FREQUENCY = 'daily'
const ONE_HOUR = 60 * 60 * 1000
const ONE_DAY = 24 * ONE_HOUR

storage.displayDuration ??= DEFAULT_DURATION
storage.frequency ??= DEFAULT_FREQUENCY

export const FREQUENCIES = [
    { label: 'Always on Startup', value: 'startup', description: 'Shows every time you open the app.' },
    { label: 'Every Hour', value: 'hourly', description: 'Shows at most once per hour.' },
    { label: 'Daily', value: 'daily', description: 'Shows once every 24 hours.' },
    { label: 'Weekly', value: 'weekly', description: 'Shows once every 7 days.' },
]

export const getDaysUntilRelease = () => {
    const now = new Date()
    const difference = TARGET_DATE.getTime() - now.getTime()
    return Math.ceil(difference / (1000 * 60 * 60 * 24))
}

export const showCountdownToast = async () => {
    const days = getDaysUntilRelease()
    const durationSec = Number(storage.displayDuration) || DEFAULT_DURATION

    await Image.prefetch(LOGO_URL).catch(() => null)

    if (Toasts) {
        Toasts.open({
            key: `gta-toast-${UuidModule ? UuidModule.uuid4() : Math.random()}`,
            content: <CountdownToast days={days} />,
            containerStyle: {
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                shadowColor: 'transparent',
                elevation: 0,
            },
            toastDurationMs: durationSec * 1000,
        })
    }
}

const checkAndShowToast = () => {
    const now = Date.now()
    const lastShown = storage.lastShownTime || 0
    const diff = now - lastShown

    let shouldShow = false

    switch (storage.frequency) {
        case 'startup':
            shouldShow = true
            break
        case 'hourly':
            shouldShow = diff >= ONE_HOUR
            break
        case 'daily':
            shouldShow = diff >= ONE_DAY
            break
        case 'weekly':
            shouldShow = diff >= ONE_DAY * 7
            break
        default:
            shouldShow = diff >= ONE_DAY
    }

    if (shouldShow) {
        showCountdownToast()
        storage.lastShownTime = now
    }
}

let onConnection: () => void

export default {
    onLoad: () => {
        const isAlreadyConnected = ConnectionStore?.isConnected?.() ?? false

        if (isAlreadyConnected) {
            checkAndShowToast()
        } else {
            onConnection = () => {
                checkAndShowToast()
                FluxDispatcher.unsubscribe('POST_CONNECTION_OPEN', onConnection)
            }
            FluxDispatcher.subscribe('POST_CONNECTION_OPEN', onConnection)
        }
    },

    onUnload: () => {
        if (onConnection) {
            FluxDispatcher.unsubscribe('POST_CONNECTION_OPEN', onConnection)
        }
    },
    settings: Settings,
}

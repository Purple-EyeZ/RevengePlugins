import { findByProps } from '@revenge-mod/metro'
import { FluxDispatcher, ReactNative } from '@revenge-mod/metro/common'
import { logger } from '@vendetta'
import { storage } from '@vendetta/plugin'
import CountdownToast from './components/CountdownToast'
import Settings from './Settings'

interface AnnouncementsItem {
    id: number
    title: string
    message: string
    imageUrl: string
    buttonText: string
    buttonUrl: string
}

const { Image } = ReactNative as any
const Toasts = findByProps('open', 'close')
const UuidModule = findByProps('uuid4')
const ConnectionStore = findByProps('isConnected', 'isDisconnected')

const TARGET_DATE = new Date('2026-11-19T00:00:00')

export const LOGO_URL = 'https://i.imgur.com/x91idXI.png'
export const IMAGE_URL = 'https://i.imgur.com/M5K8i6m.jpeg'
export const ROCKSTAR_VI_URL = 'https://www.rockstargames.com/VI'
const ANNOUNCEMENTS_JSON_URL =
    'https://raw.githubusercontent.com/Purple-EyeZ/GTA-VI-Announcements/refs/heads/main/announcements.json'

const DEFAULT_DURATION = 3
const DEFAULT_FREQUENCY = 'daily'
const ONE_HOUR = 60 * 60 * 1000
const ONE_DAY = 24 * ONE_HOUR

storage.displayDuration ??= DEFAULT_DURATION
storage.frequency ??= DEFAULT_FREQUENCY
storage.enableAnnouncements ??= true

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

const checkAndShowAnnouncements = async () => {
    if (!storage.enableAnnouncements) return

    try {
        const announcements = await fetchAnnouncementsData()
        if (announcements.length > 0) {
            const latestAnnouncement = announcements[0]
            const lastShownId = storage.lastShownAnnouncementId || 0

            if (latestAnnouncement.id > lastShownId) {
                await showAnnouncements(latestAnnouncement)
                storage.lastShownAnnouncementId = latestAnnouncement.id
            }
        }
    } catch (error) {
        logger.error('Error showing announcements popup:', error)
    }
}

const fetchAnnouncementsData = async (): Promise<AnnouncementsItem[]> => {
    try {
        const response = await fetch(ANNOUNCEMENTS_JSON_URL)
        if (!response.ok) throw new Error('Failed to fetch announcements')
        const data = await response.json()
        return data.announcements || []
    } catch (error) {
        logger.error('Error fetching announcements:', error)
        return []
    }
}

export const showAnnouncements = async (announcementItem: AnnouncementsItem) => {
    const { openAlert, dismissAlert } = findByProps('openAlert', 'dismissAlert')
    const { AlertModal, AlertActions, AlertActionButton } = findByProps('AlertModal', 'AlertActions')
    const { View, Linking, Text } = ReactNative

    await Image.prefetch(announcementItem.imageUrl).catch(() => null)

    openAlert(
        `announcement-popup-${announcementItem.id}`,
        <AlertModal
            title={announcementItem.title}
            extraContent={
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={{ uri: announcementItem.imageUrl }}
                        style={{ width: 300, height: 169, borderRadius: 8, marginBottom: 20, marginTop: -30 }}
                        resizeMode="cover"
                    />
                    <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>
                        {' '}
                        {announcementItem.message}
                    </Text>
                </View>
            }
            actions={
                <AlertActions>
                    <AlertActionButton
                        text={announcementItem.buttonText}
                        variant="primary"
                        onPress={() => {
                            Linking.openURL(announcementItem.buttonUrl)
                            dismissAlert(`announcement-popup-${announcementItem.id}`)
                        }}
                    />
                    <AlertActionButton
                        text="Close"
                        variant="secondary"
                        onPress={() => dismissAlert(`announcement-popup-${announcementItem.id}`)}
                    />
                </AlertActions>
            }
        />,
    )
}

export const previewAnnouncements = async () => {
    const announcements = await fetchAnnouncementsData()
    if (announcements.length > 0) {
        await showAnnouncements(announcements[0])
    }
}

let onConnection: () => void

export default {
    onLoad: () => {
        const isAlreadyConnected = ConnectionStore?.isConnected?.() ?? false

        if (isAlreadyConnected) {
            checkAndShowToast()
            checkAndShowAnnouncements()
        } else {
            onConnection = () => {
                checkAndShowToast()
                checkAndShowAnnouncements()
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

import { findByProps } from '@revenge-mod/metro'
import { ReactNative } from '@revenge-mod/metro/common'
import { logger } from '@vendetta'
import { storage } from '@vendetta/plugin'
import CountdownToast from './components/CountdownToast'
import { DEFAULT_DURATION, LOGO_URL, TARGET_DATE } from './constants'

const { Image } = ReactNative as any
const Toasts = findByProps('open', 'close')
const UuidModule = findByProps('uuid4')

export const getDaysUntilRelease = () => {
    const now = new Date()
    const difference = TARGET_DATE.getTime() - now.getTime()
    return Math.ceil(difference / (1000 * 60 * 60 * 24))
}

export const showCountdownToast = async () => {
    try {
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
                },
                toastDurationMs: durationSec * 1000,
            })
        }
    } catch (error) {
        logger.error('Failed to show countdown toast:', error)
    }
}

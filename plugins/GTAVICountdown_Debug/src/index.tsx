import { findByProps } from '@revenge-mod/metro'
import { ReactNative } from '@revenge-mod/metro/common'
import { logger } from '@vendetta'
import CountdownToast from './components/CountdownToast'
import Settings from './Settings'

const { Image } = ReactNative as any

const Toasts = findByProps('open', 'close')
const UuidModule = findByProps('uuid4')

const TARGET_DATE = new Date('2026-11-19T00:00:00')

export const LOGO_URL = 'https://i.imgur.com/x91idXI.png'
export const IMAGE_URL = 'https://i.imgur.com/M5K8i6m.jpeg'
export const ROCKSTAR_VI_URL = 'https://www.rockstargames.com/VI'

export const getDaysUntilRelease = () => {
    const now = new Date()
    const difference = TARGET_DATE.getTime() - now.getTime()
    return Math.ceil(difference / (1000 * 60 * 60 * 24))
}

export const showCountdownToast = async () => {
    logger.info('showCountdownToast called')

    try {
        const days = getDaysUntilRelease()
        logger.info(`Days until release: ${days}`)

        logger.info('Prefetching Image...')
        await Image.prefetch(LOGO_URL).catch((err: any) => {
            logger.warn(`Image prefetch warning:`, err)
        })

        if (!Toasts) {
            logger.error('Toasts module not found!')
            return
        }

        logger.info('Toasts module found. Attempting to open toast.')

        const toastKey = `gta-toast-${UuidModule ? UuidModule.uuid4() : Math.random()}`

        Toasts.open({
            key: toastKey,
            content: `${days} days until GTA VI!`,
            containerStyle: {
                // backgroundColor: 'transparent',
                // borderColor: 'transparent',
                // shadowColor: 'transparent',
                elevation: 0,
            },
            toastDurationMs: 3000,
        })

        logger.info(`Toast opened successfully with key: ${toastKey}`)
    } catch (error) {
        logger.error('Failed to show countdown toast:', error)
    }
}

export default {
    onLoad: () => {
        logger.info('Plugin loaded')
    },
    onUnload: () => {
        logger.info('Plugin unloaded')
    },
    settings: Settings,
}

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
            content: <CountdownToast days={days} />,
            // containerStyle: {
            // backgroundColor: 'transparent',
            // borderColor: 'transparent',
            // shadowColor: 'transparent',
            // elevation: 0,
            // },
            toastDurationMs: 3000,
        })

        logger.info(`Toast opened successfully with key: ${toastKey}`)
    } catch (error) {
        logger.error('Failed to show countdown toast:', error)
    }
}

export const showSimpleToast = () => {
    logger.info('showSimpleToast called')

    try {
        if (!Toasts) {
            logger.error('Toasts module not found!')
            return
        }

        const days = getDaysUntilRelease()
        const toastKey = `gta-toast-simple-${UuidModule ? UuidModule.uuid4() : Math.random()}`

        Toasts.open({
            key: toastKey,
            content: `🇺🇸 GTA VI in ${days} days!!`,
            toastDurationMs: 3000,
        })

        logger.info(`Simple Toast opened successfully with key: ${toastKey}`)
    } catch (error) {
        logger.error('Failed to show simple toast:', error)
    }
}

export const showMinimalComponentToast = () => {
    logger.info('showMinimalComponentToast called')

    try {
        if (!Toasts) {
            logger.error('Toasts module not found!')
            return
        }

        const TextComponent = ReactNative.Text
        const ViewComponent = ReactNative.View
        const toastKey = `gta-toast-min-${UuidModule ? UuidModule.uuid4() : Math.random()}`

        Toasts.open({
            key: toastKey,
            content: (
                <ViewComponent style={{ backgroundColor: '#14acc0', padding: 10, borderRadius: 5 }}>
                    <TextComponent style={{ color: 'white', fontWeight: 'bold' }}>
                        MINIMAL REACT COMPONENT TEST
                    </TextComponent>
                </ViewComponent>
            ),
            toastDurationMs: 3000,
        })

        logger.info(`Minimal Component Toast opened successfully with key: ${toastKey}`)
    } catch (error) {
        logger.error('Failed to show minimal component toast:', error)
    }
}

export default {
    onLoad: () => {
        logger.info('Plugin loaded (v4)')
    },
    onUnload: () => {
        logger.info('Plugin unloaded')
    },
    settings: Settings,
}

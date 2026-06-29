import { findByProps } from '@revenge-mod/metro'
import { ReactNative } from '@revenge-mod/metro/common'
import { logger } from '@vendetta'
// import CountdownToast from './components/CountdownToast'
import { ToastTest_Full } from './components/TestToast_Full'
import { ToastTest_AllRemoved } from './components/TestToasts'
import { ToastTest_LetterSpacing } from './components/TestToast_WithLetterSpacing'
import { ToastTest_MinWidth } from './components/TestToast_WithMinWidth'
import { ToastTest_Opacity } from './components/TestToast_WithOpacity'
import { ToastTest_ShadowOffset } from './components/TestToast_WithShadowOffset'
import { ToastTest_AllRemoved_Gradient } from './components/TestToast_Gradient_EverythingRemoved'

import Settings from './Settings'

const Toasts = findByProps('open', 'close')
const UuidModule = findByProps('uuid4')
const { Image } = ReactNative as any

const TARGET_DATE = new Date('2026-11-19T00:00:00')
export const LOGO_URL = 'https://i.imgur.com/x91idXI.png'
export const IMAGE_URL = 'https://i.imgur.com/M5K8i6m.jpeg'
export const ROCKSTAR_VI_URL = 'https://www.rockstargames.com/VI'

export const getDaysUntilRelease = () => {
    const now = new Date()
    const difference = TARGET_DATE.getTime() - now.getTime()
    return Math.ceil(difference / (1000 * 60 * 60 * 24))
}

const triggerToast = (ComponentParams: any, name: string) => {
    const days = getDaysUntilRelease()
    Toasts.open({
        key: `gta-${name}-${UuidModule ? UuidModule.uuid4() : Math.random()}`,
        content: ComponentParams(days),
        toastDurationMs: 3000,
    })
}

export const testOriginal = async () => {
    logger.info('Test Original with Image Prefetch called')
    await Image.prefetch(LOGO_URL).catch(() => null)
    triggerToast((d: number) => <ToastTest_Full days={d} />, 'original')
}

export const testAllRemoved = () => triggerToast((d: number) => <ToastTest_AllRemoved days={d} />, 'all-removed')
export const testMinWidth = () => triggerToast((d: number) => <ToastTest_MinWidth days={d} />, 'min-width')
export const testOpacity = () => triggerToast((d: number) => <ToastTest_Opacity days={d} />, 'opacity')
export const testLetterSpacing = () =>
    triggerToast((d: number) => <ToastTest_LetterSpacing days={d} />, 'letter-spacing')
export const testShadowOffset = () => triggerToast((d: number) => <ToastTest_ShadowOffset days={d} />, 'shadow-offset')
export const testAllRemovedGradient = () =>
    triggerToast((d: number) => <ToastTest_AllRemoved_Gradient days={d} />, 'all-removed-gradient')

export default {
    onLoad: () => {
        logger.info('Plugin loaded (v5)')
    },
    onUnload: () => {
        logger.info('Plugin unloaded')
    },
    settings: Settings,
}

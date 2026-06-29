import { findByProps } from '@revenge-mod/metro'
import { FluxDispatcher } from '@revenge-mod/metro/common'
import { storage } from '@vendetta/plugin'
import { DEFAULT_DURATION, DEFAULT_FREQUENCY, TARGET_DATE } from './constants'
import Settings from './Settings'
import { showCountdownToast } from './utils'

const ConnectionStore = findByProps('isConnected', 'isDisconnected')

const ONE_HOUR = 60 * 60 * 1000
const ONE_DAY = 24 * ONE_HOUR

storage.displayDuration ??= DEFAULT_DURATION
storage.frequency ??= DEFAULT_FREQUENCY

export const getDaysUntilRelease = () => {
    const now = new Date()
    const difference = TARGET_DATE.getTime() - now.getTime()
    return Math.ceil(difference / (1000 * 60 * 60 * 24))
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

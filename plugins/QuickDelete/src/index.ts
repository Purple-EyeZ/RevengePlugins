import { findByProps } from '@vendetta/metro'
import { instead } from '@vendetta/patcher'
import { storage } from '@vendetta/plugin'
import Settings from './Settings'

// intl stuff is based on @nexpid's intlProxy (https://github.com/nexpid/BunnyPlugins/blob/main/src/stuff/lib/intlProxy.ts)
const { intl, t: intlMap } = findByProps('intl')

const KEYS = {
    message: {
        hash: 'AMvpS0',
        storage: 'autoConfirmMessage',
        default: true,
    },
    embed: {
        hash: 'vXZ+Fh',
        storage: 'autoConfirmEmbed',
        default: true,
    },
} as const

const autoConfirmMessages = {
    embed: intl.string(intlMap[KEYS.embed.hash]),
    message: intl.string(intlMap[KEYS.message.hash]),
}

let unpatch: () => void

export default {
    onLoad: () => {
        for (const { storage: key, default: value } of Object.values(KEYS)) {
            storage[key] ??= value
        }

        const Popup = findByProps('show', 'openLazy')
        if (!Popup) return

        unpatch = instead('show', Popup, (args, fn) => {
            const text = [args?.[0]?.children?.props?.title?.trim(), args?.[0]?.body?.trim()]

            const shouldConfirm = (type: 'message' | 'embed') =>
                storage[KEYS[type].storage] && text.includes(autoConfirmMessages[type])

            return shouldConfirm('message') || shouldConfirm('embed') ? args?.[0]?.onConfirm?.() : fn(...args)
        })
    },

    onUnload: () => unpatch?.(),
    settings: Settings,
}
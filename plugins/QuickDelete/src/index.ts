import { findByProps } from '@vendetta/metro'
import { instead } from '@vendetta/patcher'
import { storage } from '@vendetta/plugin'
import Settings from './Settings'

// intl stuff is based on @nexpid's intlProxy (https://github.com/nexpid/BunnyPlugins/blob/main/src/stuff/lib/intlProxy.ts)
const { intl, t: intlMap } = findByProps('intl')

const KEYS = {
    message: {
        hash: 'AMvpS4',
        storage: 'autoConfirmMessage',
        default: true,
    },
    embed: {
        hash: 'vXZ+Fo',
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
            const popup = args?.[0]
            const title = popup?.children?.props?.title
            const body = popup?.body

            if (
                !popup?.onConfirm ||
                typeof popup.onConfirm !== 'function' ||
                (typeof title !== 'string' && typeof body !== 'string')
            ) {
                return fn(...args)
            }

            const shouldConfirm = (type: 'message' | 'embed') => {
                const matcher = autoConfirmMessages[type]
                if (!matcher) return false

                return (
                    storage[KEYS[type].storage] &&
                    (title?.includes(matcher) || body?.includes(matcher))
                )
            }

            return shouldConfirm('message') || shouldConfirm('embed') ? popup.onConfirm() : fn(...args)
        })
    },

    onUnload: () => unpatch?.(),
    settings: Settings,
}
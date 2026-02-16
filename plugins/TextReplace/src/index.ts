// Original source: https://github.com/Fierdetta/text-replace
import { storage } from '@vendetta/plugin'
import patchMessageLongPressActionSheet from './patches/MessageLongPressActionSheet'
import patchSendMessage from './patches/sendMessage'
import Settings from './ui/pages/Settings'

let patches: (() => void)[] = []

export default {
    onLoad: () => {
        storage.rules ??= []

        patches.push(patchSendMessage())
        patches.push(patchMessageLongPressActionSheet())
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch()
        }
        patches = []
    },
    settings: Settings,
}

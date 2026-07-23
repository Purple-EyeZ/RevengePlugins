import { storage } from '@vendetta/plugin'
import patchYouBarNotificationsButton from './patches/YouBarNotificationsButton'
import Settings from './Settings'

let patches: (() => void)[] = []

export default {
    onLoad: () => {
        storage.showSettingsButton ??= true
        storage.showDMButton ??= false

        patches.push(patchYouBarNotificationsButton())
    },
    onUnload: () => {
        for (const unpatch of patches) {
            unpatch()
        }
        patches = []
    },
    settings: Settings,
}

import { ReactNative } from '@revenge-mod/metro/common'
import { registerCommand } from '@vendetta/commands'

let command: () => void

export default {
    onLoad: () => {
        command = registerCommand({
            name: 'crash',
            displayName: 'crash',
            description: 'Causes a native client crash.',
            displayDescription: 'Causes a native client crash.',
            options: [],
            execute: () => {
                ReactNative.NativeModules.ExceptionsManager?.reportFatalException(
                    'Crash requested by user via /crash command.',
                    [],
                    0,
                )
            },
            applicationId: '-1',
            inputType: 1,
            type: 1,
        })
    },
    onUnload: () => {
        command?.()
    },
}

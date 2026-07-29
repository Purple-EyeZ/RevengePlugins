import { findByProps, findByTypeName } from '@revenge-mod/metro'
import { React } from '@revenge-mod/metro/common'
import { instead } from '@vendetta/patcher'
import { storage } from '@vendetta/plugin'
import { getAssetIDByName } from '@vendetta/ui/assets'

export let updateYouBar = () => {}

export default function patchYouBarNotificationsButton() {
    const YouBarNotificationsButton = findByTypeName('YouBarNotificationsButton')
    const userSettingsAction = findByProps('openUserSettings')
    const transitionModule = findByProps('transitionToGuild')

    const SettingsIcon = getAssetIDByName('SettingsIcon')
    const ChatIcon = getAssetIDByName('ChatIcon')

    if (!YouBarNotificationsButton) return () => {}

    return instead('type', YouBarNotificationsButton, (args, OriginalRender) => {
        const [, forceUpdate] = React.useReducer((x: number) => ~x, 0)

        updateYouBar = () => forceUpdate()

        const res = OriginalRender(...args)

        if (!res?.props?.children) return res

        const IconButton = res.props.children.type
        const originalProps = res.props.children.props

        return (
            <React.Fragment>
                {storage.showDMButton && (
                    <IconButton
                        variant={originalProps?.variant || 'tertiary'}
                        size={originalProps?.size || 'sm'}
                        icon={ChatIcon}
                        onPress={() => {
                            transitionModule?.transitionToGuild?.('@me')
                        }}
                    />
                )}

                {storage.showSettingsButton && (
                    <IconButton
                        variant={originalProps?.variant || 'tertiary'}
                        size={originalProps?.size || 'sm'}
                        icon={SettingsIcon}
                        onPress={() => {
                            userSettingsAction?.openUserSettings?.()
                        }}
                    />
                )}
                {res}
            </React.Fragment>
        )
    })
}

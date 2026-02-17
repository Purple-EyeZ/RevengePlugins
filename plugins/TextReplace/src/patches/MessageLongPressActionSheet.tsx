import { findByProps } from '@revenge-mod/metro'
import { React } from '@revenge-mod/metro/common'
import { after, before } from '@vendetta/patcher'
import { storage } from '@vendetta/plugin'
import { getAssetIDByName } from '@vendetta/ui/assets'
import { showToast } from '@vendetta/ui/toasts'
import { findInReactTree } from '@vendetta/utils'

const LazyActionSheet = findByProps('openLazy', 'hideActionSheet')
const ActionSheetRow = findByProps('ActionSheetRow')?.ActionSheetRow
const DownloadIcon = getAssetIDByName('DownloadIcon')
const JSON_CODEBLOCK_PATTERN = /^```(?:json)\n([\s\S]*?)```$/gm

export default function patchMessageLongPressActionSheet() {
    return before('openLazy', LazyActionSheet, ([component, key, msg]) => {
        if (key !== 'MessageLongPressActionSheet') return
        const content = msg?.message?.content
        if (!content) return

        component.then((instance: any) => {
            const unpatch = after('default', instance, (_, res) => {
                React.useEffect(() => {
                    return () => {
                        unpatch()
                    }
                }, [])

                const rules = [...content.matchAll(JSON_CODEBLOCK_PATTERN)]
                    .map(m => {
                        try {
                            return JSON.parse(m[1])
                        } catch {
                            return null
                        }
                    })
                    .filter(
                        r =>
                            r &&
                            typeof r.name === 'string' &&
                            typeof r.match === 'string' &&
                            typeof r.replace === 'string',
                    )

                if (!rules.length) return

                const buttons = findInReactTree(
                    res,
                    x => Array.isArray(x) && x.some(c => c?.type?.name === 'ActionSheetRow'),
                )
                if (!buttons) return

                rules.forEach((rule: any) => {
                    buttons.unshift(
                        <ActionSheetRow
                            label={`Import Rule: ${rule.name}`}
                            icon={<ActionSheetRow.Icon source={DownloadIcon} />}
                            onPress={() => {
                                LazyActionSheet.hideActionSheet()
                                storage.rules = [...storage.rules, rule]
                                showToast(`Imported ${rule.name}`, DownloadIcon)
                            }}
                        />,
                    )
                })
            })
        })
    })
}

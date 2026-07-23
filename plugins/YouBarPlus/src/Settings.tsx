import Text from '@lib/components/Text'
import { components, ReactNative } from '@revenge-mod/metro/common'
import { storage } from '@vendetta/plugin'
import { useProxy } from '@vendetta/storage'
import { getAssetIDByName } from '@vendetta/ui/assets'

const { TableRowGroup, TableSwitchRow, TableRowIcon, Stack } = components
const { ScrollView } = ReactNative

const settingsOptions = [
    {
        label: 'Direct Messages Button',
        subLabel: 'Show the DM button in the YouBar',
        icon: 'ChatIcon',
        value: 'showDMButton',
    },
    {
        label: 'Settings Button',
        subLabel: 'Show the Settings button in the YouBar',
        icon: 'SettingsIcon',
        value: 'showSettingsButton',
    },
]

export default function Settings() {
    useProxy(storage)

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <Stack style={{ paddingVertical: 24, paddingHorizontal: 12 }} spacing={24}>
                {TableRowGroup && (
                    <TableRowGroup title="Settings">
                        {settingsOptions.map(
                            ({ label, subLabel, icon, value }) =>
                                TableSwitchRow && (
                                    <TableSwitchRow
                                        key={value}
                                        label={label}
                                        subLabel={subLabel}
                                        icon={TableRowIcon ? <TableRowIcon source={getAssetIDByName(icon)!} /> : null}
                                        value={storage[value]}
                                        onValueChange={v => (storage[value] = v)}
                                    />
                                ),
                        )}
                    </TableRowGroup>
                )}
                {Text && (
                    <Text variant="text-sm/normal" color="TEXT_MUTED" style={{ textAlign: 'center', marginTop: -8 }}>
                        Changes require an app restart to take effect.
                    </Text>
                )}
            </Stack>
        </ScrollView>
    )
}

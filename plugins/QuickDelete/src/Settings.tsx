import { useProxy } from '@vendetta/storage'
import { getAssetIDByName } from '@vendetta/ui/assets'
import { storage } from '@vendetta/plugin'
import { components, ReactNative } from '@revenge-mod/metro/common'

const { TableRowGroup, TableSwitchRow, TableRowIcon, Stack } = components
const { ScrollView } = ReactNative

const settings = [
    {
        label: 'Messages',
        subLabel: 'Deletes messages without confirmation',
        icon: 'ForumIcon',
        value: 'autoConfirmMessage',
    },
    {
        label: 'Embeds',
        subLabel: 'Deletes embeds without confirmation',
        icon: 'EmbedIcon',
        value: 'autoConfirmEmbed',
    },
]

export default function Settings() {
    useProxy(storage)

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <Stack style={{ paddingVertical: 24, paddingHorizontal: 12 }} spacing={24}>
                {TableRowGroup && (
                    <TableRowGroup title="Settings">
                        {settings.map(
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
            </Stack>
        </ScrollView>
    )
}
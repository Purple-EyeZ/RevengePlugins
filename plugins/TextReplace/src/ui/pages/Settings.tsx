import Text from '@lib/components/Text'
import { findRedesignComponent } from '@lib/types'
import { components, NavigationNative, ReactNative } from '@revenge-mod/metro/common'
import { storage } from '@vendetta/plugin'
import { useProxy } from '@vendetta/storage'
import { getAssetIDByName } from '@vendetta/ui/assets'
import EditRule from './EditRule'

const { ScrollView, View } = ReactNative
const { TableRow, Stack, TableRowGroup } = components

const Button = findRedesignComponent('Button') as typeof components.Button

export default function Settings() {
    useProxy(storage)
    const navigation = NavigationNative.useNavigation()

    const createNewRule = () => {
        const newRule = {
            name: 'New Rule',
            match: '',
            flags: 'gi',
            replace: '',
            regex: false,
        }
        storage.rules = [...storage.rules, newRule]

        navigation.push('VendettaCustomPage', {
            title: 'Edit Rule',
            render: () => <EditRule ruleIndex={storage.rules.length - 1} />,
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <Stack style={{ paddingVertical: 24, paddingHorizontal: 16 }} spacing={24}>
                    <TableRowGroup title="Rules">
                        {storage.rules.length === 0 ? (
                            <View style={{ padding: 16, alignItems: 'center' }}>
                                <Text align="center" variant="text-md/medium" color="TEXT_MUTED">
                                    No rules created yet.
                                </Text>
                            </View>
                        ) : (
                            storage.rules.map((rule: any, index: number) => (
                                <TableRow
                                    key={index}
                                    label={rule.name ? `${rule.name}` : 'Unnamed Rule'}
                                    subLabel={rule.match ? `Matches: ${rule.match}` : 'No match pattern set'}
                                    onPress={() =>
                                        navigation.push('VendettaCustomPage', {
                                            title: 'Edit Rule',
                                            render: () => <EditRule ruleIndex={index} />,
                                        })
                                    }
                                    arrow
                                />
                            ))
                        )}
                    </TableRowGroup>

                    <Button
                        text="New Rule"
                        variant="primary"
                        size="md"
                        onPress={createNewRule}
                        icon={getAssetIDByName('PlusSmallIcon')}
                        iconPosition="start"
                    />
                </Stack>
            </ScrollView>
        </View>
    )
}

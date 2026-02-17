import Text from '@lib/components/Text'
import { findRedesignComponent, resolveSemanticColor } from '@lib/types'
import { findByProps } from '@revenge-mod/metro'
import { clipboard, components, NavigationNative, React, ReactNative } from '@revenge-mod/metro/common'
import { storage } from '@vendetta/plugin'
import { semanticColors } from '@vendetta/ui'
import { getAssetIDByName } from '@vendetta/ui/assets'
import { showToast } from '@vendetta/ui/toasts'

import type { Rule } from '../../def'

const { ScrollView, View, Keyboard } = ReactNative
const { TableRow, TableRowGroup, Stack, TableSwitchRow } = components

const TextInput = findRedesignComponent('TextInput') as typeof components.TextInput

const { openAlert, dismissAlert } = findByProps('openAlert', 'dismissAlert')
const { AlertModal, AlertActions, AlertActionButton } = findByProps('AlertModal', 'AlertActions')

const InputRow = ({
    label,
    value,
    onChange,
    placeholder,
    isClearable,
}: {
    label: string
    value: string
    onChange: (v: string) => void
    placeholder?: string
    isClearable?: boolean
}) => (
    <TableRow
        label={label}
        subLabel={
            <View style={{ marginTop: 8 }}>
                <TextInput placeholder={placeholder} value={value} onChange={onChange} isClearable={isClearable} />
            </View>
        }
    />
)

export default function EditRule({ ruleIndex }: { ruleIndex: number }) {
    const initialRule = storage.rules[ruleIndex] as Rule
    if (!initialRule) return null

    // We use local state and save on exit to prevent lag caused by synchronous storage updates
    const [localRule, setLocalRule] = React.useState(initialRule)
    const navigation = NavigationNative.useNavigation()

    const ruleRef = React.useRef(localRule)
    const isDeletingRef = React.useRef(false)

    // Can't get KeyboardAvoidingView to work properly, so here we are ig.
    const [keyboardHeight, setKeyboardHeight] = React.useState(0)

    React.useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', e => {
            setKeyboardHeight(e.endCoordinates.height)
        })
        const hideSub = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0)
        })

        return () => {
            showSub.remove()
            hideSub.remove()
        }
    }, [])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            if (isDeletingRef.current || !storage.rules[ruleIndex]) return

            const newRules = [...storage.rules]
            newRules[ruleIndex] = ruleRef.current
            storage.rules = newRules
        })

        return unsubscribe
    }, [navigation, ruleIndex])

    const updateRule = (key: keyof Rule, value: any) => {
        setLocalRule(prev => {
            const newState = { ...prev, [key]: value }
            ruleRef.current = newState
            return newState
        })
    }

    const deleteRule = () => {
        isDeletingRef.current = true
        const newRules = [...storage.rules]
        newRules.splice(ruleIndex, 1)
        storage.rules = newRules
        navigation.goBack()
    }

    const handleDeletePress = () => {
        openAlert(
            'delete-rule-confirmation',
            <AlertModal
                title="Delete Rule?"
                content="Are you sure you want to delete this rule? This action cannot be undone."
                extraContent={
                    <View
                        style={{
                            backgroundColor: resolveSemanticColor(semanticColors.BACKGROUND_SECONDARY),
                            padding: 12,
                            borderRadius: 12,
                        }}
                    >
                        <Text variant="text-md/bold" align="center" color="TEXT_DEFAULT">
                            {localRule.name || 'Unnamed Rule'}
                        </Text>
                    </View>
                }
                actions={
                    <AlertActions>
                        <AlertActionButton
                            text="Cancel"
                            variant="secondary"
                            onPress={() => dismissAlert('delete-rule-confirmation')}
                        />
                        <AlertActionButton
                            text="Delete"
                            variant="destructive"
                            onPress={() => {
                                dismissAlert('delete-rule-confirmation')
                                deleteRule()
                            }}
                        />
                    </AlertActions>
                }
            />,
        )
    }

    const copyRule = () => {
        const ruleJson = JSON.stringify(localRule, null, 4)
        clipboard.setString(`\`\`\`json\n${ruleJson}\n\`\`\``)
        showToast(`Rule ${localRule.name} copied to clipboard`, getAssetIDByName('CopyIcon'))
    }

    return (
        <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
                paddingBottom: keyboardHeight + 12,
            }}
            keyboardShouldPersistTaps="handled"
        >
            <Stack style={{ paddingVertical: 24, paddingHorizontal: 16 }} spacing={24}>
                <TableRowGroup title="Configuration">
                    <InputRow
                        label="Name"
                        value={localRule.name}
                        onChange={v => updateRule('name', v)}
                        placeholder="Rule Name"
                        isClearable={true}
                    />
                    <InputRow
                        label="Match"
                        value={localRule.match}
                        onChange={v => updateRule('match', v)}
                        placeholder="Text to replace"
                    />
                    <InputRow
                        label="Replace with"
                        value={localRule.replace}
                        onChange={v => updateRule('replace', v)}
                        placeholder="New text"
                    />
                </TableRowGroup>

                <TableRowGroup title="Settings">
                    <TableSwitchRow
                        label="Regex Mode"
                        subLabel="Treat the match string as a Regular Expression"
                        value={localRule.regex}
                        onValueChange={(v: boolean) => updateRule('regex', v)}
                    />
                    {localRule.regex && (
                        <InputRow
                            label="Regex Flags"
                            value={localRule.flags}
                            onChange={v => updateRule('flags', v)}
                            placeholder="gi"
                        />
                    )}
                </TableRowGroup>

                <TableRowGroup title="Actions">
                    <TableRow
                        label="Copy Rule JSON"
                        icon={<TableRow.Icon source={getAssetIDByName('CopyIcon')} />}
                        onPress={copyRule}
                        arrow
                    />
                    <TableRow
                        label="Delete Rule"
                        icon={<TableRow.Icon source={getAssetIDByName('TrashIcon')} variant="danger" />}
                        onPress={handleDeletePress}
                        variant="danger"
                        arrow
                    />
                </TableRowGroup>
            </Stack>
        </ScrollView>
    )
}

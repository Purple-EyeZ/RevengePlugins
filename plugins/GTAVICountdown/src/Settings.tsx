import Text from '@lib/components/Text'
import { findRedesignComponent } from '@lib/types'
import { components, type React, ReactNative } from '@revenge-mod/metro/common'
import { storage } from '@vendetta/plugin'
import { useProxy } from '@vendetta/storage'
import { getAssetIDByName } from '@vendetta/ui/assets'
import { FREQUENCIES, IMAGE_URL, ROCKSTAR_VI_URL, showCountdownToast } from './index'

type ButtonType = typeof components.Button
type TableRadioRowType = typeof components.TableRadioRow
interface TableRadioGroupProps {
    title?: string
    value?: string
    defaultValue?: string
    hasIcons?: boolean
    onChange?: (v: any) => void
    children?: React.ReactNode
}

const Button = findRedesignComponent('Button') as ButtonType
const RawSlider = findRedesignComponent('Slider')
const TableRadioGroup = findRedesignComponent('TableRadioGroup') as React.FC<TableRadioGroupProps>
const TableRadioRow = findRedesignComponent('TableRadioRow') as TableRadioRowType

const { TableRowGroup, Stack, TableRow } = components
const { ScrollView, View, TouchableOpacity, Image, StyleSheet, Linking } = ReactNative

const Slider = (props: any) => (
    <View style={{ marginTop: 8 }}>
        {RawSlider ? (
            <RawSlider {...props} onValueChange={(val: any) => props.value !== val && props.onValueChange?.(val)} />
        ) : (
            <Text color="TEXT_FEEDBACK_CRITICAL">Missing Slider</Text>
        )}
    </View>
)

const HeroBanner = () => (
    <TouchableOpacity onPress={() => Linking.openURL(ROCKSTAR_VI_URL)} activeOpacity={0.9} style={styles.heroContainer}>
        <Image source={{ uri: IMAGE_URL }} style={styles.heroImage} resizeMode="cover" />
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    heroContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 5.0,
        elevation: 8,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
})

export default function Settings() {
    useProxy(storage)

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <Stack style={{ paddingVertical: 24, paddingHorizontal: 16 }} spacing={24}>
                <HeroBanner />

                <TableRadioGroup
                    title="Frequency"
                    defaultValue={storage.frequency}
                    onChange={(v: string) => (storage.frequency = v)}
                >
                    {FREQUENCIES.map(freq => (
                        <TableRadioRow
                            key={freq.value}
                            label={freq.label}
                            subLabel={freq.description}
                            value={freq.value}
                        />
                    ))}
                </TableRadioGroup>

                <TableRowGroup title="Behavior">
                    <TableRow
                        label="Toast Duration"
                        subLabel={
                            <View>
                                <Text variant="text-xs/medium" color="TEXT_SUBTLE" style={{ marginTop: 4 }}>
                                    The notification will stay on screen for{' '}
                                    <Text variant="text-xs/bold" color="MOBILE_TEXT_HEADING_PRIMARY">
                                        {storage.displayDuration} seconds
                                    </Text>
                                    .
                                </Text>

                                <Slider
                                    value={storage.displayDuration}
                                    minimumValue={1}
                                    maximumValue={20}
                                    step={1}
                                    onValueChange={(val: number) => (storage.displayDuration = val)}
                                />
                            </View>
                        }
                        onPress={() => {}}
                        arrow={false}
                    />
                </TableRowGroup>

                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text="Preview Toast"
                            variant="primary"
                            size="md"
                            onPress={() => showCountdownToast()}
                            icon={getAssetIDByName('EyeIcon')}
                            iconPosition="start"
                        />
                    )}
                </View>
            </Stack>
        </ScrollView>
    )
}

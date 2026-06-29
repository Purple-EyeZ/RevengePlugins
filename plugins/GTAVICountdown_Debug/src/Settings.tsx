import { findRedesignComponent } from '@lib/types'
import { components, ReactNative } from '@revenge-mod/metro/common'
import { getAssetIDByName } from '@vendetta/ui/assets'
import { showCountdownToast, showMinimalComponentToast, showSimpleToast } from './index'

type ButtonType = typeof components.Button

const Button = findRedesignComponent('Button') as ButtonType
const { Stack } = components
const { ScrollView, View } = ReactNative

export default function Settings() {
    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <Stack style={{ paddingVertical: 24, paddingHorizontal: 16 }} spacing={24}>
                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text="(1) Test Toast (Fallback Border)"
                            variant="primary"
                            size="md"
                            onPress={() => showCountdownToast()}
                            icon={getAssetIDByName('EyeIcon')}
                            iconPosition="start"
                        />
                    )}
                </View>

                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text="(2) Test Minimal Component"
                            variant="secondary"
                            size="md"
                            onPress={() => showMinimalComponentToast()}
                            icon={getAssetIDByName('WrenchIcon')}
                            iconPosition="start"
                        />
                    )}
                </View>

                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text="(3) Test Simple Text Toast"
                            variant="secondary"
                            size="md"
                            onPress={() => showSimpleToast()}
                            icon={getAssetIDByName('TextIcon')}
                            iconPosition="start"
                        />
                    )}
                </View>
            </Stack>
        </ScrollView>
    )
}

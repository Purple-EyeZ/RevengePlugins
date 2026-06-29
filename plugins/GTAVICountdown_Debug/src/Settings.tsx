import { findRedesignComponent } from '@lib/types'
import { components, ReactNative } from '@revenge-mod/metro/common'
// import { getAssetIDByName } from '@vendetta/ui/assets'
import { showV0Toast } from './index'

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
                            text="Test V0 (Fallback Border)"
                            variant="secondary"
                            size="md"
                            onPress={() => showV0Toast()}
                            iconPosition="start"
                        />
                    )}
                </View>
            </Stack>
        </ScrollView>
    )
}

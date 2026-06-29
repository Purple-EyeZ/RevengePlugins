import { findRedesignComponent } from '@lib/types'
import { components, ReactNative } from '@revenge-mod/metro/common'
import { getAssetIDByName } from '@vendetta/ui/assets'
import { testVariantA, testVariantB, testVariantC, testVariantD, testVariantE, testVariantF } from './index'

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
                            text="(0) ToastV0_Base"
                            variant="primary"
                            size="md"
                            onPress={() => testVariantA()}
                            iconPosition="start"
                        />
                    )}
                </View>

                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text="(1) ToastV1_NoImage"
                            variant="secondary"
                            size="md"
                            onPress={() => testVariantB()}
                            iconPosition="start"
                        />
                    )}
                </View>

                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text="(2) ToastV2_NoHex8"
                            variant="secondary"
                            size="md"
                            onPress={() => testVariantC()}
                            iconPosition="start"
                        />
                    )}
                </View>

                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text="(3) ToastV3_NoShadows"
                            variant="secondary"
                            size="md"
                            onPress={() => testVariantD()}
                            iconPosition="start"
                        />
                    )}
                </View>

                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text="(4) ToastV4_NoFlex"
                            variant="secondary"
                            size="md"
                            onPress={() => testVariantE()}
                            iconPosition="start"
                        />
                    )}
                </View>

                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text="(5) ToastV5_BasicBorder"
                            variant="secondary"
                            size="md"
                            onPress={() => testVariantF()}
                            iconPosition="start"
                        />
                    )}
                </View>
            </Stack>
        </ScrollView>
    )
}

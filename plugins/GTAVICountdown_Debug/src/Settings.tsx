import { findRedesignComponent } from '@lib/types'
import { components, ReactNative } from '@revenge-mod/metro/common'
// import { getAssetIDByName } from '@vendetta/ui/assets'
import {
    testOriginal,
    testAllRemoved,
    testMinWidth,
    testOpacity,
    testLetterSpacing,
    testShadowOffset,
    testAllRemovedGradient,
} from './index'

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
                            text="(0) Everything Removed"
                            variant="primary"
                            size="md"
                            onPress={() => testAllRemoved()}
                            iconPosition="start"
                        />
                    )}
                </View>

                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text="(1) With MinWidth"
                            variant="secondary"
                            size="md"
                            onPress={() => testMinWidth()}
                            iconPosition="start"
                        />
                    )}
                </View>

                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text="(2) With Opacity"
                            variant="secondary"
                            size="md"
                            onPress={() => testOpacity()}
                            iconPosition="start"
                        />
                    )}
                </View>

                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text="(3) With LetterSpacing"
                            variant="secondary"
                            size="md"
                            onPress={() => testLetterSpacing()}
                            iconPosition="start"
                        />
                    )}
                </View>

                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text="(4) With TextShadowOffset"
                            variant="secondary"
                            size="md"
                            onPress={() => testShadowOffset()}
                            iconPosition="start"
                        />
                    )}
                </View>

                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text="(5) All Removed + Gradient"
                            variant="secondary"
                            size="md"
                            onPress={() => testAllRemovedGradient()}
                            iconPosition="start"
                        />
                    )}
                </View>

                <View style={{ paddingHorizontal: 0 }}>
                    {Button && (
                        <Button
                            text="(X) Original"
                            variant="secondary"
                            size="md"
                            onPress={() => testOriginal()}
                            iconPosition="start"
                        />
                    )}
                </View>
            </Stack>
        </ScrollView>
    )
}

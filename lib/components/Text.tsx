import { findByProps } from '@revenge-mod/metro'
import { type React, ReactNative as RN } from '@revenge-mod/metro/common'
import { semanticColors } from '@vendetta/ui'
import type { TextProps } from 'react-native'
import { resolveSemanticColor, type TextStyleSheetVariant, type _TextStyleSheet } from '../types'

export const TextStyleSheet = findByProps('TextStyleSheet')?.TextStyleSheet as _TextStyleSheet

interface CustomTextProps extends TextProps {
    variant?: TextStyleSheetVariant
    color?: keyof typeof semanticColors
    align?: 'left' | 'right' | 'center'
    lineClamp?: number
}

export default function Text({
    variant,
    color,
    align,
    style,
    lineClamp,
    children,
    ...props
}: React.PropsWithChildren<CustomTextProps>) {
    const computedStyle: any[] = []

    if (variant && TextStyleSheet?.[variant]) computedStyle.push(TextStyleSheet[variant])
    if (color && semanticColors[color]) computedStyle.push({ color: resolveSemanticColor(semanticColors[color]) })
    if (align) computedStyle.push({ textAlign: align })
    if (style) computedStyle.push(style)

    return (
        <RN.Text style={computedStyle} numberOfLines={lineClamp} {...props}>
            {children}
        </RN.Text>
    )
}

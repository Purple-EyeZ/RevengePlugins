// based on https://github.com/nexpid/RevengePlugins/blob/main/src/stuff/types.tsx
import { findByProps, findByStoreName } from '@revenge-mod/metro'

const ThemeStore = findByStoreName('ThemeStore')
const colorModule = findByProps('colors', 'unsafe_rawColors')
const colorResolver = colorModule?.internal ?? colorModule?.meta

export type TextStyleSheetCase = 'normal' | 'medium' | 'semibold' | 'bold'
type TextStyleSheetHasExtraBoldCase =
    | 'heading-sm'
    | 'heading-md'
    | 'heading-lg'
    | 'heading-xl'
    | 'heading-xxl'
    | 'heading-deprecated-12'
export type TextStyleSheetHasCase =
    | TextStyleSheetHasExtraBoldCase
    | 'text-xxs'
    | 'text-xs'
    | 'text-sm'
    | 'text-md'
    | 'text-lg'
    | 'redesign/message-preview'
    | 'redesign/channel-title'

export type TextStyleSheetVariant =
    | `${TextStyleSheetHasCase}/${TextStyleSheetCase}`
    | `${TextStyleSheetHasExtraBoldCase}/${TextStyleSheetCase | 'extrabold'}`
    | 'eyebrow'
    | 'redesign/heading-18/bold'
    | 'display-sm'
    | 'display-md'
    | 'display-lg'

export type _TextStyleSheet = Record<
    TextStyleSheetVariant,
    { fontSize: number; lineHeight: number; textTransform: string; fontFamily: string }
>

export const resolveSemanticColor = (color: any, theme: string = ThemeStore.theme) => {
    return (color && colorResolver?.resolveSemanticColor(theme, color)) || '#000000'
}

export const findRedesignComponent = (propName: string) => findByProps(propName)?.[propName]

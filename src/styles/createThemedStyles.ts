import { StyleSheet } from 'react-native'
import { theme } from '@/styles/theme'

type NamedStyles<S> = StyleSheet.NamedStyles<S> & S;
type ThemeCallback<T, S> = (theme: T) => NamedStyles<S>;

const buildCreateStyles =
  <T extends object>(theme: T) =>
    <S extends StyleSheet.NamedStyles<S>>(
      themeCbOrNamedStyles: ThemeCallback<T, S> | NamedStyles<S>,
    ) =>
      StyleSheet.create<S>(
        typeof themeCbOrNamedStyles === 'function'
          ? themeCbOrNamedStyles(theme)
          : themeCbOrNamedStyles,
      )

export const createThemedStyles = buildCreateStyles(theme)

import * as React from 'react'
import { NativeBaseProvider } from 'native-base'
import theme from '../theme'

type Props = {
  children: React.ReactNode
}

export default function AppContainer(props: Props) {
  return (
    <NativeBaseProvider>
      <NativeBaseProvider theme={theme} >{props.children}</NativeBaseProvider>
    </NativeBaseProvider>
  )
}

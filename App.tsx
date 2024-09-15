import "@/presentation/styles/global.css"

import { StatusBar as AppStatusBar} from 'expo-status-bar'
import { NavigationContainer } from "@react-navigation/native"

import { StackOrganism } from "@/presentation/organisms/stack.organism"
import { WelcomePage } from "./src/presentation/pages/welcome.page"

export default function App() { 
  return (
    <>
      <NavigationContainer>
        {/* <StackOrganism/> */}
        <WelcomePage/>
      </NavigationContainer>
      <AppStatusBar style="light" />
    </>
  )
}

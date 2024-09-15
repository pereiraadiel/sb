import "@/presentation/styles/global.css"

import { View } from "react-native"
import { StatusBar as AppStatusBar} from 'expo-status-bar'
import { PaymentPage } from "./src/presentation/pages/payment.page"
import { WelcomePage } from "./src/presentation/pages/welcome.page"
import { AuthPage } from "./src/presentation/pages/auth.page"
import { HomePage } from "./src/presentation/pages/home.page"

export default function App() { 
  return (
    <View>
      {/* <PaymentPage/> */}
      {/* <WelcomePage/> */}
      {/* <AuthPage/> */}
      <HomePage/>
      <AppStatusBar style="light" />
    </View>
  )
}

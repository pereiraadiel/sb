import { createStackNavigator } from '@react-navigation/stack'

import { HomePage } from '@/presentation/pages/home.page';
import { AuthPage } from '@/presentation/pages/auth.page';
import { PaymentPage } from '@/presentation/pages/payment.page';
import { WelcomePage } from '@/presentation/pages/welcome.page';

const Stack = createStackNavigator();

const StackOrganism = () => {
	return (
		<Stack.Navigator
			initialRouteName="Welcome"
			screenOptions={{
				headerShown: false
			}}
		>
			<>
				<Stack.Screen name="Home" component={HomePage} />
				<Stack.Screen name="Auth" component={AuthPage} />
				<Stack.Screen name="Welcome" component={WelcomePage} />
				<Stack.Screen name="Payment" component={PaymentPage} />
			</>
		</Stack.Navigator>
	)
};

export { StackOrganism };
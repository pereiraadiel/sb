import { View } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'

import { toBrlCurrency } from "@/domain/utils/currency.util";
import { TextAtom } from "@/presentation/atoms/text.atom"
import { MainTemplate } from "@/presentation/templates/main.template"
import { SeparatorAtom } from "@/presentation/atoms/separator.atom";
import { ButtonAtom } from "@/presentation/atoms/button.atom";

const PaymentDonePage = () => {
	const route = useRoute<any>();
	const { navigate } = useNavigation<any>()
	const { balance } = route.params;

	const handleNavigate = () => {
		console.log('navigating to Home');
		navigate('Home');
	}

	return (
		<MainTemplate>
			<View className="">
				<TextAtom size="large" className="w-full text-center text-green-500">Transação realizada com sucesso!</TextAtom>
			</View>
			<View className="w-64 h-64 bg-gray-secondary rounded-full mx-auto mt-40 flex items-center justify-center">
				<Feather name="check" size={96} color="green"/>
			</View>
			<View className="flex-1 items-end justify-end">
				<SeparatorAtom className="my-2"/>
				<TextAtom size="large" className="w-full text-center mb-4">Saldo: {toBrlCurrency(balance)}</TextAtom>
				<ButtonAtom onPress={handleNavigate} >Finalizar</ButtonAtom>
			</View>
		</MainTemplate>
	)
}

export { PaymentDonePage }
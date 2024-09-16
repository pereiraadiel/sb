import { Image, View } from "react-native"
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native"

import { MainTemplate } from "@/presentation/templates/main.template";
import { SeparatorAtom } from "@/presentation/atoms/separator.atom";
import { ButtonAtom } from "@/presentation/atoms/button.atom";
import { TextAtom } from "@/presentation/atoms/text.atom";
import { InputAtom } from "@/presentation/atoms/input.atom";

type AuthPage = {};
 
const AuthPage: React.FC<AuthPage> = ({ }) => {
	const [accessCode, setAccessCode] = useState<string>('');
	const { navigate } = useNavigation<any>();

	const handleNavigate = () => {
		console.log('accessCode: ', accessCode)
		navigate('Home');
	}

	return (
		<MainTemplate>
			<View className="flex-1 items-center mt-8">
				<Image 
					className="mb-2"
					source={require('../../assets/sb.png')}
					style={{
						width: 100,
						height: 100,
						resizeMode: 'contain'
					}}
				/>
				<TextAtom size="large" className="w-80 text-center">Bem-vindo ao Festas{'\n'}São Benedito</TextAtom>
				<TextAtom size="medium" className="mt-2 w-64 text-center text-white-tertiary">
					Aqui você pode gerenciar os ingressos de suas festas
				</TextAtom>
			</View>
			<SeparatorAtom/>
			<InputAtom 
				label="Código de acesso" 
				placeholder="Insira aqui o código de acesso..."
				value={accessCode}
				onChangeText={setAccessCode}
				keyboardType="number-pad"
			/>
			<ButtonAtom  onPress={handleNavigate} className="mt-4" disabled={!accessCode.length}>Acessar</ButtonAtom>
		</MainTemplate>
	)
}

export { AuthPage };
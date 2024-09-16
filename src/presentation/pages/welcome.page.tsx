import { Image, View } from "react-native"
import { useNavigation } from "@react-navigation/native";

import { MainTemplate } from "@/presentation/templates/main.template";
import { SeparatorAtom } from "@/presentation/atoms/separator.atom";
import { ButtonAtom } from "@/presentation/atoms/button.atom";
import { TextAtom } from "@/presentation/atoms/text.atom";
import useRole from "@/presentation/hooks/useRole.hook";
import useAuthentication from "@/presentation/hooks/useAuthentication.hook";

type WelcomePage = {}

const WelcomePage: React.FC<WelcomePage> = ({}) => {
	const { navigate } = useNavigation<any>();
	const { logout } = useAuthentication();
	const { setRole } = useRole();

	const handleNavigate = (context: 'barraquinha' | 'caixa') => {
		console.warn('handleNavigate: ', context);
		setRole(context);
		logout()
		navigate('Auth');
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
			<TextAtom size="medium" className="mt-4 text-center">Escolha uma opção para acessar</TextAtom>
			<ButtonAtom onPress={() => handleNavigate('barraquinha')} className="mt-4">Barraquinha</ButtonAtom>
			<ButtonAtom onPress={() => handleNavigate('caixa')} className="mt-1" variant="outline">Caixa</ButtonAtom>
		</MainTemplate>
	)
}

export { WelcomePage };
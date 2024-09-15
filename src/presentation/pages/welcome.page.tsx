import { Image, View } from "react-native"

import { MainTemplate } from "@/presentation/templates/main.template";
import { SeparatorAtom } from "@/presentation/atoms/separator.atom";
import { ButtonAtom } from "@/presentation/atoms/button.atom";
import { TextAtom } from "@/presentation/atoms/text.atom";

type WelcomePage = {}

const WelcomePage: React.FC<WelcomePage> = ({}) => {
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
			<ButtonAtom className="mt-4">Barraquinha</ButtonAtom>
			<ButtonAtom className="mt-1" variant="outline">Caixa</ButtonAtom>
		</MainTemplate>
	)
}

export { WelcomePage };
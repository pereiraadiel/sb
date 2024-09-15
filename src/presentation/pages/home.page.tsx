import { Image, View } from "react-native"
import { useState } from "react";

import { MainTemplate } from "@/presentation/templates/main.template";
import { SeparatorAtom } from "@/presentation/atoms/separator.atom";
import { ButtonAtom } from "@/presentation/atoms/button.atom";
import { TextAtom } from "@/presentation/atoms/text.atom";
import { InputAtom } from "@/presentation/atoms/input.atom";
import { CameraOrganism } from "../organisms/camera.organism";

type HomePage = {}

const HomePage: React.FC<HomePage> = ({}) => {
	const [accessCode, setAccessCode] = useState<string>('');

	return (
		<MainTemplate>
			<View className="flex-1 items-center mt-2">
				<View className="w-full flex-row justify-between items-center">
					<Image 
						source={require('../../assets/sb.png')}
						style={{
							width: 60,
							height: 60,
							resizeMode: 'contain'
						}}
					/>
					<TextAtom size="medium" className="text-end">Bem-vindo ao Festas São Benedito</TextAtom>
				</View>
				<SeparatorAtom className="mt-4"/>
				<CameraOrganism/>
			</View>
			<SeparatorAtom/>
			<ButtonAtom className="mt-4" >Ler ingresso</ButtonAtom>
		</MainTemplate>
	)
}

export { HomePage };
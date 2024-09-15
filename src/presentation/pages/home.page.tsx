import { Image, View } from "react-native"
import { useEffect, useState } from "react";
import { Camera } from 'expo-camera'

import { MainTemplate } from "@/presentation/templates/main.template";
import { SeparatorAtom } from "@/presentation/atoms/separator.atom";
import { ButtonAtom } from "@/presentation/atoms/button.atom";
import { TextAtom } from "@/presentation/atoms/text.atom";
import { CameraOrganism } from "@/presentation/organisms/camera.organism";

type HomePage = {}

const HomePage: React.FC<HomePage> = ({}) => {
	const [shouldShowCamera, setShouldShowCamera] = useState<boolean>(false);
	const [hasPermission, setHasPermission] = useState<boolean>(false);

	const requestCameraPermission = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync();
		setHasPermission(status === 'granted');
		setShouldShowCamera(status === 'granted');
	}

	useEffect(() => {
		(async () => {
			const { status, canAskAgain } = await Camera.getCameraPermissionsAsync();
			setHasPermission(status === 'granted');
			setShouldShowCamera(hasPermission || canAskAgain);
		})();	
	}, []);

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
				
				{shouldShowCamera && (
					<CameraOrganism/>
				)}

			</View>
			<SeparatorAtom/>
			<ButtonAtom className="mt-4" onPress={requestCameraPermission} >Ler ingresso</ButtonAtom>
		</MainTemplate>
	)
}

export { HomePage };
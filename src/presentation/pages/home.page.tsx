import { useCallback, useState } from "react";
import { Image, Linking, View } from "react-native"
import { useFocusEffect } from "@react-navigation/native";
import { Camera } from 'expo-camera';
import { Feather } from '@expo/vector-icons';

import { MainTemplate } from "@/presentation/templates/main.template";
import { SeparatorAtom } from "@/presentation/atoms/separator.atom";
import { ButtonAtom } from "@/presentation/atoms/button.atom";
import { TextAtom } from "@/presentation/atoms/text.atom";
import { CameraOrganism } from "@/presentation/organisms/camera.organism";
import { colors } from "../styles/colors";

type HomePage = {}

const HomePage: React.FC<HomePage> = ({}) => {
	const [shouldShowCamera, setShouldShowCamera] = useState<boolean>(false);
	const [hasPermission, setHasPermission] = useState<boolean>(false);

	const requestCameraPermission = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync();
		setHasPermission(status === 'granted');
		setShouldShowCamera(status === 'granted');
	}

	const handleTicketRead = () => {
		setHasPermission(false);
		setShouldShowCamera(false);
		console.log('requesting camera permission', {
			shouldShowCamera,
			hasPermission
		});
		requestCameraPermission();
	}

	const handleNavigateToSettings = () => {
		Linking.openSettings();
	}

	useFocusEffect(useCallback(() => {
		(async () => {
			setHasPermission(false);
			setShouldShowCamera(false);
		})();	
		console.log('HomeContext', {
			shouldShowCamera,
			hasPermission
		});
	}, []));

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
				
				{shouldShowCamera ? 
					(
						<CameraOrganism/>
					): (
						<View className="bg-gray-primary p-4 mb-2 items-center">
							<TextAtom size="medium" className="text-white-primary mb-6">Acesso à câmera é necessário</TextAtom>
							<View className="w-24 h-24 bg-gray-tertiary rounded-full items-center justify-center">
								<Feather name="camera" size={48} color={colors.accent.primary} />
							</View>
							<TextAtom size="small" className="text-white-primary mt-6">Por favor permita o acesso à sua câmera</TextAtom>
							<TextAtom size="small" className="text-white-primary mt-1 text-center w-64">clique no botão "Abrir câmera" para habilitar a câmera e ler o ingresso.</TextAtom>
							<TextAtom size="small" className="text-white-primary mt-6 text-center w-80">
								Caso não esteja conseguindo ver a câmera, acesse as configurações e verifique se as permissões da câmera foram concedidas.
							</TextAtom>
							<View className="flex-1">
								<ButtonAtom variant="outline" onPress={handleNavigateToSettings} className="mt-4">Acessar configurações</ButtonAtom>
							</View>
						</View>
					)
				}

			</View>
			<SeparatorAtom/>
			<ButtonAtom className="mt-4" onPress={handleTicketRead} >Abrir câmera</ButtonAtom>
		</MainTemplate>
	)
}

export { HomePage };
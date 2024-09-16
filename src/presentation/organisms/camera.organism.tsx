import { View } from "react-native";
import { useCallback, useEffect } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { validateQrCode } from "@/domain/utils/qr.util";
import { TextAtom } from "@/presentation/atoms/text.atom";
import { CameraAtom } from "@/presentation/atoms/camera.atom";
import useQrCode from "@/presentation/hooks/useQrCode.hook";
import useRole from "@/presentation/hooks/useRole.hook";

type CameraOrganism = {}

const CameraOrganism: React.FC<CameraOrganism> = () => {
	const { navigate } = useNavigation<any>();
	const {qrCode, setQrCode } = useQrCode();
	const { role } = useRole();

	useFocusEffect(useCallback(() => {
		setQrCode('');
	}, [setQrCode]));

	useEffect(() => {
		if (qrCode) {
			// Toast.success(qrCode);

			console.log('qrCode: ', qrCode);
			const isValidQr = validateQrCode(qrCode)
			if(!isValidQr) {
				// Toast.error('QR Code inválido');
				console.log('QR Code inválido');
				return;
			}
			if(isValidQr) {
				if(role === 'barraquinha') { 
					navigate('Payment', {qrCode});
					return;
				}
				if(role === 'caixa') {
					navigate('Credit');
					return;
				}
			}
		}
	}, [qrCode]);
	
	return (
		<View className="flex-1 bg-gray-primary items-center">
			<View className="bg-gray-primary mb-2">
				<CameraAtom onCodeScanned={setQrCode}/>
			</View>
			<View className="bg-gray-secondary p-4 mb-2 items-center">
				<TextAtom size="medium" className="text-white-primary">Aponte a câmera para o QR Code do ingresso</TextAtom>
			</View>
		</View>
	)
}

export { CameraOrganism };
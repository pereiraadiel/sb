import { View } from "react-native";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";

import { TextAtom } from "@/presentation/atoms/text.atom";
import { CameraAtom } from "@/presentation/atoms/camera.atom";

type CameraOrganism = {}

const CameraOrganism: React.FC<CameraOrganism> = () => {
	const [qrCode, setQrCode] = useState<string | null>(null);

	useEffect(() => {
		if (qrCode) {
			// Toast.success(qrCode);
		}
	}, [qrCode]);
	
	return (
		<View className="flex-1 bg-gray-primary">
			<View className="bg-gray-primary mb-2">
				<CameraAtom onCodeScanned={setQrCode}/>
			</View>
			<View className="bg-gray-secondary p-4 mb-2 items-center">
				<TextAtom size="medium" className="text-white-primary">Aproxime o QR Code do leitor</TextAtom>
			</View>
		</View>
	)
}

export { CameraOrganism };
import { View, StyleSheet } from "react-native";
import { CameraView } from 'expo-camera/next';
import { Camera } from 'expo-camera';
import { useEffect, useState } from "react";
 
type CameraAtom = {
	onCodeScanned: (data: string) => void;
}

const CameraAtom: React.FC<CameraAtom> = ({ onCodeScanned }) => {
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		if (scanned) {
			setTimeout(() => setScanned(false), 1500);
		}
	}, [scanned]);
	
	return (
		<View className="bg-gray-primary w-96 h-96 border border-red-100">
			<CameraView
				onBarcodeScanned={scanned ? undefined : ({type, data}) => {onCodeScanned(data); setScanned(true);}}
				mode="picture"
				style={StyleSheet.absoluteFillObject}
				barcodeScannerSettings={{
					barcodeTypes: ["qr"],
				}}
			/>
		</View>
	)
};

export { CameraAtom };
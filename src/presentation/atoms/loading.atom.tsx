import { View } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import { colors } from "@/presentation/styles/colors";

type LoadingAtom = {};

const LoadingAtom: React.FC<LoadingAtom> = () => {
	return (
		<View className="w-64 h-64">
			<AntDesign name="loading1" size={48} color={colors.accent.secondary} />
		</View>
	)
}

export { LoadingAtom };
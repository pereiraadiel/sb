import { TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { colors } from "../styles/colors";

type CheckboxAtom = {
	checked: boolean;
	onChange: () => void;
};

const CheckboxAtom: React.FC<CheckboxAtom> = ({ checked, onChange }) => {
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={onChange}>
			<View className={`w-8 h-8 rounded flex items-center justify-center border  ${checked ? 'bg-gray-tertiary border-accent-secondary': 'border-white-tertiary'}`}>
				{checked && <Feather name="check" size={20} color={colors.accent.secondary} /> }
			</View>
		</TouchableOpacity>
	);
};

export { CheckboxAtom };
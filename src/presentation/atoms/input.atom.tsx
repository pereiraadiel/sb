import { Text, TextInput, TextInputProps, View } from "react-native"
import { TextAtom } from "./text.atom";

type InputAtom = {
	label: string;
} & TextInputProps;

const InputAtom: React.FC<InputAtom> = ({label, className, ...rest}) => {
	return (
		<View className="mt-4">
			<TextAtom size="medium" className="text-white-tertiary mb-1">{label}</TextAtom>
			<TextInput 
				className={`w-full min-h-16 text-white-primary bg-gray-secondary rounded-xl px-2 placeholder:text-white-primary/40 ${className}`} 
				{...rest} 
			/>
		</View>
	)
}

export { InputAtom };
import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { TextAtom } from "./text.atom"

type ButtonAtom = {
	variant?: 'outline' | 'filled';
} & TouchableOpacityProps;

const ButtonAtom: React.FC<ButtonAtom> = ({ children, className, disabled, onPress, variant, ...rest}) => {
	const bg = variant === 'outline' ? 'bg-transparent' : 'bg-accent-primary';
	const border = variant === 'outline' ? 'border border-accent-primary' : '';
	const text = variant === 'outline' ? 'text-accent-primary' : 'text-gray-primary';
	return (
		<TouchableOpacity 
			activeOpacity={0.9} 
			className={`w-full p-4 rounded-2xl mt-3 mb-2 flex items-center ${className} ${disabled ? 'bg-gray-secondary' : bg} ${border}`} 
			onPress={disabled ? undefined : onPress}
			{...rest}
			>
			<TextAtom size="medium" className={`${text} ${disabled && 'text-gray-tertiary'}`}>{children}</TextAtom>
		</TouchableOpacity>
	)
}

export { ButtonAtom };
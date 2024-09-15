import { View } from "react-native"

type SeparatorAtom = {
	className?: string;
}

const SeparatorAtom: React.FC<SeparatorAtom> = ({className}) => {
	return <View className={`w-[90%] h-0.5 mx-auto bg-gray-tertiary ${className}`}/>
}

export { SeparatorAtom } 
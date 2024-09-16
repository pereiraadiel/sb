import { View } from "react-native"

import { TextAtom } from "@/presentation/atoms/text.atom"

type HeaderMolecule = {
	title: string;
	subtitle: string;
}

const HeaderMolecule: React.FC<HeaderMolecule> = ({ title, subtitle}) => {
	return (
		<View className="flex-row items-center mb-2 flex justify-between">
			<TextAtom size="large">
				{title}
			</TextAtom>
			<TextAtom size="medium" className="text-white-primary/60">
				{subtitle}
			</TextAtom>
		</View>
	)
}

export { HeaderMolecule };
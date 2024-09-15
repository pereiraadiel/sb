import { View } from "react-native";

import { EMOJIS } from "@/domain/utils/emoji.util";

import { EmojiAtom } from "@/presentation/atoms/emoji.atom";
import { TextAtom } from "@/presentation/atoms/text.atom";

type EmojiSelectionMolecule = {
	emojis: Set<(keyof typeof EMOJIS)>
	onSelect: (emoji: keyof typeof EMOJIS) => void;
	selectedEmoji?: keyof typeof EMOJIS;
}

const EmojiSelectionMolecule: React.FC<EmojiSelectionMolecule> = ({emojis, onSelect, selectedEmoji}) => {
	return (
		<>
			<TextAtom size="medium" className="my-2">Selecione o emoji associado ao bilhete:</TextAtom>
			<View className="flex flex-row gap-2 justify-between">
				{Array.from(emojis).map((emoji, index) => (
					<EmojiAtom key={index} emoji={emoji} onSelect={() => { onSelect(emoji)}} isSelected={selectedEmoji === emoji}/>
				))}
			</View>
		</>
	)
}

export { EmojiSelectionMolecule }
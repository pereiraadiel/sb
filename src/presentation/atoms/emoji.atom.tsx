import { TouchableOpacity } from "react-native";
import { TextAtom } from "./text.atom";
import { EMOJIS } from "@/domain/utils/emoji.util";


type EmojiAtom = {
	emoji: keyof typeof EMOJIS;
	onSelect: (emoji: keyof typeof EMOJIS) => void;
	isSelected?: boolean;
}

const EmojiAtom: React.FC<EmojiAtom> = ({emoji, onSelect, isSelected}) => {
	return (
		<TouchableOpacity activeOpacity={0.9} onPress={() => onSelect(emoji)} className={`w-10 bg-gray-tertiary rounded-lg border p-1 ${isSelected && ' border-accent-secondary'}`}>
			<TextAtom size="large" className="w-8">
				{EMOJIS[emoji]}
			</TextAtom>
		</TouchableOpacity>
	)
}

export { EmojiAtom };
import { TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons'

import { GoodEntity } from "@/domain/entities/good.entity";

import { TextAtom } from "@/presentation/atoms/text.atom";
import { CheckboxAtom } from "@/presentation/atoms/checkbox.atom";

type GoodMolecule = {
	good: GoodEntity;
	selected: boolean;
	onSelect: (good: GoodEntity) => void;
	quantity: number;
	onChangeQuantity: (good: GoodEntity, action: 'add' | 'minus') => void;
}

const GoodMolecule: React.FC<GoodMolecule> = ({ good, selected, onSelect, quantity, onChangeQuantity }) => {
	const handleSelect = () => {
		onSelect(good);
	}

	const toBrlCurrency = (cents: number) => {
		const amount = cents / 100;
		return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
	}

	return (
		<View className="mt-2 bg-gray-secondary rounded-2xl flex gap-2">
			<View className="px-2 bg-gray-secondary py-2 rounded-2xl flex flex-row gap-2 items-center">
				<CheckboxAtom onChange={handleSelect} checked={selected}/>
				<View className="flex-1">
					<TextAtom size='medium'>{good.fullname}</TextAtom>
					<TextAtom size='small' className="text-white-secondary/80" >{good.description}</TextAtom>
				</View>
				<TextAtom size='small' className="text-white-tertiary/70" >{toBrlCurrency(good.priceCents)}</TextAtom>
			</View>

			{selected && (
				<View className="flex flex-row justify-between px-2 mb-2">
					
					<View className="flex flex-row gap-1">
						<TouchableOpacity activeOpacity={0.9} onPress={() => onChangeQuantity(good, 'minus')} className="px-3 py-2 bg-gray-tertiary rounded-full">
							<AntDesign name="minus" size={16} color="white" />
						</TouchableOpacity>

						<TouchableOpacity activeOpacity={0.9} onPress={() => onChangeQuantity(good, 'add')} className="px-3 py-2 bg-gray-tertiary rounded-full">
							<AntDesign name="plus" size={16} color="white" />
						</TouchableOpacity>
					</View>
					
					<View className="gap-2 items-end">
						<TextAtom size="small" className="text-white-tertiary/70">* {quantity}</TextAtom>
						<TextAtom size="small" className="text-white-tertiary/90">{toBrlCurrency(good.priceCents * quantity)}</TextAtom>
					</View>
				</View>
			)}
		</View>
	)
}

export { GoodMolecule };
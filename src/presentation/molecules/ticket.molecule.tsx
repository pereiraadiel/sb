import { View } from "react-native";

import { TicketEntity } from "@/domain/entities/ticket.entity";
import { toBrlCurrency } from "@/domain/utils/currency.util";

import { TextAtom } from "@/presentation/atoms/text.atom";

type TicketMolecule = {
	ticket: TicketEntity;
}

const TicketMolecule: React.FC<TicketMolecule> = ({
	ticket
}) => {
	return (
		<View className="flex justify-between bg-gray-secondary rounded-lg p-2 flex-row">
			<TextAtom size="small" className="text-white-primary/60">Bilhete: {ticket.physicalCode}</TextAtom>
			<TextAtom size="small" className="text-white-primary/60">Saldo: {toBrlCurrency(ticket.balance)}</TextAtom>
		</View>
	)
}

export { TicketMolecule };
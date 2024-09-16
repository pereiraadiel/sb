import { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { TicketEntity } from "@/domain/entities/ticket.entity";
import { toBrlCurrency } from "@/domain/utils/currency.util";
import { MainTemplate } from "@/presentation/templates/main.template";
import { InputAtom } from "@/presentation/atoms/input.atom";
import { ButtonAtom } from "@/presentation/atoms/button.atom";
import { HeaderMolecule } from "@/presentation/molecules/header.molecule";
import { TicketMolecule } from "@/presentation/molecules/ticket.molecule";
import { TextAtom } from "@/presentation/atoms/text.atom";
import useQrCode from "@/presentation/hooks/useQrCode.hook";

type CreditPage = {}

const CreditPage: React.FC<CreditPage> = ({}) => {
	const [ticket, setTicket] = useState<TicketEntity>();
	const [credit, setCredit] = useState<number>(0);
	const [finalTicketAmount, setFinalTicketAmount] = useState<number>(0);
	const { navigate } = useNavigation<any>();
	const { qrCode } = useQrCode();


	const handleNavigate = () => {
		console.log('credit: ', credit)
		navigate('PaymentDone', { balance: finalTicketAmount });
	}

	const fetchTicket = (qrCode: string) => {
		console.log('fetching ticket', qrCode);
		setTicket({
			id: '1',
			balance: 1000,
			phoneNumber: '1234567890',
			physicalCode: qrCode,
		});
	}

	useEffect(() => {
		fetchTicket(qrCode)
	}, [qrCode])

	useEffect(() => {
		if(!ticket) return;
		setFinalTicketAmount(ticket.balance + credit);
	}, [ticket, credit])

	return (
		<MainTemplate>
			<HeaderMolecule title="São Benedito" subtitle="Caixa"/>
			
			{ticket && (
				<TicketMolecule ticket={ticket}/>
			)}
			
			<View className="flex-1 justify-end">
				<InputAtom 
					label="Adicionar créditos:" 
					placeholder="Informe o valor desejado" 
					keyboardType="number-pad"
					value={toBrlCurrency(credit)}
					onChangeText={(value) => setCredit(Number(value.replace('R$', '').replace(',', '')))}
				/>
				<View className="flex-row justify-between">
					<TextAtom size="medium" className="text-white-tertiary mt-2">Saldo Final: </TextAtom>
					<TextAtom size="medium" className="text-white-tertiary mt-2">{toBrlCurrency(finalTicketAmount)}</TextAtom>
				</View>
				<ButtonAtom onPress={handleNavigate} className="mt-4">Adicionar</ButtonAtom>
			</View>
		</MainTemplate>
	)
}

export { CreditPage };
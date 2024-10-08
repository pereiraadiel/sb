import { FlatList, View } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { toBrlCurrency } from "@/domain/utils/currency.util";
import { GoodEntity } from "@/domain/entities/good.entity";
import { EMOJIS } from "@/domain/utils/emoji.util";

import { ButtonAtom } from "@/presentation/atoms/button.atom";
import { SeparatorAtom } from "@/presentation/atoms/separator.atom";
import { TextAtom } from "@/presentation/atoms/text.atom";
import { GoodMolecule } from "@/presentation/molecules/good.molecule";
import { MainTemplate } from "@/presentation/templates/main.template";
import { TicketMolecule } from "@/presentation/molecules/ticket.molecule";
import { EmojiSelectionMolecule } from "@/presentation/molecules/emojiSelection.molecule";
import { HeaderMolecule } from "@/presentation/molecules/header.molecule";
import useTicket from "@/presentation/hooks/useTicket.hook";
import useAuthentication from "@/presentation/hooks/useAuthentication.hook";

type PaymentPage = {}

const PaymentPage: React.FC<PaymentPage> = () => {
	const [goods, setGoods] = useState<GoodEntity[]>([]);
	const [goodQuantity, setGoodQuantity] = useState<{ [key: string]: number }>({});
	const [selectedGoods, setSelectedGoods] = useState<string[]>([]);
  const [total, setTotal] = useState<GoodEntity>(new GoodEntity({ id: "total", category: "Total", fullname: "Total", description: "Total", priceCents: 0 }))
  const [finalTicketAmount, setFinalTicketAmount] = useState<number>(0);
	const [selectedEmoji, setSelectedEmoji] = useState<keyof typeof EMOJIS>();
	const { navigate } = useNavigation<any>();
	const route = useRoute<any>();
	const { qrCode } = route.params;
	const { ticket, getTicketByQr, ticketEmojis, getTicketEmojisForAuthentication, authenticateTicket } = useTicket();
	const { authToken, stand } = useAuthentication();

	if(!authToken) {
		navigate('Welcome');
		return null;
	}

	if(!stand) {
		return null;
	}


  const handleSelect = (good: GoodEntity) => {
		if(!ticket) return;
		setTimeout(() => {
			const index = selectedGoods.indexOf(good.id)
			if (index === -1) {
				if(total.priceCents + good.priceCents > ticket.balance) return;
				setSelectedGoods([...selectedGoods, good.id])
				setGoodQuantity({ ...goodQuantity, [good.id]: 1 });
			} else {
				setSelectedGoods(selectedGoods.filter((id) => id !== good.id))
			}
		}, 50);
  }

	const handleGoodQuantity = (good: GoodEntity, action: 'add' | 'minus') => {
		if(!ticket) return;
		setTimeout(() => {
			const newQuantity = { ...goodQuantity };
			const currentQuantity = newQuantity[good.id] || 0;
			if (action === 'add') {
				if((total.priceCents + good.priceCents) > ticket.balance) return;
				newQuantity[good.id] = currentQuantity + 1;
			} else {
				if(currentQuantity === 1) return;
				newQuantity[good.id] = currentQuantity - 1;
			}
			setGoodQuantity(newQuantity);
		}, 100);

	}

	const handleMakeTransaction = async () => {
		if(!selectedEmoji) return;
		const isTicketAuthenticated = await authenticateTicket(qrCode, selectedEmoji, authToken);
		if(isTicketAuthenticated) {
			console.log('navigating to payment done page');
			navigate('PaymentDone', { balance: finalTicketAmount });
		}
	}

	const fetchGoods  = () => {
		setGoods(stand.goods);
	}

	const fetchTicketEmojis = () => {
		getTicketEmojisForAuthentication(qrCode, authToken);
	}

	const calculateTotal = () => {
		return goods.reduce((acc, good) => {
			if (selectedGoods.includes(good.id)) {
				acc += good.priceCents * (goodQuantity[good.id] || 1);
			}
			return acc
		}, 0);
	}

	const calculateFinalTicketAmount = () => {
		if(!ticket) return 0;
		return ticket.balance - total.priceCents;
	}

	useEffect(() => {
		fetchGoods();
		getTicketByQr(qrCode, authToken);
		fetchTicketEmojis();
	}, []);


	useEffect(() => {
		const newTicketTotal = calculateFinalTicketAmount();
		setFinalTicketAmount(newTicketTotal);
	}, [total])

  useEffect(() => {
    const newTotal = calculateTotal();
    setTotal(new GoodEntity({ id: "total", category: "Total", fullname: "Total", description: "Total", priceCents: newTotal }));
  }, [selectedGoods, goodQuantity]);
	
	return (
		<MainTemplate>
			<HeaderMolecule title='São Benedito' subtitle={stand.fullname}/>

			{ticket && (
				<TicketMolecule ticket={ticket}/>
			)}
			
			<SeparatorAtom className="mt-2 mb-3"/>

			<FlatList
				data={goods}
				keyExtractor={(good) => good.id}
				renderItem={({ item: good }) => (
					<GoodMolecule good={good} quantity={goodQuantity[good.id]} onChangeQuantity={handleGoodQuantity} selected={selectedGoods.includes(good.id)} onSelect={() => handleSelect(good)}/>
				)}
			/>

			{total.priceCents > 0 && (
				<>
					<SeparatorAtom className="mt-4 mb-1"/>
					<View className="flex flex-row justify-between mt-2">
						<TextAtom size="medium">Total</TextAtom>
						<TextAtom size="medium">{toBrlCurrency(total.priceCents)}</TextAtom>
					</View>
					<View className="flex flex-row justify-between mt-2">
						<TextAtom size="small">Saldo após a compra</TextAtom>
						<TextAtom size="small">{toBrlCurrency(finalTicketAmount)}</TextAtom>
					</View>
					{ticketEmojis && (
						<EmojiSelectionMolecule emojis={ticketEmojis} selectedEmoji={selectedEmoji} onSelect={setSelectedEmoji}/>
					)}
					<ButtonAtom onPress={handleMakeTransaction} className="mt-4" disabled={selectedEmoji === undefined}>Finalizar transação</ButtonAtom>
				</>
			)}
		</MainTemplate>
	)
}

export { PaymentPage };
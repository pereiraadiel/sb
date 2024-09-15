import { FlatList, View } from "react-native";
import { useState, useEffect } from "react";

import { GOODS } from "@/domain/utils/goods";
import { toBrlCurrency } from "@/domain/utils/currency.util";
import { GoodEntity } from "@/domain/entities/good.entity";
import { TicketEntity } from "@/domain/entities/ticket.entity";
import { EMOJIS } from "@/domain/utils/emoji.util";

import { ButtonAtom } from "@/presentation/atoms/button.atom";
import { SeparatorAtom } from "@/presentation/atoms/separator.atom";
import { TextAtom } from "@/presentation/atoms/text.atom";
import { GoodMolecule } from "@/presentation/molecules/good.molecule";
import { MainTemplate } from "@/presentation/templates/main.template";
import { TicketMolecule } from "@/presentation/molecules/ticket.molecule";
import { EmojiSelectionMolecule } from "@/presentation/molecules/emojiSelection.molecule";

const PaymentPage = () => {
	const [goods, setGoods] = useState<GoodEntity[]>([]);
	const [goodQuantity, setGoodQuantity] = useState<{ [key: string]: number }>({});
	const [selectedGoods, setSelectedGoods] = useState<string[]>([]);
	const [ticket, setTicket] = useState<TicketEntity>();
	const [ticketEmojis, setTicketEmojis] = useState(new Set<(keyof typeof EMOJIS)>());
  const [total, setTotal] = useState<GoodEntity>(new GoodEntity({ id: "total", category: "Total", fullname: "Total", description: "Total", priceCents: 0 }))
  const [finalTicketAmount, setFinalTicketAmount] = useState<number>(0);
	const [selectedEmoji, setSelectedEmoji] = useState<keyof typeof EMOJIS>();

  const handleSelect = (good: GoodEntity) => {
    const index = selectedGoods.indexOf(good.id)
    if (index === -1) {
      setSelectedGoods([...selectedGoods, good.id])
			setGoodQuantity({ ...goodQuantity, [good.id]: 1 });
    } else {
      setSelectedGoods(selectedGoods.filter((id) => id !== good.id))
    }
  }

	const handleGoodQuantity = (good: GoodEntity, action: 'add' | 'minus') => {
		const newQuantity = { ...goodQuantity };
		const currentQuantity = newQuantity[good.id] || 0;
		if (action === 'add') {
			newQuantity[good.id] = currentQuantity + 1;
		} else {
			if(currentQuantity === 1) return;
			newQuantity[good.id] = currentQuantity - 1;
		}
		setGoodQuantity(newQuantity);
	}

	const fetchGoods  = () => {
		setGoods(GOODS);
	}

	const fetchTicket = () => {
		setTicket(new TicketEntity({ id: "1", physicalCode: "a02fji389", balance: 10000, phoneNumber: "11999999999" }));
	}

	const fetchTicketEmojis = () => {
		for(let i = 0; i < 8; i++) {
			const randomIndex = Math.floor(Math.random() * Object.keys(EMOJIS).length);
			const randomEmoji = Object.keys(EMOJIS)[randomIndex] as keyof typeof EMOJIS;
			setTicketEmojis((prev) => new Set(prev.add(randomEmoji)));
		}
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
		fetchTicket();
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
			<View className="flex-row items-center mb-2 flex justify-between">
				<TextAtom size="large">Tessera</TextAtom>
				<TextAtom size="medium" className="text-white-primary/60">
					Caixa São Benedito
				</TextAtom>
			</View>

			{ticket && (
				<TicketMolecule ticket={ticket}/>
			)}
			
			<SeparatorAtom className="mt-2 mb-3"/>

			<FlatList
				data={GOODS}
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
					<EmojiSelectionMolecule emojis={ticketEmojis} selectedEmoji={selectedEmoji} onSelect={setSelectedEmoji}/>
					<ButtonAtom className="mt-4" disabled={selectedEmoji === undefined}>Finalizar transação</ButtonAtom>
				</>
			)}
		</MainTemplate>
	)
}

export { PaymentPage };
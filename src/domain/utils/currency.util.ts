const toBrlCurrency = (value: number): string => {
  const amount = value / 100;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
};

export { toBrlCurrency };

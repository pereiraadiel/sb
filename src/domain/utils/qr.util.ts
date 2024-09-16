const validateQrCode = (qrCode: string): boolean => {
  const isValidLength = qrCode.length === 10;
  const isHexadecimal = /^[0-9A-F]+$/i.test(qrCode.toUpperCase());

  const isValidQr = isValidLength && isHexadecimal;
  return isValidQr;
};

export { validateQrCode };

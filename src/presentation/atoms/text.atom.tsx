import { Text, TextProps } from 'react-native'

type TextAtom = { size: 'large' | 'medium' | 'small'} & TextProps

const TextAtom: React.FC<TextAtom> = ({ children, className, size = 'small' }) => {
	const sizeClass = size === 'large' ? 'text-2xl font-bold leading-8' : size === 'medium' ? 'text-lg font-medium leading-5' : 'text-sm font-regular leading-4'
	return (
		<Text className={` ${className} text-white-primary ${sizeClass}`}>{children}</Text>
	)
}

export { TextAtom };
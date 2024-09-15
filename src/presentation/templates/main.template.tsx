import { View, StatusBar } from "react-native";

const statusBarHeight = (StatusBar.currentHeight || 0) + 16;

type MainTemplate = {
	children: React.ReactNode | React.ReactElement;
};

const MainTemplate: React.FC<MainTemplate> = ({ children }) => {
	return (
		<View
		 style={{ paddingTop: statusBarHeight }}
		 className="px-4 bg-gray-primary h-full"
		 >
			{children}
		</View>
	)
}

export { MainTemplate };
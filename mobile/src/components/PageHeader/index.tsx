import React from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import logoImage from '../../assets/images/logo.png';

import styles from './styles';

interface Props {
	title: string;
	headerRight?: React.ReactNode;
	children?: React.ReactNode;
}

const PageHeader: React.FC<Props> = ({ title, headerRight, children }) => {
	const { navigate } = useNavigation();

	const handleNavigationBack = () => navigate('Landing');
	return (
		<View style={styles.container}>
			<View style={styles.topBar}>
				<BorderlessButton onPress={handleNavigationBack}>
					<Image source={backIcon} resizeMode='contain' />
				</BorderlessButton>

				<Image source={logoImage} resizeMode='contain' />
			</View>

			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				{headerRight}
			</View>
			{children}
		</View>
	);
};

export default PageHeader;
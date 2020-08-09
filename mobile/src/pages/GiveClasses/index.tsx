import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import giveClassesbackgroundImage from '../../assets/images/give-classes-background.png';

import styles from './styles';


const GiveClasses: React.FC = () => {
	const { goBack } = useNavigation();

	const handleNavigationBack = () => goBack();

	return (
		<View style={styles.container}>
			<ImageBackground
				resizeMode='contain'
				source={giveClassesbackgroundImage}
				style={styles.content}
			>
				<Text style={styles.title}>Quer ser um Proffy?</Text>
				<Text style={styles.description}>
					Para começar, você se cadastrar como professor na nossa plataforma
					web.
				</Text>
			</ImageBackground>
			<RectButton onPress={handleNavigationBack} style={styles.okButton}>
				<Text style={styles.okButtonText}>Tudo bem</Text>
			</RectButton>
		</View>
	);
};

export default GiveClasses;
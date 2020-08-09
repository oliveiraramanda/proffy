import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import api from '../../services/api';

export interface Teacher {
	id: number;
	name: string;
	avatar: string;
	subject: string;
	bio: string;
	cost: number;
	whatsapp: string;
}

interface Props {
	teacher: Teacher;
	favorited: boolean;
}

const TeacherItem: React.FC<Props> = ({ teacher, favorited }) => {
	const [isFavorited, setIsFavorited] = useState(favorited);

	const handleLinkToWhatsapp = async () => {
		await api.post('connections', {
			user_id: teacher.id,
		});

		Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
	};

	const handleToggleFavorite = async () => {
		const favorites = await AsyncStorage.getItem('favorites');
		let favoritesArray = [];
		if (favorites) {
			favoritesArray = JSON.parse(favorites);
		}

		if (isFavorited) {
			const favoriteindex = favoritesArray.findIndex(
				(teacherItem: Teacher) => teacherItem.id === teacher.id
			);

			favoritesArray.splice(favoriteindex, 1);

			setIsFavorited(false);
		} else {
			favoritesArray.push(teacher);

			setIsFavorited(true);
		}
		await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
	};

	return (
		<View style={styles.container}>
			<View style={styles.profile}>
				<Image
					style={styles.avatar}
					source={{
						uri: 'https://avatars2.githubusercontent.com/u/62100844?s=460&u=cdd8ae4fa7bb059bcc357c0826b1e6448d50f719&v=4',
					}}
				/>
				<View style={styles.profileInfo}>
					<Text style={styles.name}>{teacher.name}</Text>
					<Text style={styles.subject}>{teacher.subject}</Text>
				</View>
			</View>
			<Text style={styles.bio}>{teacher.bio}</Text>
			<View style={styles.footer}>
				<Text style={styles.price}>
					Preço/hora {'  '}
					<Text style={styles.priceValue}>R$ {teacher.cost}</Text>
				</Text>
				<View style={styles.buttonContainer}>
					<RectButton
						onPress={handleToggleFavorite}
						style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
					>
						{isFavorited ? (
							<Image source={unfavoriteIcon} />
						) : (
							<Image source={heartOutlineIcon} />
						)}
					</RectButton>
					<RectButton
						style={styles.contactButton}
						onPress={handleLinkToWhatsapp}
					>
						<Image source={whatsappIcon} />
						<Text style={styles.contactButtonText}>Entrar em contato</Text>
					</RectButton>
				</View>
			</View>
		</View>
	);
};

export default TeacherItem;
import React, { useState } from 'react';
import {
	View,
	ScrollView,
	Text,
	TextInput,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import api from '../../services/api';

const TeacherList: React.FC = () => {
	const [isFiltersVisible, setIsFiltersVisible] = useState(false);
	const [favorites, setFavorites] = useState<number[]>([]);
	const [subject, setSubject] = useState('');
	const [week_day, setWeekDay] = useState('');
	const [time, setTime] = useState('');
	const [teachers, setTeachers] = useState([]);

	const loadFavorites = () => {
		AsyncStorage.getItem('favorites').then((res) => {
			if (res) {
				const favoritedTeachers = JSON.parse(res);
				const favoritedTeachersIds = favoritedTeachers.map(
					(teacher: Teacher) => teacher.id
				);
				setFavorites(favoritedTeachersIds);
			}
		});
	};

	const toggleFiltersVisibility = () => {
		setIsFiltersVisible(!isFiltersVisible);
	};

	const searchTeachers = () => {
		loadFavorites();

		api
			.get('classes', {
				params: {
					week_day,
					subject,
					time,
				},
			})
			.then((response) => {
				toggleFiltersVisibility();
				setTeachers(response.data);
			});
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView
				behavior='position'
				keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 20}
			>
				<PageHeader
					title='Proffys disponíveis'
					headerRight={
						<BorderlessButton onPress={toggleFiltersVisibility}>
							<Feather name='filter' size={20} color='#fff' />
						</BorderlessButton>
					}
				>
					{isFiltersVisible && (
						<View style={styles.searchForm}>
							<Text style={styles.label}>Matéria</Text>
							<TextInput
								style={styles.input}
								placeholder='Qual a matéria?'
								placeholderTextColor='#c1bcc'
								value={subject}
								onChangeText={(text) => setSubject(text)}
							/>
							<View style={styles.inputGroup}>
								<View style={styles.inputBlock}>
									<Text style={styles.label}>Dia da semana</Text>
									<TextInput
										style={styles.input}
										placeholder='Qual o dia?'
										placeholderTextColor='#c1bbcc'
										value={week_day}
										onChangeText={(text) => setWeekDay(text)}
									/>
								</View>
								<View style={styles.inputBlock}>
									<Text style={styles.label}>Horário</Text>
									<TextInput
										style={styles.input}
										placeholder='Qual horário?'
										placeholderTextColor='#c1bbcc'
										value={time}
										onChangeText={(text) => setTime(text)}
									/>
								</View>
							</View>
							<RectButton style={styles.submitButton} onPress={searchTeachers}>
								<Text style={styles.submitButtonText}>Filtrar</Text>
							</RectButton>
						</View>
					)}
				</PageHeader>
			</KeyboardAvoidingView>

			<ScrollView
				style={styles.teacherList}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 16,
				}}
			>
				{teachers.map((teacher: Teacher) => (
					<TeacherItem
						key={teacher.id}
						teacher={teacher}
						favorited={favorites.includes(teacher.id)}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default TeacherList;
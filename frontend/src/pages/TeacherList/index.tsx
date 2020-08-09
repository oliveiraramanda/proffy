import React, { useState, FormEvent } from 'react';

import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css';

interface Teacher {
	id: number;
	name: string;
	avatar: string;
	subject: string;
	bio: string;
	cost: number;
	whatsapp: string;
}

const TeacherList: React.FC = () => {
	const [subject, setSubject] = useState('');
	const [week_day, setWeekDay] = useState('');
	const [time, setTime] = useState('');
	const [teachers, setTeachers] = useState([]);

	const searchTeachers = (event: FormEvent) => {
		event.preventDefault();

		api
			.get('classes', {
				params: {
					week_day,
					subject,
					time,
				},
			})
			.then((response) => {
				setTeachers(response.data);
			});
	};

	return (
		<div id='page-teacher-list' className='container'>
			<PageHeader title='Estes são os proffys disponíveis'>
				<form id='search-teachers' onSubmit={searchTeachers}>
					<Select
						label='Matéria'
						name='subject'
						value={subject}
						onChange={(event) => setSubject(event.target.value)}
						options={[
							{ value: 'Artes', label: 'Artes' },
							{ value: 'Biologia', label: 'Biologia' },
							{ value: 'Português', label: 'Português' },
							{ value: 'Inglês', label: 'Inglês' },
							{ value: 'Física', label: 'Física' },
							{ value: 'Química', label: 'Química' },
							{ value: 'Geografia', label: 'Geografia' },
							{ value: 'História', label: 'História' },
							{ value: 'Matemática', label: 'Matemática'},
						]}
					/>

					<Select
						label='Dia da semana'
						name='week_day'
						value={week_day}
						onChange={(event) => setWeekDay(event.target.value)}
						options={[
							{ value: '0', label: 'Domingo' },
							{ value: '1', label: 'Segunda-feira' },
							{ value: '2', label: 'Terça-feira' },
							{ value: '3', label: 'Quarta-feira' },
							{ value: '4', label: 'Quinta-feira' },
							{ value: '5', label: 'Sexta-feira' },
							{ value: '6', label: 'Sábado' },
						]}
					/>

					<Input
						type='time'
						label='Horário'
						name='time'
						value={time}
						onChange={(event) => setTime(event.target.value)}
					/>

					<button type='submit'>Buscar</button>
				</form>
			</PageHeader>

			<main>
				{teachers.map((teacher: Teacher) => (
					<TeacherItem teacher={teacher} key={teacher.id} />
				))}

				{!teachers.length && (
					<span className='search-message'>
						Nenhum professor encontrado com sua pesquisa.
					</span>
				)}
			</main>
		</div>
	);
};

export default TeacherList;
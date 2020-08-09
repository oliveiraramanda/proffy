import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

interface Props {
	teacher: {
		id: number;
		name: string;
		avatar: string;
		subject: string;
		bio: string;
		cost: number;
		whatsapp: string;
	};
}

const TeacherItem: React.FC<Props> = ({ teacher }) => {
	const createNewConnection = () => {
		api.post('connections', {
			user_id: teacher.id,
		});
	};

	return (
		<article className='teacher-item'>
			<header>
				<img src={teacher.avatar} alt={teacher.name} />
				<div>
					<strong>{teacher.name}</strong>
					<span>{teacher.subject}</span>
				</div>
			</header>
			<p>{teacher.bio}</p>
			<footer>
				<p>
					Preço/hora:
					<strong>R$ {teacher.cost}</strong>
				</p>
				<a
					onClick={createNewConnection}
					href={`https://wa.me/${teacher.whatsapp}`}
				>
					<img src={whatsappIcon} alt='whatsapp' />
					Entrar em contato
				</a>
			</footer>
		</article>
	);
};

export default TeacherItem;
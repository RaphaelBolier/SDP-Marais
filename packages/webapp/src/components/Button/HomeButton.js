import { Link } from 'react-router-dom';

import './HomeButton.scss';

import { CustomButton } from '../Button/Button'

export const HomeButton = () => {

	return (
		<>
			<CustomButton tag={Link} to="/Home" className='mx-auto HomeButton' color="secondary">Accueil</CustomButton>
		</>
	);
};

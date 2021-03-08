import {
	Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import './HomeButton.scss';

const HomeButton = () => {

	return (
		<>
			<Button tag={Link} to="/Home" className='mx-auto HomeButton' color="secondary">Accueil</Button>
		</>
	);
};

export default HomeButton;

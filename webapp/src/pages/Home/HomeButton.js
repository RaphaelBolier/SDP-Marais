import {
	Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './Home.scss';


const HomeButton = () => {

	return (
		<>
			<Button tag={Link} to="/Home" className='mx-auto' color="secondary">Accueil</Button>
		</>
	);
};

export default HomeButton;

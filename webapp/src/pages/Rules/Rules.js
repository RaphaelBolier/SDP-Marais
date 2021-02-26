import {
	Container, Card, CardHeader, CardBody,
} from 'reactstrap';
import './Rules.scss';

const GameMenu = () => {

	return (
		<Container className='text-center h-50 Home-container align-middle'>
			<Card>
				<CardHeader>Régles</CardHeader>
				<CardBody className='text-left'>
					<p>1:</p>
					<p>2:</p>
					<p>3:</p>
				</CardBody>
			</Card>


		</Container >
	);
};

export default GameMenu;

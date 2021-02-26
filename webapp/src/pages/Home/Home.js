import {
	Button, Container, Row, Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './Home.scss';


const Index = () => {

	return (
		<Container className="Home">
			<h1 className="text-center">Accueil</h1>
			<Container className='text-center h-50 Home-container align-middle'>
				<Row className='align-middle' xs="2">
					<Col className='my-auto'>
						<Button tag={Link} to="/game/menu" className='mx-auto' color="secondary">Jouer</Button>
					</Col>
					<Col>
						<Button tag={Link} to="/rules" className='mx-auto' color="secondary">Règles</Button>{' '}
					</Col>
				</Row>

			</Container>
		</Container>
	);
};

export default Index;

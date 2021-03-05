import {
	Button, Container, Row, Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './Home.scss';


const Index = () => {

	return (
		<Container className="Home">
			<h1 className="game-title"> Who did it ?</h1>
			<Container>
				<Row>
					<Col>
						<Button tag={Link} to="/game/menu" className="btn-play" color="secondary">Jouer</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button tag={Link} to="/rules" className="btn-rules" color="secondary">Regles</Button>{' '}
					</Col>
				</Row>
			</Container>	
		</Container>
	);
};

export default Index;

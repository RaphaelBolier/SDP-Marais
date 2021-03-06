import { Link } from 'react-router-dom';
import {
	Button, Container, Row, Col,
} from 'reactstrap';

import './Home.scss';


const Index = () => (
	<div className="Home">
	<Container className="HomeContainer">
		<h1 className="game-title"> Who did it ?</h1>
		<Container>
			<Row>
				<Col>
					<Button tag={Link} to="/game/menu" className="btn btn-play" color="secondary"><span>Jouer</span></Button>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button tag={Link} to="/rules" className="btn btn-rules" color="secondary"><span>Regles</span></Button>{' '}
				</Col>
			</Row>
		</Container>	
	</Container>
	</div>
);


export default Index;

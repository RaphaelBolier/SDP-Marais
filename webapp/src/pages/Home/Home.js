import { Link } from 'react-router-dom';
import {
	Container, Row, Col,
} from 'reactstrap';

import { CustomButton } from '../../components/Button/Button'


import './Home.scss';


const Index = () => (
	<div className="Home">
	<Container className="HomeContainer">
		<h1 className="game-title"> Who did it ?</h1>
		<Container>
			<Row>
				<Col>
					<CustomButton tag={Link} to="/game/menu" className="btn btn-play" color="secondary"><span>Jouer</span></CustomButton>

				</Col>
			</Row>
			<Row>
				<Col>
					<CustomButton tag={Link} to="/rules" className="btn btn-rules" color="secondary"><span>Regles</span></CustomButton>

				</Col>
			</Row>
			<Row>
				<Col>
					<CustomButton tag={Link} to="/controls" className="btn btn-controls" color="secondary"><span>Controles</span></CustomButton>
				</Col>
			</Row>
		</Container>	
	</Container>
	</div>
);


export default Index;

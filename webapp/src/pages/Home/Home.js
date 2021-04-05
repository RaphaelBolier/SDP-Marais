import { Link } from 'react-router-dom';
import {
	Container, Row, Col,
} from 'reactstrap';

import { CustomButton } from '../../components/Button/Button'
import homeVideo from '../../assets/background/homeParticle.webm';

import './Home.scss';


const Index = () => {
	return (
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
			<video className="HomeVideo" autoPlay loop muted>
				<source src={homeVideo} type="video/mp4" />
			</video>
		</div>
	);
};


export default Index;

import { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';
import {
	Alert,
	Container,
	Button,
	Row,
	Col,
} from 'reactstrap';
import PlayerContext from '../../components/Player/PlayerContext';

import { PlayerName } from '../../components/Player/PlayerName'

import './GameMenu.scss';

const GameMenu = () => {
	const history = useHistory();
	const { player } = useContext(PlayerContext)


	const handleClickCreateGame = () => {
		if (player.name) {
			setShowAlert(false);
			history.push('/game/menu/create');
		} else {
			setShowAlert(true);
		}
	};

	const handleClickJoinGame = () => {
		if (player.name) {
			setShowAlert(false);
			history.push('/game/menu/join');
		} else {
			setShowAlert(true);
		}
	};

	const [showAlert, setShowAlert] = useState(false);

	return (
		<div className="GameMenu">
			<Container className="GameMenuContainer">

				<PlayerName />
				<Container className='text-center h-50 Home-container align-middle'>
					<Container>
						<Row>
							<Col>
								<Button onClick={handleClickCreateGame} className="btn btn-play"><span>Créer une partie</span></Button>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button onClick={handleClickJoinGame} className="btn btn-rules"><span>Trouver une partie</span></Button>{' '}
							</Col>
						</Row>
					</Container>
					{showAlert && (
						<Alert color="danger">Veuillez rentrer un pseudo</Alert>
					)}
				</Container>
			</Container>
		</div>
	);
};

export default GameMenu;

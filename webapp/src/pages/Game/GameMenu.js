import { useState } from 'react';
import {
	Container, Card, CardHeader, CardBody,
} from 'reactstrap';
import './GameMenu.scss';

const GameMenu = () => {

	const [playerName, setPlayerName] = useState('');
	console.log(playerName);


	const handlePlayerName = (event) => {
		setPlayerName(event.target.value);
		console.log(playerName);

	}

	const handleSubmit = (event) => {
		alert('Le nom a été soumis : ' + playerName);
		event.preventDefault();
	  }
	return (
		<Container className="GameMenu">
			<h1 className="text-center">Game</h1>
			<Container className='text-center h-50 Home-container align-middle'>
				<Card>
					<CardHeader>
						<form onSubmit={handleSubmit}>
							<label>
								Pseudo : <input type="text" value={playerName} onChange={handlePlayerName} />
							</label>
							<br/>
							<input type="submit" value="Valider" />
						</form>
					</CardHeader>
					<CardBody>

					</CardBody>
				</Card>

			</Container>
		</Container>
	);
};

export default GameMenu;

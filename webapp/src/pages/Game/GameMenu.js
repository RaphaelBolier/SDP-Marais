import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Container,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Button,
	Table,
} from 'reactstrap';

import './GameMenu.scss';

const GameMenu = () => {
	const history = useHistory();
	const [playerName, setPlayerName] = useState('');
	const [games, setGames] = useState([]);	

	const handlePlayerName = (event) => {
		setPlayerName(event.target.value);
		console.log(playerName);
	}

	const handleSubmit = (event) => {
		alert('Le nom a été soumis : ' + playerName);
		event.preventDefault();
	}
	
	const handleClickCreateGame = () => {
		history.push('/game/menu/create');
	}

	useEffect(() => {
		fetch('http://localhost:3000/game/',{
            method: 'GET',
            crossDomain:true,
            headers: {'Content-Type':'application/json'},
            mode: 'cors',
        }).then((resp) => resp.json())
        .then((resp) => {            
            if(!resp.error) {
                setGames((prevState) => [...prevState, ...resp]);
            }
        });
	}, []);

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
						<Table dark>
							<thead>
								<tr>
								<th>#</th>
								<th>Nom de la partie</th>
								<th>Nombre de joueurs</th>	
								<th></th>							
								</tr>
							</thead>
							<tbody>								
								{games && (
									games.map((game, index) => {
										return (
											<tr key={index}>
												<th scope="row">{index}</th>
												<td>{game.name}</td>
												<td>{game.players.length}</td>	
												<td>
													<Button color="info" onClick={() => { console.log("join: ", game)}}>
														Rejoindre
													</Button>
												</td>																							
											</tr>
										)
									})
								)}
							</tbody>
						</Table>
					</CardBody>
				</Card>
				<CardFooter>
					<Button color="info" onClick={handleClickCreateGame}>
						Créer une partie
					</Button>
				</CardFooter>
			</Container>
		</Container>
	);
};

export default GameMenu;

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
	Alert,
	Input,
} from 'reactstrap';
import { useSockets } from '../../components/wsapi/WSockets'; 

import './GameMenu.scss';

const GameMenu = () => {
	const { id } = useSockets();
	const history = useHistory();
	const [playerName, setPlayerName] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [games, setGames] = useState([]);

	const handlePlayerName = (event) => {
		setPlayerName(event.target.value);
		setShowAlert(false);
		console.log(playerName);
	}

	const handleSubmit = (event) => {
		alert('Le nom a été soumis : ' + playerName);
		event.preventDefault();
	}
	
	const handleClickCreateGame = () => {
		history.push('/game/menu/create');
	}

	const handleJoinGame = (game) => {
		if (!playerName) {
			setShowAlert(true);
			return;
		}
        //TODO: fix console error		
        fetch(`http://localhost:3000/game/${game.id}`,{
            method: 'POST',
            crossDomain:true,
            headers: {'Content-Type':'application/json'},
            mode: 'cors',
            body: JSON.stringify({
                clientId: id,
            }),
        }).then((resp) => resp.json())
        .then((resp) => {            
            if(resp.error) {
                console.log('error: ', resp);
            } else {
                alert('Partie: ' + resp.gameId);
            }
        })
    };

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
						<p className="d-inline mr-2">Pseudo: </p>
						<Input className="p-1 d-inline h-100 w-25 ml-auto mr-auto" type="text"  onChange={handlePlayerName} />						
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
													<Button color="info" onClick={() => handleJoinGame(game)}>
														Rejoindre
													</Button>
												</td>																							
											</tr>
										)
									})
								)}
							</tbody>
						</Table>
						{!playerName && showAlert && (
							<Alert color="danger">
								"Veuillez rentrez votre pseudo !"
							</Alert>
						)}
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

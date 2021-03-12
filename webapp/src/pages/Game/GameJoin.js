import { useEffect, useState, useContext } from 'react';

import {
	Container,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Button,
	Table,
	Alert,
} from 'reactstrap';

import PlayerContext from '../../components/Player/PlayerContext';


import { useSockets } from '../../components/wsapi/WSockets'; 


const GameJoin = () => {
	const { id } = useSockets();
	const [games, setGames] = useState([]);
	const [showAlert, setShowAlert] = useState(false);
	const [error, setError] = useState(undefined);
	const { player } = useContext(PlayerContext);

	const handleJoinGame = (game) => {
		if (!player.name) {
			setShowAlert(true);
			return;
		}
        //TODO: fix console error		
        fetch(`http://localhost:3001/game/${game.id}`,{
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
                setError(resp.msg);
            } else {
                alert('Partie: ' + resp.gameId);
            }
        })
    };


	useEffect(() => {
		fetch('http://localhost:3001/game/',{
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
		<Container className="GameJoin">
			<Container className='text-center h-50 Home-container align-middle'>
				<Card>
					<CardHeader>
				
					</CardHeader>
					<CardBody>
					<br/>
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
													<Button color="secondary" onClick={() => handleJoinGame(game)}>
														Rejoindre
													</Button>
												</td>																							
											</tr>
										)
									})
								)}
							</tbody>
						</Table>
						{!player.name && showAlert && (
							<Alert color="danger">
								Veuillez rentrez votre pseudo !
							</Alert>
						)}
						{error && (
							<Alert color="danger">
								{error}
							</Alert>
						)}
					</CardBody>
				</Card>
				<CardFooter>

				</CardFooter>
			</Container>
		</Container>
	);
};

export default GameJoin;
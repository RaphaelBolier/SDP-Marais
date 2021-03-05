import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Container,
	Card,
	CardHeader,
	CardBody,	
	Button,
    Form,
    FormGroup,
    Label,
    Input,
    CardFooter,
    Alert,
} from 'reactstrap';
import './GameMenu.scss';

const GameMenu = () => {
	const history = useHistory();    
	const [game, setGame] = useState({
        name: '',
        isPublic: true,
        map: 'default',
    });
    const [error, setError] = useState(false);

	const handleGameNameChanged = (event) => {
		setGame((prevState) => ({
            ...prevState,
            name: event.target.value,
        }));
	}

	const handleGameModeChanged = (e) => {
		setGame((prevState) => ({
            ...prevState,
            isPublic: e.target.value === 'public',
        }));
	}

    const handleSubmit = async () => {
        //TODO: fix console error
        const response = await fetch('http://localhost:3000/game/',{
            method: 'POST',
            crossDomain:true,
            headers: {'Content-Type':'application/json'},
            mode: 'cors',
            body: JSON.stringify({
                id: 'my id',
                gameName: game.name,
            }),
        });
        setError(!response.ok);
    };

	return (
		<Container className="GameMenu">
			<h1 className="text-center">Game</h1>			
            <Card>
                <CardHeader>
                    <h3>Créer une partie</h3>
                </CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup onChange={handleGameNameChanged}>
                            <Label for="gameName">Nom de la partie :</Label>
                            <Input style={{ maxWidth: '250px' }} type="text" name="gameName" id="exampleEmail" placeholder="Partie de Michel" />
                        </FormGroup>
                        <FormGroup tag="fieldset">
                            <legend>Paramètres - Mode de la partie</legend>
                            <FormGroup check>
                            <Label check>
                                <Input disabled onChange={handleGameModeChanged} checked={game.isPublic} value="public" type="radio" />{' '}
                                Publique
                            </Label>
                            </FormGroup>
                            <FormGroup check>
                            <Label check>
                                <Input disabled onChange={handleGameModeChanged} checked={!game.isPublic} value="private" type="radio" />{' '}
                                Privé
                            </Label>
                            </FormGroup>                            
                        </FormGroup>
                        <h3>Choix de la map</h3>
                        <p className="ml-3">Comming soon...</p>                                        
                        </Form>
                        {error && (
                            <Alert color="danger">
                                Une erreur s'est produite. veuillez réessayer.
                            </Alert>
                        )}
                </CardBody>
                <CardFooter>
                    <Button className="d-flex ml-auto mr-0" onClick={handleSubmit}>Valider</Button>
                </CardFooter>
            </Card>		
		</Container>
	);
};

export default GameMenu;

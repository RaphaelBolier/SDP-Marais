import { useState } from 'react';
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    CardFooter,
    Alert,
} from 'reactstrap';

import './GameMenu.scss';

import { CustomButton } from '../../components/Button/Button';
 
import { useSockets } from '../../components/wsapi/WSockets';

const GameMenu = () => {
    const { id } = useSockets();

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

    const handleSubmit = () => {
        //TODO: fix console error
        fetch('http://localhost:3001/game/', {
            method: 'POST',
            crossDomain: true,
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
                id,
                gameName: game.name,
                isPublic: game.isPublic,
            }),
        }).then((resp) => resp.json())
            .then((resp) => {
                if (resp.error) {
                    setError(resp.msg);
                } else {
                    alert('Partie créée: ' + resp.gameId);
                }
            })
    };

    return (
        <Container className="GameCreate">
			{/* <PlayerName/> */}
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
                                    <Input onChange={handleGameModeChanged} checked={game.isPublic} value="public" type="radio" />{' '}
                                Publique
                            </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input onChange={handleGameModeChanged} checked={!game.isPublic} value="private" type="radio" />{' '}
                                Privé
                            </Label>
                            </FormGroup>
                        </FormGroup>
                        <h3>Choix de la map</h3>
                        <p className="ml-3">Comming soon...</p>
                    </Form>
                    {error && (
                        <Alert color="danger">
                            {error}
                        </Alert>
                    )}
                </CardBody>
                <CardFooter>
                    <CustomButton className="d-flex ml-auto mr-0" onClick={handleSubmit}>Valider</CustomButton>
                </CardFooter>
            </Card>
        </Container>
    );
};

export default GameMenu;

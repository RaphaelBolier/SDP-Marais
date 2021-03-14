import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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

import { CustomButton } from '../../components/Button/Button';
 
import { useSockets } from '../../components/wsapi/WSockets';

import './GameCreate.scss';

const GameMenu = () => {
    const { id } = useSockets();
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
                    history.push(`/game/${resp.gameId}`);
                }
            })
    };

    return (
        <div className="createParty">
        <Container className='text-center h-50 Home-container align-middle'>
            <Card className="gameCreate-card">
                <CardHeader>
                    <h1 className="gameCreate-title">Creer une partie</h1>
                </CardHeader>
                <CardBody className='text-left'>
                    <Form>
                        <FormGroup onChange={handleGameNameChanged}>
                            <h2>Nom de la partie :</h2>
                            <Input style={{ maxWidth: '250px' }} type="text" name="gameName" id="exampleEmail" placeholder="Partie de Michel" />
                        </FormGroup>
                        <FormGroup tag="fieldset">
                            <h2>Mode</h2>
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
                        <h2>Map</h2>
                        <p className="ml-3">Comming soon...</p>
                    </Form>
                    {error && (
                        <Alert color="danger">
                            {error}
                        </Alert>
                    )}
                </CardBody>
                <CardFooter>
                    <CustomButton className="valid-btn d-flex ml-auto mr-0" onClick={handleSubmit}>Valider</CustomButton>
                </CardFooter>
            </Card>
        </Container>
        </div>
    );
};

export default GameMenu;

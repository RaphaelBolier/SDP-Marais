import { useState } from "react";
import { useHistory } from "react-router-dom";
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
} from "reactstrap";

import { CustomButton } from "../../components/Button/Button";
import { useSockets } from "../../components/wsapi/WSockets";
import { usePlayer } from "../../components/Player/PlayerContext";

import "./GameCreate.scss";

const GameMenu = () => {
  const { id } = useSockets();
  const { player } = usePlayer();
  const history = useHistory();

  const [game, setGame] = useState({
    name: "",
    isPublic: true,
    map: "default",
  });
  const [error, setError] = useState(false);

  const handleGameNameChanged = (event) => {
    setGame((prevState) => ({
      ...prevState,
      name: event.target.value,
    }));
  };

  const handleGameModeChanged = (e) => {
    setGame((prevState) => ({
      ...prevState,
      isPublic: e.target.value === "public",
    }));
  };
  console.log(game.name.length);
  const handleSubmit = () => {
    if (game.name.length <= 0) {
      setError("Veuillez entrer un nom pour la partie");
    } else {
      fetch("http://localhost:3001/game/", {
        method: "POST",
        crossDomain: true,
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({
          id,
          gameName: game.name,
          isPublic: game.isPublic,
          playerName: player.name,
        }),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.error) {
            setError(resp.msg);
          } else {
            history.push(`/game/${resp.gameId}`);
          }
        });
    }
  };

  return (
    <div className="createParty">
      <Container className="text-center h-50 Home-container align-middle">
        <Card className="gameCreate-card">
          <CardHeader>
            <h1 className="gameCreate-title">Creer une partie</h1>
          </CardHeader>
          <CardBody className="text-left">
            <Form>
              <FormGroup onChange={handleGameNameChanged}>
                {/* <h2>Nom de la partie :</h2>
                            <Input style={{ maxWidth: '250px' }} type="text" name="gameName" id="exampleEmail" placeholder="Partie de Michel" /> */}
                <div class="input_field">
                  <input
                    type="input"
                    class="form__field"
                    placeholder="Partie de Michel"
                    name="gameName"
                    id="exampleEmail"
                    required
                  />
                  <label for="name" class="form__label">
                    Nom de la partie
                  </label>
                </div>
              </FormGroup>
              <FormGroup tag="fieldset">
                <h2>Partie</h2>
                <FormGroup check>
                  <Label check>
                    <Input
                      onChange={handleGameModeChanged}
                      checked={game.isPublic}
                      value="public"
                      type="radio"
                    />{" "}
                    Publique
                  </Label>
                </FormGroup>
              </FormGroup>
              <h2>Map</h2>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={handleGameModeChanged}
                    checked={game.isPublic}
                    value="public"
                    type="radio"
                  />{" "}
                  Manoir
                </Label>
              </FormGroup>
            </Form>
            {error && <Alert color="danger">{error}</Alert>}
          </CardBody>
          <CardFooter>
            <CustomButton
              className="valid-btn d-flex ml-auto mr-0"
              onClick={handleSubmit}
            >
              Valider
            </CustomButton>
          </CardFooter>
        </Card>
      </Container>
    </div>
  );
};

export default GameMenu;

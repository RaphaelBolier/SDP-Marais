import { Container, Card, CardHeader, CardBody } from "reactstrap";
import "./Rules.scss";

const GameMenu = () => {
  return (
    <div className="Rules">
      <Container className="text-center h-50 Home-container align-middle">
        <Card className="pipou">
          <CardHeader>
            <h1 className="rules-title">Regles</h1>
          </CardHeader>
          <CardBody className="text-left">
            <h2>But du jeu </h2>
            <p>
              {" "}
              Le jeu est très simple : il y a des survivants appelés « Innocents
              » et un tueur appelé « imposteur ». Le but des innocents est de
              survivre et de trouver l'imposteur. Quant à l'imposteur, il doit
              essayer de tuer tous les innocents.
            </p>
            <p>La partie est découpée en plusieurs phases :</p>
            <ul>
              <li>
                <b>Missions : </b>
                <span>
                  Au début de cette phase les joueurs apparaissent sur la carte
                  et sont libres de se déplacer librement, L'imposteur devra
                  alors se faire passer pour un joueur innocent tout en
                  éliminant les différents innocents qu'il croisera.
                </span>
              </li>
              <li>
                <b>Interrogatoire : </b>
                <span>
                  Si un joueur découvre la dépouille d'un autre joueur le jeu
                  passe en phase d'interrogatoire. Les joueurs vont alors
                  débattre entre eux afin de trouver l'imposteur. Le joueur
                  ayant le plus de vote à l'issu du débat sera eliminé.
                  L'imposteur devra alors gagner la confiance des autres joueurs
                  afin de ne pas se faire éliminer à l'issu du vote.
                </span>
              </li>
            </ul>
            <h2>Conditions de victoire : </h2>
            <ul>
              <li>
                Si les <b> innocents</b> ont trouvé <b>l'imposteur</b>, ils gagnent la partie.
              </li>
              <li>Si <b>l'imposteur</b> tue tous les <b>innocents</b>, il remporte la partie.</li>
            </ul>
            <h2>Roles :</h2>
            <ul>
              <li>Imposteur :</li>
              <ul>
                <li>
                  Il a une meilleure vision, il peut donc voir dans le noir et
                  plus loin que les joueurs <b>Innocents</b>.
                </li>
                <li>
                  Il peut éliminer les joueurs <b>Innocents</b>.
                </li>
                <li>
                  Il peut eteindre et rallumer la <b>lumière</b> des autres
                  joueurs.
                </li>
              </ul>
              <li>Innocent :</li>
              <ul>
                <li>
                  Il a une vision basique, il a donc du mal à voir dans le noir.
                </li>
                <li>
                  Il peut rallumer la <b>lumière</b>.
                </li>
              </ul>
            </ul>
            <h2>Evenements :</h2>
            <p>
              Lorsque l'imposteur eteint la <b>lumière</b>, l'innocent doit faire une mission pour rallumer la <b>lumière</b>.{" "}
            </p>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default GameMenu;

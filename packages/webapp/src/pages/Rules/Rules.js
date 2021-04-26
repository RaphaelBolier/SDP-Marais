import {
	Container, Card, CardHeader, CardBody,
} from 'reactstrap';
import './Rules.scss';

const GameMenu = () => {

	return (
		<div className="Rules">
		<Container className='text-center h-50 Home-container align-middle'>
			<Card className="pipou">
				<CardHeader>
					<h1 className="rules-title">Regles</h1>
				</CardHeader>
				<CardBody className='text-left'>
					<h2>But du jeu </h2>
					<p> Le jeu est très simple : il y a des survivants appelés  « Innocents »
					et des tueurs appelés « imposteurs ».
					Le but des innocents est de survivre tout en faisant des missions éparpillées sur la carte.
					Quant aux imposteurs, ils doivent essayer de tuer tous les innocents.</p>
					<p>La partie est découpée en plusieurs phases :</p>
					<ul>
						<li>
							<b>Missions : </b>
							<span>
								Au début de cette phase les joueurs apparaissent sur la carte et sont libres de se déplacer librement, des "missions"
								sont attribuées aux innocents, l'objectif étant d'effectuer le plus de missions possibles.
								Les imposteurs devront alors se faire passer pour un joueur innocent tout en éliminant les différents innocents qu'ils croiseront.
							</span>
						</li>
						<li>
							<b>Interrogatoire : </b>
							<span>
								Si un joueur découvre la dépouille d'un autre joueur le jeu passe en phase d'interrogatoire.
								Les joueurs vont alors débattre entre eux afin de trouver les imposteurs.
								Le joueur ayant le plus de vote à l'issu du débat sera elliminé.
								Les imposteurs devront alors gagner la confiance des autres joueurs afin de ne pas se faire éliminer à l'issu du vote.
						</span>
						</li>
					</ul>
					<h5>Conditions de victoire Innocent : </h5>
					<span>Si les innocents ont trouvé le tueur ou si la partie est arrivée à son terme et qu'il reste plus d'imposteurs, les innocents gagnent la partie.</span>
					<h5>Condition de victoire Imposteur : </h5>
					<span>Si le nombre d'imposteurs est supérieur au nombre d'innocent le ou les imposteurs remportent la partie.</span>
					<h2>Roles :</h2>
					<ul>
						<li>Imposteur :</li>
						<ul>
							<li>
								Il a une meilleure vision, il peut donc voir dans le noir et plus loin que les joueurs <b>Innocents</b>.
							</li>
							<li>
								Il peut éliminer les joueurs <b>Innocents</b>.
							</li>
							<li>
								Il peut rallumer la <b>lumière</b>.
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
					<h2>Evenements  :</h2>
						<p>L'Imposteur peut éteindre la <b>lumière</b>.</p>
						<p>L'innocent doit faire une mission pour rallumer la <b>lumière</b>. </p>
				</CardBody>
			</Card>
		</Container >
		</div>
	);
};

export default GameMenu;

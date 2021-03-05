import {
	Container, Card, CardHeader, CardBody,
} from 'reactstrap';
import './Rules.scss';

const GameMenu = () => {

	return (
		<Container className='text-center h-50 Home-container align-middle'>
			<Card>
				<CardHeader>
					<h1>Regles de Who did it?!</h1>
				</CardHeader>
				<CardBody className='text-left'>
					<h2>But du jeu </h2>
					<p> Le jeu est très simple : il y a des survivant appelés  « Innocents »
					et des tueur appelés « imposteurs ».
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
								Si un joueur découvre la dépouille d'un autre joueur ou s'il a demandé une réunion d'urgence le jeu passe en phase d'interrogatoire.
								Les joueurs vont alors débattre entre eux afin de trouver les imposteurs.
								Le joueur ayant le plus de vote à l'issu du débat sera elliminé.
								Les imposteurs devront alors gagner la confiance des autres joueurs afin de ne pas se faire éliminer à l'issu du vote.
						</span>
						</li>
					</ul>
					<h5>Condition de victoire Innocent : </h5>
					<span>Si toutes les missions ont été effectuées ou s'il ne reste plus d'imposteurs les innocents gagnent la partie.</span>
					<h5>Condition de victoire Imposteur : </h5>
					<span>Si le nombre d'imposteurs est supérieur au nombre d'innocent le ou les imposteurs remportent la partie.</span>
					<h2>Rôles :</h2>
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
								Il ne peut pas effectuer de <b>Missions</b>.
							</li>
							<li>
								Il peut déclencher des <b>Urgences</b> mais ne pas les résoudres.
							</li>
							<li>
								Il peut interragir avec certains des éléments de la carte (Raccourcis, cachette, porte...).
							</li>
						</ul>
						<li>Innocent :</li>
						<ul>
							<li>
								Il a une vision basique, il a donc du mal à voir dans le noir.
							</li>
							<li>
								Il peut effectuer des <b>Missions</b>.
							</li>
							<li>
								Il peut résoudre des <b>Urgences</b>.
							</li>
							<li>
								Il ne peut pas interagir avec certains des éléments de la carte (Raccourcis, cachette, porte...).
							</li>
						</ul>
					</ul>
					<h2>Missions :</h2>
						<p>Tâches que doivent effectuer les joueurs <b>Innocents</b>.</p>
						<p>Elles peuvent s'apparenter à des énigmes ou un enchainement d'actions simples.</p>
					<h2>Urgences :</h2>
					<p>Tâches déclenchées par les joueurs <b>Imposteurs</b>.</p>
					<p>Elles peuvent s'apparenter à des énigmes ou un enchainement d'actions simples.</p>
					<p>Selon l'urgence, la tâche doit être résolue dans une limite de temps sinon cela pourrait entrainer la mort des joueurs innocents</p>
				</CardBody>
			</Card>


		</Container >
	);
};

export default GameMenu;

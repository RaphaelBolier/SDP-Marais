import { useState } from 'react';
import {
	Container, Card, CardHeader, CardBody, Input, Form, FormGroup, Label
} from 'reactstrap';
import { usePlayer } from '../../components/Player/PlayerContext';
import controlsVideo from '../../assets/background/controls.webm';
import './Controls.scss';

const Controls = () => {
	const playerConfig = usePlayer();

	const [globalVolume, setGlobalVolume] = useState(playerConfig.player.sound);
	const control = {
		up: {
			name: 'Avancer',
			key: 'Z'
		},
		down: {
			name: 'Reculer',
			key: 'S'
		},
		left: {
			name: 'Aller à gauche',
			key: 'Q'
		},
		right: {
			name: 'Aller à droite',
			key: 'D'
		},
		use: {
			name: 'Interagir',
			key: 'E'
		},
		report: {
			name: 'Reporter',
			key: 'R'
		}
	}

	const toggleFullScreen = (input) => {
		input.target.checked ?  document.documentElement.requestFullscreen() : document.exitFullscreen();
	}

	const handleGlobalVolume = (input) => {
		setGlobalVolume(playerConfig.setPlayer((prevState) => ({...prevState, sound: input.target.value })));
	}

	return (
		<div className="Controls">
		<Container className='text-center h-50 Home-container align-middle'>
			<Card className="pipou">
				<CardHeader>
					<h1 className="controls-title">Controles</h1>

				</CardHeader>
				<CardBody className='text-left'>
					<Form>
						<FormGroup check>
						<h2>Video </h2>
        			<Label check>
        			  <Input type="checkbox" onChange={toggleFullScreen}/>
        			  <b>plein écran </b>
        			</Label>
      			</FormGroup>
					<h2>Controles </h2>
          <ul>
						{
							Object.keys(control).map(key => {
								return 	(
									<li key={key}>
										{control[key].name} :
										<b> {control[key].key}</b>
									</li>
								);
							})
						}

					</ul>

					<h2>Audio </h2>
					<FormGroup>
      		  <Label>Volume global</Label>
      		  <Input type="range"  min="0" step="0.01" max="1" className="slider" value={globalVolume} onChange={handleGlobalVolume} />
      		</FormGroup>
					</Form>
				</CardBody>
			</Card>
		</Container >
		<video className="ControlsVideo" autoPlay loop muted>
				<source src={controlsVideo} type="video/mp4" />
			</video>
		</div>
	);
};

export default Controls;

import {
	Button,
} from 'reactstrap';
import useSound from 'use-sound';

//sound
import hoverSound from '../../assets/sound/hover.mp3';
import onPageChange from '../../assets/sound/effects/door_thunder_waterdrop_walkStone_ghostBreath.mp3';

export const CustomButton = ( props ) => {

	const [playHover, { stop }] = useSound(
		hoverSound,
		{ volume: 0.2 }
	);

	const effect = props.soundEffect;

	const [play]  = useSound(onPageChange, {
		volume:0.2,
		sprite: {
		  door: [0, 4800],
		  thunder: [5000, 5150],
		  waterDrop: [10001, 7500],
		  walkOnStone: [18000, 3000],
		  ghostBreath: [21000, 8000],
		},
	  });

	  const handleClick = () => {
		  if(effect){
			play({ id: effect })  
		  }
	  }


	return (
		<Button onMouseDown={handleClick} onMouseEnter={playHover} onMouseLeave={stop} {...props} />
	);
};

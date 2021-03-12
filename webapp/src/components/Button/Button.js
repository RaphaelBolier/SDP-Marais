import {
	Button,
} from 'reactstrap';
import useSound from 'use-sound';

//sound
import hoverSound from '../../assets/sound/hover.mp3';

export const CustomButton = ( props ) => {

	const [playHover, { stop }] = useSound(
		hoverSound,
		{ volume: 0.2 }
	);

	return (
		<Button onMouseEnter={playHover} onMouseLeave={stop} {...props} />
	);
};

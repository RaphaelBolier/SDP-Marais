import { useHistory } from 'react-router-dom';
import { CustomButton } from './Button'
import './ReturnButton.scss';

export const ReturnButton = () => {
	const history = useHistory();
	const goBack = () => {
		history.goBack()
	}

	return (
			<CustomButton onClick={goBack} className='mx-auto ReturnButton bg-transparent'> </CustomButton>
	);
};

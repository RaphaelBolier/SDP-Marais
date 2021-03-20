import React, {
	createContext,
	useContext,
	useMemo,
    useCallback,
    useState,
    useEffect,
} from 'react';
import useSound from 'use-sound';

import joinSound from '../../assets/sound/game/join.mp3';


const Audio = createContext({});
export const useAudios = () => useContext(Audio);

export const AudiosProvider = ({ children }) => {
    const audioIds = useMemo(() => ({
        JOIN: 0,
    }), []);

    const [join] = useSound(joinSound, { volume: 1.0, interrupt: true });

    const playAudio = useCallback(async (id) => {
        switch(id) {
            case audioIds.JOIN:
                join();
            break;
            default: return;
        };
    }, [audioIds, join]);


	const value = useMemo(() => ({
		playAudio,
        audioIds,
	}), [
		playAudio,
        audioIds,
	]);

	return (
		<Audio.Provider value={value}>
			{children}
		</Audio.Provider>
	);
};
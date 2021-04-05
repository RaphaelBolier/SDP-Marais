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
import lobbySound from '../../assets/sound/game/lobby/ambient.mp3';



const Audio = createContext({});
export const useAudios = () => useContext(Audio);

export const AudiosProvider = ({ children }) => {
    const audioIds = useMemo(() => ({
        JOIN: 0,
        LOBBY: 1,
    }), []);

    const [join] = useSound(joinSound, { volume: 1.0, interrupt: true });
    const [lobby] = useSound(lobbySound, { volume: 0.2,interrupt: true});



    const playAudio = useCallback(async (id) => {
        switch(id) {
            case audioIds.JOIN:
                join();
            break;
            case audioIds.LOBBY:
                lobby();
                break;
            default: return;
        };
    }, [audioIds, join, lobby]);


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
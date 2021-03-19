import { createContext, useEffect, useState, useContext  } from 'react';
import useSound from 'use-sound';

import menuSound from '../../assets/sound/menu_sound-maxCompress.mp3';

const PlayerContext = createContext({});

export const usePlayer = () => useContext(PlayerContext);

const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState({ name: '', sound: '0.05'});
	const [playMenu] = useSound(menuSound, { volume: player.sound });

	useEffect(() => {
	  playMenu();
	}, [playMenu]);

  return (
    <PlayerContext.Provider
      value={{
        player,
        setPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
};

export default PlayerContext

export { PlayerProvider }
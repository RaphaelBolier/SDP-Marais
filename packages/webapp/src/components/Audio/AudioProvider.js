import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import useSound from "use-sound";

import joinSound from "../../assets/sound/game/join.mp3";
import lobbySound from "../../assets/sound/game/lobby/ambient.mp3";
import killSound from "../../assets/sound/game/kill.mp3";

const Audio = createContext({});
export const useAudios = () => useContext(Audio);

export const AudiosProvider = ({ children }) => {
  const audioIds = useMemo(
    () => ({
      JOIN: 0,
      LOBBY: 1,
      KILL: 2,
    }),
    []
  );

  const [join] = useSound(joinSound, { volume: 1.0, interrupt: true });
  const [lobby] = useSound(lobbySound, { volume: 0.2, interrupt: true });
  const [kill] = useSound(killSound, { volume: 0.3, interrupt: true });

  const playAudio = useCallback(
    async (id) => {
      switch (id) {
        case audioIds.JOIN:
          join();
          break;
        case audioIds.LOBBY:
          lobby();
          break;
        case audioIds.KILL:
          kill();
          break;
        default:
          return;
      }
    },
    [audioIds, join, lobby, kill]
  );

  const value = useMemo(
    () => ({
      playAudio,
      audioIds,
    }),
    [playAudio, audioIds]
  );

  return <Audio.Provider value={value}>{children}</Audio.Provider>;
};

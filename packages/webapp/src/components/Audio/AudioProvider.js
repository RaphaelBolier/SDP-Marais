import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
} from "react";
import useSound from "use-sound";

import { usePlayer } from "../../components/Player/PlayerContext";
import joinSound from "../../assets/sound/game/join.mp3";
import lobbySound from "../../assets/sound/game/lobby/ambient.mp3";
import killSound from "../../assets/sound/game/kill.mp3";
import reportSound from "../../assets/sound/game/report.mp3";

const Audio = createContext({});

export const useAudios = () => useContext(Audio);

export const AudiosProvider = ({ children }) => {
  const audioIds = useMemo(
    () => ({
      JOIN: 0,
      LOBBY: 1,
      KILL: 2,
      REPORT: 3,
    }),
    []
  );

  const playerConfig = usePlayer();
  const { homeSound } = playerConfig.player;

  const [join] = useSound(joinSound, { volume: homeSound, interrupt: true });
  const [lobby] = useSound(lobbySound, { volume: homeSound, interrupt: true });
  const [kill] = useSound(killSound, { volume: homeSound, interrupt: true });
  const [report] = useSound(reportSound, {
    volume: homeSound,
    interrupt: true,
  });

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
        case audioIds.REPORT:
          report();
          break;
        default:
          return;
      }
    },
    [audioIds, join, lobby, kill, report]
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

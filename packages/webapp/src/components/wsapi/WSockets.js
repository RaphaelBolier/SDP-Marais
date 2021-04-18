import React, {
	createContext,
	useContext,
	useMemo,
	useState,	
	useEffect,
	useCallback,
} from 'react';
import openSocket from 'socket.io-client';

const WSockets = createContext({});
export const useSockets = () => useContext(WSockets);

export const WSocketsProvider = ({ children }) => {
	const [socket, setSocket] = useState(undefined);	
	const [id, setId] = useState(undefined);	

	useEffect(() => {
		if (!socket) {			
			const sock = openSocket("http://localhost:25565");	
			const onConnect = sock.on('connect', () => { 
				setSocket(sock);
				setId(sock.id);
			});
			return sock.off('connect', onConnect);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const sendName = useCallback((name) => {
		socket.emit('playername', name);
	}, [socket]);

	const sendPosition = useCallback((id, x, y, direction) => {
		socket.emit('playerposition', { id, x, y, direction });
	}, [socket]);

	const getPlayerList = useCallback((roomId) => {
		socket.emit('playerlist', { roomId });
	}, [socket]);

	const startGame = useCallback((roomId) => {
		socket.emit('startgame', { roomId });
	}, [socket]);

	const killCrewMate = useCallback((roomId, crewMateId) => {
		socket.emit('kill', { roomId, targetId: crewMateId });
	}, [socket]);

	const sendMessage = useCallback((roomId, name, msg) => {
		socket.emit('sendmessage', { roomId, name, msg });
	}, [socket]);

	const sendReport = useCallback((roomId, name) => {
		socket.emit('report', { roomId, name });
	}, [socket]);

	const taskProgress = useCallback((roomId, playerId) => {
		socket.emit('taskprogress', { roomId, playerId });
	}, [socket]);


	const value = useMemo(() => ({
		id,	
		socket,
		sendName,
		sendPosition,
		getPlayerList,
		startGame,
		killCrewMate,
		sendMessage,
		sendReport,
		taskProgress,
	}), [
		id,		
		socket,
		sendName,
		sendPosition,
		getPlayerList,
		startGame,
		killCrewMate,
		sendMessage,
		sendReport,
		taskProgress,
	]);

	return (
		<WSockets.Provider value={value}>
			{children}
		</WSockets.Provider>
	);
};
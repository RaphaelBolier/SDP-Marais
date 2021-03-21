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

	const sendPosition = useCallback((id, x, y) => {
		socket.emit('playerposition', { id, x, y });
	}, [socket]);

	const getPlayerList = useCallback((roomId) => {
		socket.emit('playerlist', { roomId });
	}, [socket]);

	const value = useMemo(() => ({
		id,	
		socket,
		sendName,
		sendPosition,
		getPlayerList,
	}), [
		id,		
		socket,
		sendName,
		sendPosition,
		getPlayerList
	]);

	return (
		<WSockets.Provider value={value}>
			{children}
		</WSockets.Provider>
	);
};
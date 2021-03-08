import React, {
	createContext,
	useContext,
	useMemo,
	useState,	
	useEffect,
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

	const value = useMemo(() => ({
		id,	
		socket,
	}), [
		id,		
		socket,
	]);

	return (
		<WSockets.Provider value={value}>
			{children}
		</WSockets.Provider>
	);
};
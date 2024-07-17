import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Channels, Chat } from './components';
import { toast } from 'react-toastify';

const socket = io('/');

const Home = () => {
  useEffect(() => {
    // Successful connection handler
    socket.on('connect', () => {
      toast.success('Connection established');
    });

    // Disconnection handler
    socket.on('disconnect', (reason) => {
      toast.error(`Connection lost: ${reason}`);
    });

    // Reconnection attempt handler
    socket.on('reconnect_attempt', (attemptNumber) => {
      toast.info(`Reconnection attempt #${attemptNumber}`);
    });

    // Clean up handlers on component unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('reconnect_attempt');
    };
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Chat />
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { db } from '../firebase';

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    try {
      const sendMessageRef = await addDoc(
        collection(db, `rooms/${channelId}/messages`),
        {
          message: input,
          timestamp: serverTimestamp(),
          user: 'Govind Vishwakarma',
          userImage: 'https://cdn-icons-png.flaticon.com/512/219/219983.png',
        }
      );
      setInput('');
      chatRef?.current?.scrollIntoView({
        behavior: 'smooth',
      });
      console.log('Message sent successfully with ID: ', sendMessageRef.id);
    } catch (e) {
      console.error('Error sending message: ', e);
    }
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type='text'
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type='submit' onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;

import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { collection, addDoc } from 'firebase/firestore';

import { db } from '../firebase';
import { enterRoom } from '../features/appSlice';

const SidebarOption = ({ Icon, title, addChannelOption, id }) => {
  const dispatch = useDispatch();

  const addChannel = async () => {
    const channelName = prompt('Please enter the channel name');

    if (channelName) {
      try {
        const addChannelRef = await addDoc(collection(db, 'rooms'), {
          name: channelName,
        });
        console.log('Channel added successfully with ID: ', addChannelRef.id);
      } catch (e) {
        console.error('Error adding channel: ', e);
      }
    }
  };

  const selectChannel = () => {
    if (id) {
      dispatch(enterRoom({ roomId: id }));
    }
  };

  return (
    <SidebarOptionContianer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize='small' style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContianer>
  );
};

export default SidebarOption;

const SidebarOptionContianer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 400;
  }

  > h3 > span {
    padding: 15px;
  }
`;
const SidebarOptionChannel = styled.h3`
  padding: 10px 0px;
  font-weight: 300;
`;

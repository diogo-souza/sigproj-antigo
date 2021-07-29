import React from 'react';

const Popover = () => {

  const popover = (text) => (
    <Popover id="popover-basic">
    <Popover.Title as="h3">Dica:</Popover.Title>
    <Popover.Content>
      {text}
    </Popover.Content>
  </Popover>
  )
}

export default Popover;

import React, { useState, useRef } from 'react';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';

const ScrollArrow = (props) => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 100) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 0) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    const elmnt = document.getElementById(props.estado.current.id);
    elmnt.scrollIntoView();
  };

  window.addEventListener('scroll', checkScrollTop);

  return (
    <div>
      <ExpandLessRoundedIcon className="scrollTop" onClick={scrollTop} />
    </div>
  );
};

export default ScrollArrow;

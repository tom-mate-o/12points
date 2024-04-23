import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//Styled Components
import { Title } from '../styledComponents/title';
import { MainContainer } from '../styledComponents/mainContainer';

import { HighlightedContainer } from '../styledComponents/hightlightedContainer';

import { Boxtitle } from '../styledComponents/boxtitle';

export default function Friends() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Title>Friends</Title>

      <MainContainer>
        <p>Friends</p>
      </MainContainer>
    </div>
  );
}

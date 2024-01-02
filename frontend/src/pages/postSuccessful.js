import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//Styled Components
import { Title } from "../styledComponents/title";
import { MainContainer } from "../styledComponents/mainContainer";

import { HighlightedContainer } from "../styledComponents/hightlightedContainer";

import { Boxtitle } from "../styledComponents/boxtitle";


export default function PostSuccessful() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const location = useLocation();
  const { birbImageBirb1, birbImageBirb2, birbImageBirb3 } = location.state;

  return (
    <div>
      <Title>Off they go,<br/>into the wild!</Title>

      <MainContainer>
        <Boxtitle>3 little Birbs for: anonymous</Boxtitle>

        <HighlightedContainer>
        <div className="birbsInACollumn">
        <img className="birdImg" src={birbImageBirb1} alt="hi"></img>
        <img className="birdImg" src={birbImageBirb2} alt="hi"></img>
        <img className="birdImg" src={birbImageBirb3} alt="hi"></img>
        </div>
        </HighlightedContainer>
        <Boxtitle>Your Posting was successful!</Boxtitle>
      </MainContainer>
     
    </div>
  );
}

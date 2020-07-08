import React from "react";
import type { FunctionComponent } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { ITourNode } from "../TourBar/TourBar";
import { useState } from "react";
import { useSwipeable } from 'react-swipeable';

import UITheme from "styled-components";
import mediaQueries from "../../media-queries/mediaQueries";
const media = mediaQueries;
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const modalBottomClearance: number = 200
const modalWidthRadius: string = '25%'
const modalBorderRadius: number = 20
const InfoArea = UITheme.div`
    background-color: #0f1007;
    color: #ddd;
    padding: 16px;

    ${media.desktop} {
      // put desktop specific stuff in here
    }
    ${media.tablet} {
    }
    ${media.phone} {
    }
    ${media.smallPhone} {
    }

    position: absolute;
    font-size: 0.8em;
    line-height: 1em;
    
    height: 100%;
    left: ${modalWidthRadius};
    right: ${modalWidthRadius};
    bottom: ${modalBottomClearance}px;
    padding-top: ${modalBottomClearance + 16}px;
    border-radius: ${modalBorderRadius}px;

    transition: bottom 0.5s ease-in-out;
`

const EmbeddedImage = UITheme.img`
  width: 100%;
`

const PullControl = UITheme.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  border-bottom-right-radius: ${modalBorderRadius}px;
  border-bottom-left-radius: ${modalBorderRadius}px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: rgb(0,120,0);
  }
`

const TourModal: FunctionComponent<{ selectedTourNode: ITourNode | null }> =
  ({ selectedTourNode }) => {

    const [infoModalActive, setInfoModalActive] = useState<boolean>(true)
    const options: any = {
      renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (input: any) => {
            const fields: any = input.data.target.fields
            /// alternative rendering:
            //return <img src={ fields.file.url} height={fields.file.details.image.height} width={fields.file.details.image.width} alt={fields.description} />;
            return <EmbeddedImage src={ fields.file.url} alt={fields.description} />;
      }},
    };
    let description = selectedTourNode ? documentToReactComponents(selectedTourNode.description, options) : null;
    const style = selectedTourNode && infoModalActive ? {} : { bottom: "95%" }

    const handlers = useSwipeable({
      onSwipedUp: () => {
        setInfoModalActive(false)
      }
      ,onSwipedDown: () => {
        setInfoModalActive(true)
      }
    })

    return (
      <InfoArea {...handlers} style={style}>
        { description }
        <PullControl onClick={ ()=> setInfoModalActive(!infoModalActive) }>
          { infoModalActive ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/> }
        </PullControl>
      </InfoArea>
    )
  }

export default TourModal

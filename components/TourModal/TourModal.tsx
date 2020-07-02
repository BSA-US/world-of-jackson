import React from "react";
import type { FunctionComponent } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { ITourNode } from "../TourBar/TourBar";
import { useState } from "react";

import UITheme from "styled-components";
import mediaQueries from "../../media-queries/mediaQueries";
const media = mediaQueries;

const modalBottomClearance: number = 200
const modalWidthRadius: string = '25%'
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
    border-radius: 20px;

    transition: bottom 0.5s ease-in-out;
`

const EmbeddedImage = UITheme.img`
  width: 100%;
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
    return (
      <InfoArea style={style} onClick={ ()=>{ setInfoModalActive(!infoModalActive) } }>
        { description }
      </InfoArea>
    )
  }

export default TourModal

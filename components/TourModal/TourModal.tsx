import React from 'react'
import type { FunctionComponent } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ITourNode } from '../TourBar/TourBar';

import UITheme from 'styled-components'; 
// var sanitizeHtml: any = require('sanitize-html');

const InfoArea = UITheme.div`
    background-color: #0f1007;
    color: #ddd;
    padding: 16px;

    position: fixed;
    font-size: 0.8em;
    line-height: 1em;
    
    width: 400px;
    height: 300px;
    left: 50%;
    top: 80px;
    margin: 0 -200px 0 0;
`


const TourModal: FunctionComponent<{ selectedTourNode: ITourNode | null }> =
  ({ selectedTourNode }) => {

    const options = {
      // renderNode: {
      //     [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields }}}) =>
      //         `<img src="${fields.file.url}" height="${fields.file.details.image.height}" width="${fields.file.details.image.width}" alt="${fields.description}"/>`,
      // },
    };    
    console.log(selectedTourNode ? selectedTourNode.description : "");
    //let description = selectedTourNode ? sanitizeHtml(JSON.stringify(selectedTourNode.description)) : "";
    let description = selectedTourNode ? documentToReactComponents(selectedTourNode.description, options) : null;
      return (
        <InfoArea>
          { description }
        </InfoArea>
      )
  }

export default TourModal

import * as React from 'react'
import { SectionProps } from './Props';

const empty = {};

function getBgImageStyle(img?: string){
  return !img ? empty : {
    backgroundImage: "url('" + img + "')"
  }
}

const Section = (props: SectionProps) => (
  <div 
    className={"uk-section uk-section-muted " + (props.bgImage ? 'uk-background-cover uk-light' : '')} 
    data-uk-parallax="bgy: -50" 
    style={getBgImageStyle(props.bgImage)}>
    <div className="uk-container">
      <div className="uk-flex-center uk-text-center" data-uk-grid>
        <div>
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  </div>
)

export default Section;
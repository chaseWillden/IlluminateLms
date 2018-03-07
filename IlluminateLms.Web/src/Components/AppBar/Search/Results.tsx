import * as React from 'react'
import { NavLink } from 'react-router-dom';
import { SearchResultProps } from '../../../Containers/Props';

const Results = (props: SearchResultProps) => (
  <ul className="uk-list search-results">
    {props.results.map((result: any, idx: number) => (
      <li key={result.title}>
        <NavLink to={result.path} onClick={() => props.onClick(result)} className={'nav-link ' + (props.active === idx ? 'is-active' : '')}>
          <div className="uk-button uk-button-default uk-width-1-1 uk-text-left">
            {result.title}
            <span className="uk-badge uk-text-right">{result.type}</span>  
          </div>
        </NavLink>
      </li>
    ))}
  </ul>
)

export default Results;
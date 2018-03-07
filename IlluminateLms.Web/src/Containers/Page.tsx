import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import { PageProps } from './Props';
import {NavigationLink} from './Navigation';
import Section from './Section';

const Page = (props: PageProps) => (
  <div>
    <Section bgImage={props.bgImage} description={props.description} title={props.title} />
    <BrowserRouter basename={props.baseRoute}>
      <div>
        <div>
          <nav className="uk-navbar-container" data-uk-navbar>
            <div className="uk-navbar-center">
              <ul className="uk-navbar-nav">
                {props.navigationLinks.map((link: any) => (
                  <NavigationLink route={link.route} key={link.route}>{link.text}</NavigationLink>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        {props.routes.map((route: any) => (
          <Route component={route.component} path={route.path} key={route.path} exact={route.exact} />
        ))}
      </div>
    </BrowserRouter>
  </div>
);

export default Page;
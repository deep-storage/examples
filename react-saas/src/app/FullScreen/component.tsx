import * as React from 'react';
import { Link } from 'react-router-dom';
import glamorous from 'glamorous';

const CenteredDiv = glamorous.div(
  {
    paddingTop: '10vh',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
);

const HomeButtonDiv = glamorous.div(
  { marginTop: 10 }
);

export default class FullScreen extends React.Component {
  render() {
    return (
      <CenteredDiv>
        <div>
          Full Screen!
        </div>
        <HomeButtonDiv>
          <Link className="button" to="/">Take me Home</Link>
        </HomeButtonDiv>
      </CenteredDiv>
    );
  }
}

import React from 'react';
import githubLogo from '../images/github.png';

export default () => (
    <a
      href="https://github.com/antoinejaussoin/retro-board"
      style={{ position: 'absolute', bottom: 10, right: 10 }}
      rel="noopener noreferrer"
      target="_blank"
    >
        Fork me on
        <img
          style={{ width: 100, position: 'relative', top: 10 }}
          src={githubLogo}
          alt="GitHub"
        />
    </a>
);

// Switchy.js
import React from 'react';
import styled from 'styled-components';

const Switchy = ({ checked, onChange, inputRef }) => {
  return (
    <StyledWrapper>
      <div>
        <input
          id="checkbox"
          type="checkbox"
          checked={checked}
          onChange={onChange}
          ref={inputRef}
        />
        <label className="toggle" htmlFor="checkbox">
          <div id="bar1" className="bars" />
          <div id="bar2" className="bars" />
          <div id="bar3" className="bars" />
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  #checkbox {
    display: none;
  }

  .toggle {
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    transition-duration: .5s;
  }

  .bars {
    width: 100%;
    height: 4px;
    background-color: rgb(92, 130, 255);
    border-radius: 4px;
  }

  #bar2 {
    transition-duration: .8s;
  }

  #bar1 {
    width: 50%;
  }

  #bar2 {
    width: 75%;
  }

  #checkbox:checked + .toggle .bars {
    position: absolute;
    transition-duration: .5s;
  }

  #checkbox:checked + .toggle #bar2 {
    transform: scaleX(0);
    transition-duration: .1s;
  }

  #checkbox:checked + .toggle #bar1 {
    width: 100%;
    transform: rotate(45deg);
    transition-duration: .5s;
  }

  #checkbox:checked + .toggle #bar3 {
    width: 100%;
    transform: rotate(-45deg);
    transition-duration: .5s;
  }

  #checkbox:checked + .toggle {
    transition-duration: .5s;
    transform: rotate(180deg);
  }
`;

export default Switchy;

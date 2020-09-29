import React from "react";
import { MdBrightnessLow } from "react-icons/md";

// styling:
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

// export interface ToggleInputProps {
//   value: boolean;
//   onClick: () => {};
//   label: string;

//   // htmlFor: String;
//   // label: String;
// }

// const on = ({ orientation }) => css`
//   /* transform: ${orientation === "vertical"
//     ? "translateY(0)"
//     : "translateX(100%)"}; */
//   transform: translateX(100%);
// `;
const verticalOn = css`
  transform: translateY(0);
`;

const verticalOff = css`
  transform: translateY(100%);
`;

const horizontalOn = css`
  transform: translateX(0);
`;
const horizontalOff = css`
  transform: translateX(100%);
`;

const horizontal = css`
  width: 4.3rem;
  height: 2.4rem;
`;

const vertical = css`
  width: 2.3rem;
  height: 4.3rem;
`;

const ToggleContainer = styled.div`
  background-color: ${(props) => props.theme.colors.surface};

  ${({ orientation }) => (orientation === "vertical" ? vertical : horizontal)}

  padding: 0.15rem;
  border-radius: 5rem;
  /* margin: 0.25rem; */
  margin: 0.25rem 0;

  .on {
    ${({ orientation }) =>
      orientation === "vertical" ? verticalOn : horizontalOn}
  }

  .off {
    ${({ orientation }) =>
      orientation === "vertical" ? verticalOff : horizontalOff}
  }
`;

const ToggleButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};

  font-size: 0px;

  transition-property: transform, background-color;
  transition-timing-function: ease-out;
  transition-duration: 250ms;

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

const ToggleInput = ({ orientation, value, onClick, label, ...props }) => {
  return (
    <ToggleContainer orientation={orientation}>
      <ToggleButton
        type="button"
        aria-pressed={value}
        onClick={onClick}
        className={`${value ? "on" : "off"}`}
      >
        {label}
      </ToggleButton>
    </ToggleContainer>
  );
};

export default ToggleInput;

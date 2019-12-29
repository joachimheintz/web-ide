import { css } from "@emotion/core";

export const dropdownContainer = css`
    position: relative;
    width: auto;
    height: 42px;
    margin-right: 18px;
    padding-bottom: 5px;
    box-sizing: content-box;
`;

export const menu = theme => css`
    z-index: 2;
    border: 2px solid ${theme.highlight.primary};
    border-radius: 6px;
    background-color: ${theme.background.primary};
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.8);
    position: absolute;
    min-width: 120px;
    width: 100%;
    margin-bottom: -6px;
    right: 0px;
    font-size: 14px;
    @keyframes dropIn {
        from,
        60%,
        75%,
        90%,
        to {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        0% {
            opacity: 0;
            transform: translate3d(0, -120px, 0) scaleX(0.1) scaleY(0.1);
        }
        to {
            transform: translate3d(0, 0, 0) scaleX(1) scaleY(1);
        }
    }
    animation: dropIn 0.2s;
`;

export const menuList = css`
    & > div {
        padding: 12px;
    }
`;

export const control = theme => css`
    overflow: hidden;
    display: flex;
    height: 38px;
    width: auto;
    border-radius: 0;
    text-decoration: none;
    color: white;
    font-size: 15px;
    padding: 0px;
    border: 2px solid ${theme.highlight.primary};
    margin: 2px 2px;
    border-radius: 3px;
    cursor: default;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
    & span {
        display: none;
    }
    &:hover {
        border: 2px solid ${theme.highlightAlt.primary};
        cursor: pointer;
    }
`;

export const placeholder = theme => css`
    color: ${theme.color.primary};
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.25px;
`;

export const menuOption = theme => css`
    background-color: unset !important;
    padding: 6px 12px !important;
    padding-left: 24px !important;
    font-size: 15px;
    outline: none;
    cursor: pointer;
    color: ${theme.color.primary};
    &:hover {
        border-radius: 2px;
        background-color: ${theme.highlightAlt.primary} !important;
        color: white;
    }
`;

export const groupHeading = theme => css`
    text-transformation: none;
    cursor: default;
    height: 38px;
    margin: 0;
    padding: 6px 6px 12px 20px !important;
    color: ${theme.alternativeColor.primary};
    font-size: 15px;
    font-weight: 500;
`;

export const indicatorContainer = theme => css`
    background-color: ${theme.highlight.primary};
    width: 18px;
    & > div {
        color: ${theme.alternativeColor.primary} !important;
        padding: 0;
    }
    & svg {
        margin-left: 1px;
        margin-top: 8px;
        stroke-width: 2;
    }
`;

export const indicatorSeparator = css`
    color: white;
`;

export const playButtonContainer = theme => css`
    border: 2px solid ${theme.highlight.primary};
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
    height: 42px;
    width: 42px;
    margin-right: 6px;
    &:hover {
        cursor: pointer;
        border: 2px solid ${theme.highlightAlt.primary};
        & > button {
            border-color: transparent transparent transparent
                ${theme.highlightAlt.primary};
        }
    }
`;

export const playButtonStyle = (playing: boolean) => theme => css`
    border: 0;
    background: transparent;
    box-sizing: border-box;
    width: 0;
    height: 12px;
    cursor: pointer;
    border-color: transparent transparent transparent
        ${theme.alternativeColor.primary};
    transition: 100ms all ease;

    // play state
    margin-top: 6px;
    margin-left: 10px;
    border-style: solid;
    border-width: 12px 0 12px 20px;

    ${playing &&
        `
cursor: pointer;
border-style: double;
border-width: 0px 0 0px 20px;
height: 26px;
margin-top: 6px;
margin-left: 9px;
`}
`;

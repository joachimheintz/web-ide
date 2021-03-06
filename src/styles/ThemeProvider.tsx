import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import WebIdeCssBaseline from "./WebIdeCssBaseline";
import {
    createMuiTheme,
    ThemeProvider as MuiThemeProvider
} from "@material-ui/core/styles";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { ThemeProvider } from "emotion-theming";
import { assocPath, pathOr, pipe } from "ramda";
import { ITheme } from "./types";
import { CodeMirrorPainter } from "./CodeMirrorPainter";
import themeMonokai from "./_theme_monokai";
import { makeMuiTheme } from "./MaterialUiStyle";

const ThirdPartyLibPainter = ({ theme }) => (
    <style>{`
    .splitter-layout > .layout-splitter {
         background-color: ${theme.line}!important;
    }

    .splitter-layout .layout-splitter:hover {
        background-color: ${theme.lineHover}!important;
    }

    body > li[role=tab] {
      z-index: 10;
   }
    body > li[role=tab] button {
      z-index: 10000;
   }
   .MuiButton-outlinedPrimary {
     color: ${theme.textColor}!important;
     border-color: ${theme.textColor}!important;
   }
   .MuiDrawer {background-color: ${theme.tooltipBackground}!important;}
        `}</style>
);

const CsoundWebIdeThemeProvider = props => {
    const monospaceFont = `"Fira Mono", monospace`;
    const regularFont = `"Roboto", sans-serif`;

    const theme: ITheme = pipe(
        assocPath(["font", "monospace"], monospaceFont),
        assocPath(["font", "regular"], regularFont)
    )(
        useSelector(
            pathOr(themeMonokai, ["ThemeReducer", "selectedTheme"])
        ) as ITheme
    ) as ITheme;

    const muiTheme = createMuiTheme();
    const muiThemeMixed = makeMuiTheme(muiTheme, theme);

    return (
        <MuiThemeProvider theme={muiThemeMixed}>
            <StyledComponentsThemeProvider theme={theme}>
                <ThemeProvider theme={theme ? theme : {}}>
                    <CssBaseline />
                    <WebIdeCssBaseline />
                    <CodeMirrorPainter theme={theme} />
                    <ThirdPartyLibPainter theme={theme} />
                    {props.children}
                </ThemeProvider>
            </StyledComponentsThemeProvider>
        </MuiThemeProvider>
    );
};

export default CsoundWebIdeThemeProvider;

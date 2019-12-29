import {
    SET_CLEAR_CONSOLE_CALLBACK,
    SET_PRINT_TO_CONSOLE_CALLBACK
} from "./types";

export const setClearConsoleCallback = (callback: () => void) => ({
    type: SET_CLEAR_CONSOLE_CALLBACK,
    callback: callback
});

type CB = (text: string) => void;

export const setPrintToConsoleCallback = (callback: CB | null) => ({
    type: SET_PRINT_TO_CONSOLE_CALLBACK,
    callback: callback
});

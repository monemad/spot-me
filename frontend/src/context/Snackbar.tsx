import { createContext, useContext, useState } from 'react';

export const SnackbarContext = createContext(null);

export const useSnackbar = () => useContext(SnackbarContext);

export default function NowPlayingProvider({ children }: any) {
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');

    const value: any = {
        openSnackbar,
        setOpenSnackbar,
        snackbarMessage,
        setSnackbarMessage
    }

    return (
        <SnackbarContext.Provider
        value={value}
        >
        {children}
        </SnackbarContext.Provider>
    );
}

import { SnackbarProvider } from 'notistack';

// Styles

export default function NotificationsProvider({ children }) {
    const styles = {
        success: { backgroundColor: '#06070d' },
        info: { backgroundColor: '#06070d' }
    };

    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            {children}
        </SnackbarProvider>
    )
}

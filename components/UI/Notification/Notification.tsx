import { SnackbarProvider } from 'notistack';
import Grow from '@material-ui/core/Grow';

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
        // TransitionComponent={Grow}
        >
            {children}
        </SnackbarProvider>
    )
}

import { useRouter } from "next/router";
import { checkAuth } from "../../utils/user";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";


const withAuth = (WrappedComponent) => {

    return (props) => {
        // checks whether we are on client / browser or server.
        if (typeof window !== "undefined") {
            const Router = useRouter();
            const { currentUser } = useContext(UserContext);
            if (!currentUser) {
                Router.replace("/account/signin");
                return null;
            }

            return <WrappedComponent {...props} />;
        }
        return null;
    };
};

export default withAuth;
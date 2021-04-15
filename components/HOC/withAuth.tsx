import { useRouter } from "next/router";
import { checkAuth } from "../../utils/user"

const withAuth = (WrappedComponent) => {

    return (props) => {
        // checks whether we are on client / browser or server.
        if (typeof window !== "undefined") {
            const Router = useRouter();
            if (!checkAuth()) {

                Router.replace("/account/signin");
                return null;
            }

            return <WrappedComponent {...props} />;
        }
        return null;
    };
};

export default withAuth;
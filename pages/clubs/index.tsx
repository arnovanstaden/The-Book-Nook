import { getUsername } from "../../utils/user"

// Components
import Header from "../../components/UI/Header/Header";
import Page from "../../components/Page/Page";
import withAuth from "../../components/HOC/withAuth";

const Clubs = () => {

    return (
        <Page
            title="Your Clubs"
        >
            <h1>Clubs</h1>

        </Page>
    )
}

export default withAuth(Clubs)
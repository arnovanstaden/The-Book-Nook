import { getUsername } from "../../utils/user"

// Components
import Header from "../../components/UI/Header/Header";
import Page from "../../components/Page/Page";

export default function Account() {

    return (
        <Page
            title="Your Account"
        >
            <Header
                heading={`${getUsername("possessive")} Account`}
            />

        </Page>
    )
}

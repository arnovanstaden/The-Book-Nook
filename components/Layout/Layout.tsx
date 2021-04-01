import Nav from "../UI/Nav/Nav"

import MobileNav from "../UI/MobileNav/MobileNav";


export default function Layout({ children }) {
    return (
        <>
            <Nav />
            {children}
            <MobileNav />
        </>
    )
}

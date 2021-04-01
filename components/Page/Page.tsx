// Interfaces
import { IPage } from "../../utils/interfaces"

// Components
import Head from "../Head/Head";

export default function Layout(props: IPage) {

    return (
        <>
            <Head title={props.title} />
            <main className={props.classNameProp}>
                {props.noContainer
                    ? props.children
                    : <div className="container">
                        {props.children}
                    </div>
                }
            </main>
        </>
    )
}

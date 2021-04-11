import { useRouter } from "next/router";

// Interfaces
import { IHead } from "../../utils/interfaces"

// Components
import NextHead from 'next/head';

export default function Head({ title }: IHead) {
    // Config
    const router = useRouter();

    const date = new Date();
    const currentYear = date.getFullYear();

    return (
        <NextHead>
            <title>{title} {router.pathname !== "/" ? " | The Book Nook" : null}</title>
            <link rel="icon" type="image/png" href="/images/logos/favicon.png" />
            <meta name="description" content="The Book Nook" />
            <meta name="robots" content="noindex, nofollow" />

            <meta name="author" content="Webdacity" />
            <meta name="copyright" content={`The Book Nook © ${currentYear}`} />
            <meta name="theme-color" content="#ffffff" />

            {/* PWA */}
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/images/logos/icon.png" />
            <link rel="apple-touch-startup-icon" href="/images/logos/icon.png" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="white" />
            <meta name="apple-mobile-web-app-title" content="The Book Nook" />

        </NextHead >
    )
}

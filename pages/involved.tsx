import type {NextPage} from 'next'
import Head from 'next/head'
import Script from 'next/script'

const Involved: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Involved Me Quiz Test</title>
                <meta name="description" content="Testing the embedding of an involved.me quiz"/>
            </Head>

            <main>
                <div className="involveme_embed" data-project="cheesequiz" data-embed-mode="fullscreen">
                    <Script src="https://sas-zpqhq.involve.me/embed"/>
                </div>
            </main>
        </div>
    )
}

export default Involved

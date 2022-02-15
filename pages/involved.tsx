import type {NextPage} from 'next'
import Head from 'next/head'
import Script from 'next/script'
import styles from '../styles/Home.module.css'

const Involved: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Involved Me Quiz Test</title>
                <meta name="description" content="Testing the embedding of an involved.me quiz"/>
            </Head>

            <main className={styles.main}>
                <div className="involveme_embed" data-project="cheesequiz">
                    <Script src="https://sas-zpqhq.involve.me/embed"/>
                </div>
            </main>
        </div>
    )
}

export default Involved

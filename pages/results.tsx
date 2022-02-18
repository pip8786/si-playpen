import type {NextPage} from 'next'
import Head from 'next/head'
import Script from 'next/script'
import styles from '../styles/Home.module.css'

const Involved: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Quiz Results</title>
                <meta name="description" content="A results page for the involved.me quiz"/>
            </Head>

            <main className={styles.main}>
                Add some results in here.
            </main>
        </div>
    )
}

export default Involved

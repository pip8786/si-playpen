import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Embed: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Embed Test</title>
                <meta name="description" content="Trying to embed something from VA"/>
                <link rel="icon" href="/favicon.ico"/>
                <script async src="https://unpkg.com/@sassoftware/va-report-components@0.19.0/dist/umd/va-report-components.js"></script>
            </Head>

            <main className={styles.main}>
                <sas-report-object
                    packageUri="https://app.gatheriq.analytics/datastory/education"
                    objectName="ve1100"
                    styles={{height: 600}}
                ></sas-report-object>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
                </a>
            </footer>
        </div>
    )
}

export default Embed

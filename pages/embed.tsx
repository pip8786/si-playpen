import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Embed: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Embed Test</title>
                <meta name="description" content="Trying to embed something from VA"/>
                <link rel="icon" href="/favicon.ico"/>
                <script async src="https://unpkg.com/@sassoftware/va-report-components@0.19.0/dist/umd/va-report-components.js"></script>
            </Head>

            <main>
                <sas-report-object
                    packageUri="https://gatheriq-next-test.itk8s-int.openstack.sas.com/datastory/education"
                    objectName="ve1100"
                    style={{height: 600, width:600}}
                ></sas-report-object>
            </main>
        </div>
    )
}

export default Embed

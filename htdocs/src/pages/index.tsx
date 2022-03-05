import Head from 'next/head'
import React from 'react';
import ContentService from '../services/ContentService/ContentService';
import Nav from '../components/nav/Nav';

interface IProps {
    headers: Array<{label: string, target: string}>
}

class Index extends React.Component<IProps, any> {
    render() {
        return (
            <>
                <Head>
                    <title>Lammens Jasper</title>
                    <meta name="description" content="Web developer" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={'d-flex flex-column flex-row'}>
                    <Nav headers={this.props.headers} />
                    <div className={'container-fluid'}>
                        <div className={'row'}>
                            <h1>Welcome to LammensJ</h1>
                        </div>
                    </div>
                </main>
            </>
        )
    }
}

export default Index;

export const getStaticProps = async () => {
    const contentService: ContentService = new ContentService();
    const headers: Array<{label: string, target: string}> = contentService.getHeaders();

    return {props: {headers}};
}

import Head from 'next/head'
import React from 'react';

class Index extends React.Component<any, any> {
    render() {
        return (
            <>
                <Head>
                    <title>LammensJ</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main>
                    <h1>Welcome to LammensJ</h1>
                </main>
            </>
        )
    }
}

export default Index;
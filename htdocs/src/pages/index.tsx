import Head from 'next/head'
import React from 'react';
import ContentService from '../services/ContentService/ContentService';
import Nav from '../components/nav/Nav';
import Section from '../components/section/Section';
import Intro from "../components/intro/Intro";

interface IProps {
    headers: Array<{label: string, target: string}>;
    content: Array<string>;
    intro: string;
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
                <main>
                    <Intro intro={this.props.intro} />
                    <div className={'container-fluid'}>
                        {this.props.headers.map((heading, index) => {
                            return (
                                <div key={index}>
                                    <Section
                                        heading={heading}
                                        content={this.props.content[index]}
                                        hideTitle={index === 0}
                                    />
                                    <hr className={'m-0'} />
                                </div>
                            )
                        })}
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
    const content = await contentService.getContent();
    const intro = contentService.getParsedIntro();

    return {props: {headers, content, intro}};
}

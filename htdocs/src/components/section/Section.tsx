import React from 'react';
import styles from './Section.module.scss';

interface IProps {
    heading: {label: string, target: string};
    content: string;
    hideTitle: boolean;
}

class Section extends React.Component<IProps, any> {
    public static defaultProps = {
        hideTitle: false
    }

    render() {
        return (
            <section className={`section d-flex flex-column justify-content-center col-10 col-md-8 offset-1 offset-md-2 py-5 section--title--${this.props.hideTitle ? 'hide' : 'show'} ${styles.wrapper}`} id={this.props.heading.target} key={this.props.heading.target}>
                <div dangerouslySetInnerHTML={{__html: this.props.content}} />
            </section>
        )
    }
}

export default Section;

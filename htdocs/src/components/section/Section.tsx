import React from 'react';
import styles from './Section.module.scss';

interface IProps {
    heading: {label: string, target: string};
    content: string;
    intro: string;
    hideTitle: boolean;
}

class Section extends React.Component<IProps, any> {
    public static defaultProps = {
        hideTitle: false
    }

    render() {
        return (
            <section className={`section d-flex flex-column justify-content-center px-3 py-5 section--title--${this.props.hideTitle ? 'hide' : 'show'} ${styles.container}`} id={this.props.heading.target} key={this.props.heading.target}>
                {(this.props.intro !== '') ? (
                    <div dangerouslySetInnerHTML={{__html: this.props.intro}} />
                ) : null}
                <div dangerouslySetInnerHTML={{__html: this.props.content}} />
            </section>
        )
    }
}

export default Section;

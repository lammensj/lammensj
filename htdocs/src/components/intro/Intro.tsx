import React from 'react';
import styles from './Intro.module.scss';

interface IProps {
    intro: string;
}

class Intro extends React.Component<IProps, any> {
    render() {
        return (
            <div className={styles.bgImage}>
                <div className={`position-absolute w-100 h-100 ${styles.mask}`}>
                    <div className={'container-fluid d-flex align-items-center flex-column justify-content-end h-100 pb-5 text-center'}>
                        <div dangerouslySetInnerHTML={{__html: this.props.intro}} />
                        <i className='bi bi-arrow-down'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Intro;
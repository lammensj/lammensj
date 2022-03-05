import React from 'react';
import styles from './Nav.module.scss';
import Image from 'next/image';

interface IProps {
    headers: Array<{label: string, target: string}>
}

class Nav extends React.Component<IProps, any> {
    render() {
        return (
          <nav
              className={`navbar navbar-expand-md navbar-dark bg-primary sticky-top p-3 d-md-flex flex-md-column justify-content-md-center ${styles.sidenav}`}
          >
              <a href={'#page-top'} className={'navbar-brand js-scroll-trigger mx-0'}>
                  <span className={'d-block d-md-none'}>Jasper Lammens</span>
                  <span className={'d-none d-md-block'}>
                    <Image src={'/assets/img/jasper_lammens.png'} width={170} height={170} alt={'Profile picture'} className={'d-none'} />
                  </span>
              </a>
              <button
                  className={'navbar-toggler'}
                  type={'button'}
                  data-bs-toggle={'collapse'}
                  data-bs-target={'#navbar-responsive'}
                  aria-controls={'navbar-responsive'}
                  aria-expanded={false}
                  aria-label={'Toggle navigation'}>
                  <span className={'navbar-toggler-icon'} />
              </button>
              <div className={'collapse navbar-collapse flex-md-grow-0'} id={'navbar-responsive'}>
                  <ul className={'navbar-nav flex-md-column align-items-md-center'}>
                      {this.props.headers.map((heading) => {
                          return (
                              <li className={'nav-item'} key={heading.target}>
                                  <a href={`#${heading.target}`} className={'nav-link js-scroll-trigger'}>
                                      {heading.label}
                                  </a>
                              </li>
                          )
                      })}
                  </ul>
              </div>
          </nav>
        );
    }
}

export default Nav;

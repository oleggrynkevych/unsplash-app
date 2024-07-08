import './Header.scss';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import classNames from 'classnames';
import useScrollDirection from '../../hooks/useScrollDirection';

const Header = () => {
    const scrollDirection = useScrollDirection();

    const handleScrollToTop = () => {
        scroll.scrollToTop();
    };

    // Styles

    const headerStyles = classNames('header', {
        hide: scrollDirection === 'down',
    });

    return (
        <header className={headerStyles}>
            <div className='header-container'>
                <Link to='/' onClick={handleScrollToTop}>
                    <h1>My Gallery</h1>
                </Link>

                <ScrollLink smooth to='contacts'>
                    <span>Contacts</span>
                </ScrollLink>
            </div>
        </header>
    )
}

export default Header;

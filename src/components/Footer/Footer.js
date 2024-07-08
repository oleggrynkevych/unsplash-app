import Button from '../Button/Button';
import './Footer.scss';

const Footer = () => {

    const redirectToTelegram = () => {
        window.open('https://t.me/grynkevych', '_blank');
    };

    const redirectToLinkedIn = () => {
        window.open('https://www.linkedin.com/in/oleg-grynkevych-418a47251/', '_blank');
    };

    return (
        <footer className='footer' id='contacts'>
            <div className='footer-container'>
                <Button clickFunction={redirectToTelegram}>telegram</Button>
                <Button clickFunction={redirectToLinkedIn}>linkedin</Button>
            </div>
        </footer>
    )
}

export default Footer;

import './Button.scss';

const Button = ({children, clickFunction, styles}) => {

    return (
        <button onClick={clickFunction} className='common-button' style={styles}>
            {children}
        </button>
    )
}

export default Button;

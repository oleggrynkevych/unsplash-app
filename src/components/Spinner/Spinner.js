import './Spinner.scss';
import ClipLoader from "react-spinners/RiseLoader";

const Spinner = ({loading}) => {
    return (
        <div className='spinner'>
            <ClipLoader
                color={'rgba(0, 0, 0, 0.811)'}
                loading={loading}
                size={30}
            />
        </div>
    )
}

export default Spinner

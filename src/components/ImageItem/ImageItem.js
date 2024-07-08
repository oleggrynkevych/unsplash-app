import './ImageItem.scss';
import { Link } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

const ImageItem = ({url, id}) => {
    const handleScrollToTop = () => {
        scroll.scrollToTop();
    };

    return (
        <Link to={`/${id}`} onClick={handleScrollToTop}>
            <div className='image-item'>
                <img src={url} alt={'item'}/>

                <div className='image-item-coverer'>Show details</div>
            </div>
        </Link>
  )
}

export default ImageItem

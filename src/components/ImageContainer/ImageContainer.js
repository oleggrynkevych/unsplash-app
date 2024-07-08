import ImageItem from '../ImageItem/ImageItem';
import './ImageContainer.scss';

function ImageContainer ({data, columnAccount}) {
    return (
        <div className={`image-container column-${columnAccount}`}>
            {
                data && data.map((item, index) => (
                    <ImageItem 
                        key={index}
                        url={item.urls.regular}
                        id={item.id}
                    />
                ))
            }
        </div>
    )
}

export default ImageContainer

import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import FULLSCREEN_ICON from '../assets/fullscreen-icon.png';
import Modal from '../components/Modal/Modal';
import Button from '../components/Button/Button';
import Spinner from '../components/Spinner/Spinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const ImagePage = ({unsplash, setPage}) => {
    const isMiddleScreen = useMediaQuery('(max-width: 768px)');

    const {id} = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleOpenImage = () => {
        setOpenModal(true);
    }

    const handleBack = () => {
        navigate(-1);
    };

    const handlePageOrderByTagSearch = () => {
        setPage(1);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await unsplash.photos.get({photoId: id});
            
                if (res.status >= 200 && res.status < 300) {
                    setData(res.response);
                } else {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
            }
            catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
    
        fetchData();
    }, []);

   
    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [openModal]);

    if (loading) return (
        <div className='initial-container'>
            <Spinner/>
        </div>
    );

    if (error) return (
        <div className='initial-container'>
            <ErrorMessage/>
        </div>
    );

    return (
        <main className='image-page'>
            <div className='image-page-button-container'>
                <Button 
                    clickFunction={handleBack}
                    styles={isMiddleScreen ? {width: '100%'} : null}
                >back to previous page</Button>
            </div>

            <div className='image-page-container'>
                <div className='image-page-img-box' onClick={handleOpenImage}>
                    <img src={data?.urls.regular} alt={data?.alt_description} className='image-page-img-box-main'/>
                    <img src={FULLSCREEN_ICON} alt={'fullscreen'} className='image-page-img-box-icon'/>
                </div>
                
                <div className='image-page-info-box'>
                    {  
                        data?.user.name && (
                            <div className='image-page-info-item'>
                                <span className='image-page-info-item-label'>Author</span>
                                <span className='image-page-info-item-text'>{data?.user.name}</span>
                            </div>
                        )
                    }

                    {  
                        data?.description && (
                            <div className='image-page-info-item'>
                                <span className='image-page-info-item-label'>Description</span>
                                <span className='image-page-info-item-text'>{data?.description}</span>
                            </div>
                        )
                    }

                    {  
                        data?.likes && (
                            <div className='image-page-info-item'>
                                <span className='image-page-info-item-label'>Likes</span>
                                <span className='image-page-info-item-text'>{data?.likes}</span>
                            </div>
                        )
                    }

                    {  
                        data?.tags && (
                            <div className='image-page-info-item'>
                                <span className='image-page-info-item-label'>Tags</span>
                                <div className='image-page-info-item-tags'>
                                    {
                                        data?.tags.map((tag, index) => (
                                            <Link to={`/?query=${tag.title}`} key={index}>
                                                <Button clickFunction={handlePageOrderByTagSearch}>{tag.title}</Button>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>

                <Modal openModal={openModal} setOpenModal={setOpenModal} url={data?.urls.regular}/>
            </div>
        </main>
    )
}

export default ImagePage;
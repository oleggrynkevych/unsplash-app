import './pages.scss';
import ImageContainer from '../components/ImageContainer/ImageContainer';
import { PaginateBar } from '../components/PaginateBar/PaginateBar';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Button from '../components/Button/Button';
import SearchBar from '../components/SearchBar/SearchBar';
import Spinner from '../components/Spinner/Spinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const MainPage = ({unsplash, page, setPage}) => {
    const isMiddleScreen = useMediaQuery('(max-width: 768px)');
    const isMobileScreen = useMediaQuery('(max-width: 375px)');

    const startColumnAccount = isMobileScreen ? 1 : 3;
        
    const perPage = process.env.REACT_APP_PER_PAGE;

    const [columnAccount, setColumnAccount] = useState(startColumnAccount);
    const [data, setData] = useState();
    const [total, setTotal] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); 
    const query = searchParams.get('query');

    const handleChangeLayout = () => {
        if (columnAccount === startColumnAccount) {
            setColumnAccount(
                isMiddleScreen ? 2 : 
                isMobileScreen ? 1 :
                5
            );
        } else {
            setColumnAccount(startColumnAccount);
        }
    };

    const handleClearQuery = () => {
        navigate('/');
        setSearchValue('');
        setPage(1);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = query
                    ? await unsplash.search.getPhotos({ query: query, page: page, perPage: perPage })
                    : await unsplash.photos.list({ page: page, perPage: perPage });

                const data = res.response.results;
                const total = res.response.total;

            
                setData(data);
                setTotal(total);
                console.log(data);
            } catch (error) {
                setError(error);
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    } , [page, query]);


    //  Styles 

    const clearButtonStyles = classNames('main-page-clear-button-container', {
        visible: query
    })
      

    return (
        <main className='main-page'>
            <div className='main-page-container'>
                <div className='main-page-controls'>
                    <SearchBar 
                        searchValue={searchValue} 
                        setSearchValue={setSearchValue} 
                        setPage={setPage} 
                        isMiddleScreen={isMiddleScreen}
                    />
                   
                    <div className={clearButtonStyles}>
                        <Button 
                            clickFunction={handleClearQuery}
                            styles={isMiddleScreen ? {width: '100%'} : null}
                        >Clear filtres</Button>
                    </div>
                    
                    <div className='main-page-switch-button-container'>
                        <Button 
                            clickFunction={handleChangeLayout} 
                            styles={isMiddleScreen ? {width: '100%'} : null}
                        >Switch layout</Button>
                    </div>
                </div>

                <h2 className='main-page-title'>
                    {
                        !loading ? (
                            query && data?.length ? (
                                `Search results by '${query}'`
                            ) : query && !data?.length ? (
                                `No results by '${query}'`
                            ) : (
                                `All images`
                            )
                        ) : null
                    }
                </h2>
                
                {loading ? (
                    <Spinner loading={loading}/>
                ) : error ? (
                    <ErrorMessage/>
                ) : (
                    <ImageContainer data={data} columnAccount={columnAccount} />
                )}
            </div>
            
            {
                data?.length 
                    ? (
                        <PaginateBar itemsPerPage={perPage} total={total} setPage={setPage} page={page} isMiddleScreen={isMiddleScreen}/>
                    ) 
                    : null
            }
            
        </main>
    )
}

export default MainPage

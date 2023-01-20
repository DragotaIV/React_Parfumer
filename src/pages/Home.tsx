import React from 'react';
import qs from 'qs';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { list as sortList } from '../components/Sort';

import { Categories, Sort, ParfumBlock, Pagination, Skeleton } from '../components';

import { fetchParfums } from '../redux/slices/parfum/asyncActions';
import { SearchParfumParams } from '../redux/slices/parfum/types';

import { selectParfumData } from '../redux/slices/parfum/selectors';

import { selectFilter } from '../redux/slices/filter/selectors';
import { useAppDispatch } from '../redux/slices/store';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filter/slice';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { items, status } = useSelector(selectParfumData);
    const { categoryId, sort, currentPage, searchValue } = useSelector(
        selectFilter,
    )

    const onChangeCategory = React.useCallback((idx: number) => {
        dispatch(setCategoryId(idx))
    }, [])

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    }

    const getParfums = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchParfums({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            }),
        )
        window.scrollTo(0, 0);
    }

    React.useEffect(() => {
        getParfums()
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    React.useEffect(() => {
        const queryString = qs.stringify({
            sortProperty: sort.sortProperty,
            categoryId,
            currentPage,
        })

        navigate(`?${queryString}`)
    }, [categoryId, sort.sortProperty, currentPage])

    React.useEffect(() => {
        if (window.location.search) {
            const params = (qs.parse(
                window.location.search.substring(1),
            ) as unknown) as SearchParfumParams

            const sort = sortList.find((obj) => obj.sortProperty === params.sortBy)
            dispatch(
                setFilters({
                    searchValue: params.search,
                    categoryId: Number(params.category),
                    currentPage: Number(params.currentPage),
                    sort: sort ? sort : sortList[0],
                }),
            )
        }
    }, [])

    const parfums = items.map((obj: any) => <ParfumBlock key={obj.id} {...obj} />)

    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ))

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort value={sort} />
            </div>
            <h2 className="content__title">Всі парфуми</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Виникла помилка 😕</h2>
                    <p>Спробуйте ще раз.</p>
                </div>
            ) : (
                <div className="content__items">
                    {status === 'loading' ? skeletons : parfums}
                </div>
            )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home;

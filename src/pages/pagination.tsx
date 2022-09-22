import { useRouter } from 'next/router';

import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
//api
import { apiProductList } from '../lib/product/product';

const PaginationPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;

  const [products, setProducts] = useState([]);
  const [endPage, setEndPage] = useState<number>(0);

  //pagination 상품 목록
  const [isListLoading, setIsListLoading] = useState<Boolean>(false);
  const fetchProductList: () => void = async () => {
    if (isListLoading) {
      return;
    }
    setIsListLoading(true);
    try {
      const productList = await apiProductList(Number(page), 10);
      setProducts(productList.products);
      setEndPage(Math.ceil(productList.totalCount / 10));
      setIsListLoading(false);
    } catch (e) {
      console.error(e);
      setIsListLoading(false);
    }
  };

  useEffect(() => {
    if (page) {
      const ignore = fetchProductList();
    }
  }, [page]);

  return (
    <Container>
      {products.length > 0 ? (
        <>
          <ProductList products={products} />
          <Pagination url={'/pagination'} page={Number(page)} endPage={endPage} />
        </>
      ) : (
        <>
          <ErrorContainer>존재하지 않는 페이지 입니다.</ErrorContainer>
        </>
      )}
    </Container>
  );
};

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

const ErrorContainer = styled.div`
  margin-top: 100px;
`;

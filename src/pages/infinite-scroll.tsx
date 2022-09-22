import type { NextPage } from 'next';
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ProductList from '../components/ProductList';
//api
import { apiProductList } from '../lib/product/product';

const InfiniteScrollPage: NextPage = () => {
  const page = useRef(1);
  const nowCount = useRef(0);
  const totalCount = useRef(0);
  const [products, setProducts] = useState([]);
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  //pagination 상품 목록
  const [isListLoading, setIsListLoading] = useState<Boolean>(false);
  const fetchProductList = async () => {
    if (isListLoading) {
      return;
    }
    if (totalCount.current > 0) {
      if (totalCount.current === nowCount.current) {
        return;
      }
    }
    setIsListLoading(true);
    try {
      const productList = await apiProductList(page.current, 16);
      setProducts((product) => product.concat(productList.products));
      page.current += 1;
      totalCount.current = productList.totalCount;
      nowCount.current += productList.products.length;

      setIsListLoading(false);
    } catch (e) {
      console.error(e);
      setIsListLoading(false);
    }
  };

  const onIntersect: IntersectionObserverCallback = async ([entry], observer) => {
    if (entry.isIntersecting && !isListLoading) {
      observer.unobserve(entry.target);

      const ignore = await fetchProductList();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    if (!target) {
      return;
    }

    let observer: IntersectionObserver;

    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.5,
      });
      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  }, [target]);
  return (
    <>
      <Container>
        <ProductList products={products} />
        <div ref={setTarget} />
      </Container>
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

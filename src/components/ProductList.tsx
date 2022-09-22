import styled from 'styled-components';
import dynamic from 'next/dynamic';

import { Product } from '../types/product';
import ProductLoadingItem from './ProductLoadingItem';
import { Suspense } from 'react';
const ProductItem = dynamic(() => import('./ProductItem'), {
  suspense: true,
});

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <Container>
      {products.map((product) => (
        <Suspense key={product.id} fallback={<ProductLoadingItem />}>
          <ProductItem product={product} />
        </Suspense>
      ))}
    </Container>
  );
};

export default ProductList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;

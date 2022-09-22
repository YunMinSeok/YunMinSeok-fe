import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductLoadingItem = () => {
  const router = useRouter();
  return (
    <Container>
      <Thumbnail src={'/defaultThumbnail.jpg'} />
      <Name>Loading</Name>
      <Price>0000</Price>
    </Container>
  );
};

export default ProductLoadingItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;

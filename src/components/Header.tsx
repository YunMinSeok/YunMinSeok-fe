import Link from 'next/link';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { removeCookie } from '../utilities/cookies';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCookie } from '../utilities/cookies';
import { apiGetUserInfo } from '../lib/user/user';

interface HeaderProps {
  userInfo: {
    ID?: string;
    NAME?: string;
  };
}
const Header: NextPage<HeaderProps> = ({ userInfo }) => {
  const router = useRouter();

  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleLogout = () => {
    removeCookie('acessToken');
    removeCookie('userId');
    router.push('/');
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchGetUserInfo = async (userId: string) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const getUserInfo = await apiGetUserInfo(userId);
      setId(getUserInfo.user.ID);
      setName(getUserInfo.user.NAME);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!!userInfo) {
      const userId = getCookie('userId');
      if (userId) {
        const ignore = fetchGetUserInfo(userId);
      } else {
        setName('');
        setId('');
      }
    } else {
      const { ID, NAME } = userInfo;
      setName(NAME);
      setId(ID);
    }
  }, [userInfo]);

  return (
    <Wrap>
      <Link href='/'>
        <Title>HAUS</Title>
      </Link>
      {id.length === 0 || name.length === 0 ? (
        <Link href='/login'>
          <Button>login</Button>
        </Link>
      ) : (
        <LinkWrap>
          <p>{name}</p>
          <Button onClick={handleLogout}>logout</Button>
        </LinkWrap>
      )}
    </Wrap>
  );
};
export default Header;

const Wrap = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const LinkWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.a`
  font-size: 48px;
  cursor: pointer;
`;

const Button = styled.p`
  cursor: pointer;
`;

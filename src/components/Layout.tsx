import Header from './Header';

type Props = {
  children?: React.ReactNode;
  userInfo: {
    ID?: string;
    NAME?: string;
  };
};

const Layout = ({ children, userInfo }: Props) => {
  return (
    <>
      <Header userInfo={userInfo} />
      <main>{children}</main>
    </>
  );
};

export default Layout;

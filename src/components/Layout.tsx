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
      <main>{children}</main>
    </>
  );
};

export default Layout;

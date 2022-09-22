import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

interface pageType {
  url: string;
  page: number;
  endPage: number;
}

function initializePages(page: number, end_page: number) {
  const showPageCount = 5;
  let pages = [];

  let _page = page - Math.floor(showPageCount / 2);
  console.log(page);
  console.log(_page);
  while (showPageCount > pages.length) {
    if (_page > end_page) {
      break;
    }

    if (_page > 0 && end_page >= _page) {
      pages.push(_page);
    }
    _page++;
  }

  while (pages[0] > 1 && showPageCount > pages.length) {
    pages.unshift(pages[0] - 1);
  }
  return pages;
}

const Pagination = ({ url, page, endPage }: pageType) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    if (!url || !page || !endPage) {
      return;
    }

    if (page > endPage) {
      return alert('잘못된 요청입니다.');
    }

    setPages((_) => initializePages(page, endPage));
  }, [url, page, endPage]);

  if (!url || !page || !endPage) {
    return null;
  }

  if (page > endPage) {
    return null;
  }
  return (
    <Container>
      {page - 1 > 0 ? (
        <Button>
          <Link href={`${url}?page=${page - 5}`}>
            <VscChevronLeft />
          </Link>
        </Button>
      ) : (
        <Button disabled={true}>
          <Link href={`#`}>
            <VscChevronLeft />
          </Link>
        </Button>
      )}
      <PageWrapper>
        {pages.map((item, index) => {
          if (item !== Number(page)) {
            return (
              <Page key={item} selected={page === item} disabled={page === item}>
                <Link href={`${url}?page=${item}`} key={index}>
                  <a>{item}</a>
                </Link>
              </Page>
            );
          }

          return (
            <Page key={item} selected={page === item} disabled={page === item}>
              {item}
            </Page>
          );
        })}
      </PageWrapper>
      {endPage >= page + 1 ? (
        <Button>
          <Link href={`${url}?page=${page + 5}`}>
            <VscChevronRight />
          </Link>
        </Button>
      ) : (
        <Button disabled={true}>
          <Link href={`#`}>
            <VscChevronRight />
          </Link>
        </Button>
      )}
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  cursor: pointer;
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  color: ${({ selected }) => (selected ? '#000' : '#dddddd')};
  font-size: 20px;
  & + & {
    margin-left: 4px;
  }
  &:disabled {
    cursor: default;
  }
`;

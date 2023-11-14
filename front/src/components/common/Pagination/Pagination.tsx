import React, { ReactNode } from "react";
import { styled } from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import usePagination from "@/hooks/usePagination";
import PageButton from "./PageButton";

type Props = {
    total: number;
    size: number;
    pagePerList: number;
    currentPage: number;
    setCurrentPage: (e: number) => void;
};

const Pagination = ({
    total,
    size,
    pagePerList,
    currentPage,
    setCurrentPage,
}: Props) => {
    const { prevPage, nextPage, pageRange, totalPages } = usePagination(
        total,
        size,
        pagePerList,
    );
    return (
        <Container>
            {currentPage !== 1 ? (
                <PageButton
                    type="prev"
                    onClick={() => setCurrentPage(currentPage - 1)}
                />
            ) : (
                <PageBtnHolder />
            )}
            {pageRange
                .filter((c) => c <= totalPages)
                .map((e) => (
                    <PageButton
                        key={e}
                        type="item"
                        onClick={() => setCurrentPage(e)}
                        selected={e === currentPage}
                    >
                        {e}
                    </PageButton>
                ))}
            {currentPage < totalPages ? (
                <PageButton
                    type="next"
                    onClick={() => setCurrentPage(currentPage + 1)}
                />
            ) : (
                <PageBtnHolder />
            )}
        </Container>
    );
};

const Container = styled.ul`
    ${flexBox("row", "center", "center")}
    width: auto;
    list-style: none;
    gap: 5px;
`;

const PageBtnHolder = styled.div`
    width: 30px;
    height: 30px;
`;

export default Pagination;

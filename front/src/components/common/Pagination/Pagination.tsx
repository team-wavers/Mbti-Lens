import React, { ReactNode } from "react";
import { styled } from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import usePagination from "@/hooks/usePagination";
import PageButton from "./PageButton";

type Props = {
    total: number;
    size: number;
    pagePerList: number;
};

const Pagination = ({ total, size, pagePerList }: Props) => {
    const {
        prevPage,
        nextPage,
        currentPage,
        pageRange,
        totalPages,
        setCurrentPage,
    } = usePagination(total, size, pagePerList);
    return (
        <Container>
            {currentPage !== 1 && <PageButton type="prev" onClick={prevPage} />}
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
            {currentPage < totalPages && (
                <PageButton type="next" onClick={nextPage} />
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

export default Pagination;

import { useEffect, useMemo, useState } from "react";

const usePagination = (total: number, size: number, pagePerList: number) => {
    const [startPage, setStartPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.ceil(total / size);
    const pageRange = useMemo<Array<number>>(() => {
        return Array.from(
            {
                length: pagePerList,
            },
            (_, index) => index + startPage,
        );
    }, [startPage]);

    useEffect(() => {
        setStartPage(currentPage - ((currentPage - 1) % pagePerList));
    }, [currentPage]);

    const prevPage = () => {
        if (currentPage <= 1) {
            return null;
        }
        setCurrentPage((prev) => prev - 1);
    };

    const nextPage = () => {
        if (currentPage > totalPages) {
            return null;
        }
        setCurrentPage((prev) => prev + 1);
    };

    return {
        prevPage,
        nextPage,
        currentPage,
        pageRange,
        totalPages,
        setCurrentPage,
    };
};

export default usePagination;

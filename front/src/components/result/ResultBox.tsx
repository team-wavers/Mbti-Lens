import React from "react";
import styled from "styled-components";
type SearchResponseType = {
    _id: number;
    user_id: number;
    ei: string;
    ns: string;
    tf: string;
    pj: string;
    ei_like: number;
    ns_like: number;
    tf_like: number;
    pj_like: number;
};
type Props = {
    data: SearchResponseType;
};
const ResultBox = ({ data }: Props) => {
    console.log(data);
    return <ResultContainer></ResultContainer>;
};

export default ResultBox;
const ResultContainer = styled.div`
    border: solid;
`;

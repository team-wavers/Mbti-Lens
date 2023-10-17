import React from "react";
import { SearchResponse } from "@/types/response";
import { styled } from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import ThumbsUpIcon from "../../assets/icons/thumbs-up-selected.svg";
import ThumbsDownIcon from "../../assets/icons/thumbs-down-selected.svg";

type Props = {
    response: SearchResponse["data"];
};

const StatBox = ({ response }: Props) => {
    const {
        ei,
        ns,
        tf,
        pj,
        ei_like,
        ns_like,
        tf_like,
        pj_like,
        ei_dislike,
        ns_dislike,
        tf_dislike,
        pj_dislike,
    } = response;
    return (
        <Container>
            <CountInformation>
                {ei_like + ei_dislike} 명이 평가해주셨어요!
            </CountInformation>
            <TableContainer>
                <TableRow>
                    <TableHeader></TableHeader>
                    <TableHeader>{ei}</TableHeader>
                    <TableHeader>{ns}</TableHeader>
                    <TableHeader>{tf}</TableHeader>
                    <TableHeader>{pj}</TableHeader>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <ThumbsUpIcon />
                    </TableCell>
                    <TableCell>{ei_like}</TableCell>
                    <TableCell>{ns_like}</TableCell>
                    <TableCell>{tf_like}</TableCell>
                    <TableCell>{pj_like}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <ThumbsDownIcon />
                    </TableCell>
                    <TableCell>{ei_dislike}</TableCell>
                    <TableCell>{ns_dislike}</TableCell>
                    <TableCell>{tf_dislike}</TableCell>
                    <TableCell>{pj_dislike}</TableCell>
                </TableRow>
            </TableContainer>
        </Container>
    );
};

const Container = styled.div`
    width: 360px;
    height: 270px;
    padding: 10px;
    border-radius: 24px;
    background: #dfb8b2;
    box-shadow: 0px 3px 0px 0px #a06868;
    margin-top: 50px;
    &:before {
        content: "";
        width: 340px;
        height: 250px;
        position: absolute;
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='white' stroke-width='3' stroke-dasharray='12%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: 10px;
    }
`;

const CountInformation = styled.span`
    display: block;
    margin: 18px;
    margin-top: 22px;
    font-size: ${({ theme }) => theme.typography.l};
    color: ${({ theme }) => theme.colors.primary};
    text-align: center;
`;

const TableContainer = styled.div`
    ${flexBox("column", "center", "center")}
    width: calc(100% - 40px);
    height: 170px;
    padding: 12px;
    background-color: rgba(255, 255, 255, 0.3);
    margin: 0 20px;
    border-radius: 10px;
`;

const TableRow = styled.div`
    ${flexBox("row", "center", " center")}
    width: 100%;
    height: auto;
    flex-grow: 1;
`;

const TableCell = styled.div`
    ${flexBox("column", "center", "center")}
    width: 100%;
    height: 100%;
    flex-grow: 1;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.l};
    font-family: RixInooAriDuri, sans-serif;
    text-align: center;
`;

const TableHeader = styled(TableCell)`
    color: ${({ theme }) => theme.colors.primary2};
    font-size: ${({ theme }) => theme.typography.x3l};
`;

export default StatBox;

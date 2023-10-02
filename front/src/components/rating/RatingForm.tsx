import React from "react";
import styled from "styled-components";
import flexBox from "@/styles/utils/flexbox";
import MbtiInput from "./MbtiInput";
import RatingBox from "./RatingBox";
import { mbtiArray } from "@/constants/mbti";

type MbtiDataType = {
    [key: string]: string;
};

type Props = {
    mbtiData: MbtiDataType;
    current: string;
    currentHandler: (mbtiKey: string) => void;
    like: boolean | undefined;
    likeHandler: (key: string, value: boolean) => void;
};

const RatingForm = ({
    mbtiData,
    current,
    currentHandler,
    likeHandler,
    like,
}: Props) => {
    return (
        <Container onSubmit={(e: any) => e.preventDefault()}>
            <MbtiContainer>
                {mbtiArray.map((key: string) => {
                    return (
                        <RatingContainer key={key}>
                            <MbtiInput
                                id={key}
                                value={mbtiData[key]}
                                onClick={(
                                    e: React.MouseEvent<HTMLButtonElement>,
                                ) => currentHandler(e.currentTarget.id)}
                                selected={current === key}
                            />
                            {current === key && (
                                <RatingBox
                                    onLike={() => likeHandler(current, true)}
                                    onDislike={() =>
                                        likeHandler(current, false)
                                    }
                                    like={like}
                                />
                            )}
                        </RatingContainer>
                    );
                })}
            </MbtiContainer>
        </Container>
    );
};

const Container = styled.form`
    width: 100%;
    height: auto;
`;

const MbtiContainer = styled.div`
    ${flexBox("row", "center", "center")}
    gap: 12px;
    width: 100%;
    height: auto;
`;

const RatingContainer = styled.div`
    ${flexBox("column", "center", "flex-start")}
    width: 80px;
    height: 150px;
`;

export default RatingForm;

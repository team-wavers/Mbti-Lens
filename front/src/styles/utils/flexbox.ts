import { css } from "styled-components";
const flexBox = (fd?: string, ai = `center`, jc = `center`) => {
    return css`
        display: flex;
        flex-direction: ${fd};
        justify-content: ${jc};
        align-items: ${ai};
    `;
};

export default flexBox;

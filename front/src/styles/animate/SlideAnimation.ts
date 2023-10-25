import { keyframes } from "styled-components";

const SlideAnimation = keyframes`
    from{
        transform: translateX(300px);
    }
    to{
        transform: translateX(0);
    }
`;
export default SlideAnimation;

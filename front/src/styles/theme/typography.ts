import pxToRem from "../utils/pxToRem";

export interface ITypography {
    [name: string]: string;
}

const Typography: ITypography = {
    x3l: pxToRem(96),
    x2l: pxToRem(60),
    xl: pxToRem(48),
    l: pxToRem(34),
    m: pxToRem(24),
    s: pxToRem(20),
    xs: pxToRem(16),
    x2s: pxToRem(14),
    x3s: pxToRem(12),
};

export default Typography;

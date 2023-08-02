import "styled-components";
import { IColor } from "./colors";
import { ITypography } from "./typography";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: IColor;
        typography: ITypography;
    }
}

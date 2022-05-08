import 'styled-components';
import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        base : {
            main : string;
            subOne : string;
            subTwo : string;
            background : string;
        },
        extra : {
            black : string;
            red : string;
        }
    }
}
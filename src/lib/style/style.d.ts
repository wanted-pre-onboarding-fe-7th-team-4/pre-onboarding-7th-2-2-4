// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      primary: string;
      secondary_01: string;
      secondary_02: string;
      grey_50: string;
      grey_100: string;
      grey_300: string;
      grey_800: string;
      graph_01: string;
      graph_02: string;
      bg_w: string;
      bg_g: string;
    };
  }
}

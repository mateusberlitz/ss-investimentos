import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    shadows: {
        outline: `0 0 0 3px #DB2C2C`,
    },
    components: {
        Checkbox: {
          baseStyle: {
            control: {
              //bg: "gray",
              _checked: {
                bg: "blue.primary",
                borderColor: "blue.primary",
                _hover: {
                    bg: "blue.primary",
                    borderColor: "blue.primary",
                }
              },
            }
          }
        }
    },
    colors: {
        gray: {
            "text": "#434343",
            "900": "#14142B",
            "800": "#434343",
            "700": "#6E7191",
            "600": "#A0A3BD", 
            "500": "#D9DBE9",
            "400": "#EFF0F6",
            "100": "#F7F7FC",
            "50" : "#FCFCFC",  
        },
        purple: {
            "400": "#2A00A2",
            "300": "#5F2EEA",
            "200": "#BCA4FF",
            "100": "#E4DAFF",
        },
        black: "#0E1119",
        blue: {
            "primary": "#2D3250",
            "secondary": "#676F9D",
            "500": "#0096B7",
            "400": "#2097ED",
            "300": "#1CC8EE",
            "200": "#82E9FF",
            "100": "#DEF9FF",
        },
        red: {
            "500": "#DB2C2C",
            "400": "#EA5455",
            "300": "#F06B77",
            "200": "#FF84B7",
            "100": "#FFDFED",
        },
        orange: {
            "600": "#EC7B1C",
            "500": "#FF8E2E",
            "400": "#F99846",
            "300": "#FF9F43"
        },

        green: {
            "500": "#28C76F"
        },

        gradient: "linear-gradient(92.33deg, #F8B179 -25.51%, #7C5333 26.45%, #F8B179 116.76%)"

    },
    fonts: {
        heading: 'Volkhov',
        body: 'Kanit'
    },
    styles: {
        global: {
            body: {
                bg: '#F8F8F8',
                color: 'gray.text',
                fontWeight: "light"
            }
        }
    },
    zIndices: {
        modal: 999999,
    },
})
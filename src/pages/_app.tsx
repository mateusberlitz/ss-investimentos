import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../styles/main.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { SimuladorProvider } from "@/contexts/SimuladorContext";
import { Simulador } from "@/components/Simulador";
import { FacebookPixelProvider } from "@/components/Facebook";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FacebookPixelProvider>

        <ChakraProvider theme={theme}>
            <SimuladorProvider>
                <Simulador />
                <Component {...pageProps} />
            </SimuladorProvider>
        </ChakraProvider>

    </FacebookPixelProvider>
  )
}

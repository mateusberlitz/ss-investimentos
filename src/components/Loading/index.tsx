import { Box, Flex } from "@chakra-ui/react";
import gsap from "gsap";
import { useEffect } from "react";
import LogoLoading from '../../../public/loading.svg';
import LoadingBars from '../../../public/bars.svg';

export function Loading(){

    useEffect(() => {
        const loadTimeline = gsap.timeline({

        });

        const ctx = gsap.context(() => {
            loadTimeline.from("#loading_square", { 
                //transformOrigin: "center center",
                perspective: 1000,
            }).to("#loading_square", { 
                //transformOrigin: "center center",
                rotationY: 90,
                duration: 1.5
            }, "turnoff").to(".bars_svg__bottom_bar", { 
                    delay: 0.15,
                    translateX: -350,
                    translateY: -350,
                    duration: 1.4
            }, "turnoff").to(".bars_svg__top_bar", { 
                delay: 0.15,
                translateX: 350,
                translateY: 310,
                duration: 1.4
            }, "turnoff").to("#loadingLogo", { 
                autoAlpha: 0,
                duration: 1.4
            }).to("#loading", { 
                autoAlpha: 0,
                duration: 1.4
            });
        });
    }, [])

    return(
        <Flex id="loading" pos="fixed" bg="white" left="0" top="0" bottom="0" right="0" zIndex={9999999999} justifyContent="center" alignItems={"center"}>
            <Flex pos="relative" width={"fit-content"} height="fit-content" id="loadingLogo">
                <Box id="loading_square" width={"102.5px"} height={"200px"} bg="white" rotate="" pos="absolute" transform="rotate(50deg)" left="6px" top="-5"/>
                <LogoLoading width="150px"/>
                <Box pos="absolute" overflow={"visible"}>
                    <LoadingBars width="150px" pos="absolute"/>
                </Box>
            </Flex>
        </Flex>
    )
}
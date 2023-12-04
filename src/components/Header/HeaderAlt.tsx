import { Button, Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, HStack, Icon, Img, Stack, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

import SS from '../../../public/ss.svg';
import Logo from '../../../public/logo.svg';
import LogoSmall from '../../../public/logo_small.svg';
import LogoBlack from '../../../public/logo_black.svg';
import LogoSmallBlack from '../../../public/logo_small_black.svg';
import LogoSmallWhite from '../../../public/logo_small_white.svg';

import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { OutlineButton } from "../Buttons/OutlineButton";
import { ChevronDown, Menu } from "react-feather";
import { HeaderLink } from "./HeaderLink";
import { Quotation } from "../Quotation";
import { HeaderLinkList } from "./HeaderLinkList";
import { MainButton } from "../Buttons/MainButton";
import { useSimulador } from '@/contexts/SimuladorContext';
gsap.registerPlugin(ScrollTrigger);

interface HeaderProps{
    whiteVersion?: boolean
}

export function HeaderAlt({whiteVersion}: HeaderProps){
    const navRef = useRef(null);

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    const isMobile = useBreakpointValue({
        base: true,
        sm: false,
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        // const attach = gsap.fromTo(navRef.current, { 
        //     backgroundColor: "transparent" ,
        //     position: "relative",
        //     duration: 1,
        //     top: "0"
        // },{ 
        //     position: "fixed",
        //     top: "10px",
        //     duration: 1,
        //     background: whiteVersion ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
        //     backdropFilter: "blur(30px)",
        // });

        const ctx = gsap.context(() => {

            const headerTimeline = gsap.timeline({
                //paused: true,
                immediateRender: true,
                scrollTrigger: {
                    trigger: "body",
                    start: "120px 100px",
                    end: "top 0",
                    scrub: true
                }
            });

            headerTimeline
            .fromTo(navRef.current, { 
                    backgroundColor: "transparent" ,
                    position: "relative",
                    duration: 1,
                    top: "0"
                },{ 
                    position: "fixed",
                    top: "0px",
                    duration: 1,
                    background: whiteVersion ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(30px)",
            }).to("#logo", { 
                width: "300px" ,
                duration: 1,
            }).to("#quotation", { 
                //autoAlpha: 0,
                fontSize: "10px !important" ,
                height: "30px" ,
                duration: 1,
            });

            // ScrollTrigger.create({
            //     trigger: "body",
            //     start: "120px 100px",
            //     end: "top 0",
            //     scrub: true,
            //     animation: attach
            // });
        });
          
        return () => ctx.revert();
    }, [])
    
    const simulador = useSimulador();

    return(
        <Stack as="nav" alignItems="center" pos="relative" top="0" w="100%" left="0" h="140px" m="0" transition="0.4s" justifyContent={"flex-start"}>
             {/* bg="rgb(8,5,16,0.7)" backdropFilter="blur(40px)" */}
            <Stack ref={navRef} zIndex={99999} w="100%" m="0 auto" py="0" justifyContent={"center"} alignItems="center" spacing="0"> 
            {/* pos="fixed" top="12px" bg="rgba(0,0,0,0.4)" backdropFilter={"blur(40px)"} */}

                {/* <Stack w="100%"> */}
                    <HStack justify="space-between" px="4" maxW="1200px" w="100%">
                        <Flex w={["250px", "320px", "380px"]} id="logo" p={"2"}>
                            <Link href="/">
                                {
                                    isMobile ? (
                                        whiteVersion ? (
                                            <LogoSmallBlack width="120px"/>
                                        ) : (
                                            <LogoSmallWhite width="120px"/>
                                        )
                                    ): (
                                        whiteVersion ? (
                                            <LogoBlack/>
                                        ) : (
                                            <Logo/>
                                        )
                                    )
                                }
                            </Link>
                        </Flex>

                        <MainButton onClick={simulador.handleOpenSimulador} fontSize={["14px","sm","md","lg"]} h={["38px","45px","57px","57px"]}>Faça seu Planejamento</MainButton>
                        
                    </HStack>

                {/* </Stack> */}
            </Stack>
        </Stack>
    )
}
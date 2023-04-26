import { Box, Flex, HStack, Stack } from "@chakra-ui/react";
import { useLayoutEffect, useRef, useState } from "react";
import styles from './DnaAnimation.module.css';

export function DnaAnimation(){
    const [nodes, setNodes] = useState(50);

    const rows = [];
    for(let i = 0; i < nodes; i++){
        rows.push(i);
    }

    const navRef = useRef(null);

    useLayoutEffect(() => {
        const attach = gsap.fromTo(navRef.current, { 
            backgroundColor: "transparent" ,
            position: "relative",
            duration: 0.5,
            top: "0"
        },{ 
            position: "fixed",
            top: "10px",
            duration: 0.5,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(30px)"
        });

        const ctx = gsap.context(() => {

            ScrollTrigger.create({
                trigger: "body",
                start: "120px 100px",
                end: "top 0",
                scrub: true,
                animation: attach
            });
        });
          
        return () => ctx.revert();
    }, [])

    return(
        <Stack spacing="3" className={styles.dnaAnimation}>
            {
                rows.map(() => {
                    return(
                        <Flex w="200px" h="2px" bg="gradient" opacity="0.4" justifyContent={"space-between"} 
                        _after={{content: "''", h: "8px", w: "5px", borderRadius: "6px", bg: "gradient", display: "block", transform : "translateY(-2px)"}}
                        _before={{content: "''", h: "8px", w: "5px", borderRadius: "6px", bg: "gradient", display: "block", transform : "translateY(-2px)"}}/>
                    )
                })
            }
        </Stack>
    )
}
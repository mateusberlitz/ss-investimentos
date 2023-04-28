import { Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { ServiceItem } from "./ServiceItem";

export function Services(){
    return(
        <Stack m="0 auto" w="100%" pos="relative" mb="20">
            <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="24" px="6" flexDirection="column" textAlign={"center"} alignItems="center">
                <Stack spacing="8" maxW="730px">
                    <Heading color="blue.primary" fontSize={"52px"}>Nossas Principais Soluções</Heading>
                    <Text fontSize={"xl"}>Confira abaixo nossas soluções que são capazes de atender aos mais diversos objetivos financeiros que você possa ter!</Text>
                </Stack>
            </Stack>

            <HStack h="480px" color="white" spacing="0" w="100%" overflowX={"auto"} overflowY="hidden" justifyContent={"left"}>
                <HStack spacing="0" h="480px" justifyContent={"left"}>
                    <ServiceItem title="Alavancagem de Capital" subtitle="Consultoria Financeira" cover="./images/sl_real.jpg" active={true}>
                        Lorem ipsum dolor sit amet consectetur. Nec praesent urna adipiscing quis id sed nunc morbi. Eu accumsan maecenas tincidunt in consequat egestas et diam adipiscing. Lorem ipsum dolor sit amet consectetur. Nec praesent urna adipiscing quis id sed nunc morbi. 
                    </ServiceItem>
                    <ServiceItem title="Alavancagem de Capital" subtitle="Consultoria Financeira" cover="./images/sl_casal.jpg">
                        Lorem ipsum dolor sit amet consectetur. Nec praesent urna adipiscing quis id sed nunc morbi. Eu accumsan maecenas tincidunt in consequat egestas et diam adipiscing. Lorem ipsum dolor sit amet consectetur. Nec praesent urna adipiscing quis id sed nunc morbi. 
                    </ServiceItem>
                    <ServiceItem title="Renda Passiva de Aluguéis" subtitle="Consultoria Financeira" cover="./images/sl_predio.jpg">
                        Lorem ipsum dolor sit amet consectetur. Nec praesent urna adipiscing quis id sed nunc morbi. Eu accumsan maecenas tincidunt in consequat egestas et diam adipiscing. Lorem ipsum dolor sit amet consectetur. Nec praesent urna adipiscing quis id sed nunc morbi. 
                    </ServiceItem>
                    <ServiceItem title="Capital de Giro" subtitle="Consultoria Financeira" cover="./images/sl_grafico.jpg">
                        Lorem ipsum dolor sit amet consectetur. Nec praesent urna adipiscing quis id sed nunc morbi. Eu accumsan maecenas tincidunt in consequat egestas et diam adipiscing. Lorem ipsum dolor sit amet consectetur. Nec praesent urna adipiscing quis id sed nunc morbi. 
                    </ServiceItem>
                    <ServiceItem title="Planos de Consórcio" subtitle="Consultoria Financeira" cover="./images/sl_freela.jpg">
                        Lorem ipsum dolor sit amet consectetur. Nec praesent urna adipiscing quis id sed nunc morbi. Eu accumsan maecenas tincidunt in consequat egestas et diam adipiscing. Lorem ipsum dolor sit amet consectetur. Nec praesent urna adipiscing quis id sed nunc morbi. 
                    </ServiceItem>
                    <ServiceItem title="Consultoria Jurídica" subtitle="Consultoria Jurídica" cover="./images/sl_gondola.jpg">
                        Lorem ipsum dolor sit amet consectetur. Nec praesent urna adipiscing quis id sed nunc morbi. Eu accumsan maecenas tincidunt in consequat egestas et diam adipiscing. Lorem ipsum dolor sit amet consectetur. Nec praesent urna adipiscing quis id sed nunc morbi. 
                    </ServiceItem>
                </HStack>
            </HStack>
        </Stack>
    )
}
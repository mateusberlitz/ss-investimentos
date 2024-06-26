import { Box, Flex, Heading, HStack, Img, SimpleGrid, Stack, Text, Link as ChakraLink, Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { OutlineButton } from '../components/Buttons/OutlineButton'
import { SolidButton } from '../components/Buttons/SolidButton'
import { Header } from '../components/Header'
import { IconTitleItem } from '../components/IconTitleItem.tsx'
import { TopCard } from '../components/TopCard'
import { TextTag } from '../components/TextTag'
import { Check } from 'react-feather'
import { useRouter } from 'next/router'
import { MainButton } from '../components/Buttons/MainButton'
import { Footer } from '../components/Footer'

import Dollar from '../../public/icons/dollar-sign.svg';
import Percent from '../../public/icons/percent.svg';
import Hs from '../../public/hs_white.svg';
import RoadSign from '../../public/icons/road-sign.svg';
import Wallet from '../../public/icons/wallet.svg';
import { Input } from '../components/Forms/Inputs/Input'
import { Select } from '../components/Forms/Selects/Select'
import { ReactSelect } from '../components/Forms/Selects/ReactSelect'
import { Simulador } from '../components/Simulador'
import { Container } from '../components/Container'
import { useSimulador } from '@/contexts/SimuladorContext'
import { WeHelpYou } from '@/pageParts/WeHelpYou'
import { SimuladorInline } from '@/components/SimuladorInline'
import { Board } from '@/components/Board'
import { FooterLP } from '@/components/Footer/FooterLP'

export default function Imoveis(){
  const router = useRouter();

  const simulador = useSimulador();

  return (
    <Box position="relative">

      <Head>
        <title>Imóveis - S&S Investimentos</title>

        <meta name="description" content="Construa ou reforme sua casa, compre seu apartamento ou terreno com as melhores condições."></meta>
      </Head>

      <Flex px="6" flexDir="column" w="100%" bg="url(./images/capa_imoveis.png)" backgroundSize="cover" backgroundPosition="0 0px">

        {/* <Flex flexDir="column" bg="rgba(0,0,0,0.4)" backdropFilter={"blur(30px)"}>
            <Header fixed={true}/>
        </Flex> */}

        <Container as="main" pt="12" pb="12" color="white">
          <Stack spacing="10" w="100%" maxW={["100%", "70%","50%"]}>
            
            <Hs />

            <Text>CONSÓRCIO DE IMÓVEIS</Text>

            <Heading fontSize={["5xl","5xl","6xl"]} color={"#D59665"}>A forma mais prática para adquirir imóveis</Heading>

            <Text>
              Construa ou reforme sua casa, compre seu apartamento ou terreno com as melhores condições.
            </Text>

            {/* <MainButton size="lg" borderColor="#444" _hover={{borderColor: '#fff'}} onClick={simulador.handleOpenSimulador}>
              Simular consórcio
            </MainButton> */}
          </Stack>
          

          <Stack maxW={["100%", "100%","50%"]}>
            <Board w="100%" p="0" maxW={"480px"}>
                <SimuladorInline/>
            </Board>
          </Stack>
        </Container>
      </Flex>

      <Flex flexDir="column" w="100%" px="6">
        {/* <Stack w="100%" maxW="1200px" m="0 auto" py="20" spacing="12">
          <HStack justifyContent="space-between">
            <TextTag>OBJETIVOS</TextTag>

            <Link href="/consorcio">
                <ChakraLink href="/consorcio">
                    <Text fontSize="sm">O que é consórcio?</Text>
                </ChakraLink>
            </Link>
          </HStack>

          <Stack spacing={7} direction={["column", "column", "row"]}>
            <TopCard bg="gray.200" title="Reforme" text="Adquira o seu plano para aquisição de imóvel, veículo ou investimento." imgUrl="/images/reforma.png" href="imoveis"/>

            <TopCard bg="red.100" title="Imóvel novo" text="Adquira o seu plano para aquisição de imóvel, veículo ou investimento." imgUrl="/images/car.png" href="veiculos"/>

            <TopCard bg="white" title="Imóvel Usado" text="Adquira o seu plano para aquisição de imóvel, veículo ou investimento." imgUrl="/images/money.png" href="investimento"/>

            <TopCard bg="white" title="Terrenos e Fazendas" text="Adquira o seu plano para aquisição de imóvel, veículo ou investimento." imgUrl="/images/money.png" href="investimento"/>
          </Stack>

        </Stack> */}

        <Container>
          <Stack spacing="6" w={["100%", "100%","50%"]}>
            <HStack justifyContent="space-between">
              <TextTag>CONDIÇÃO EXCLUSIVA</TextTag>

              {/* <Link href="/consorcio">
                    <Text fontSize="sm">O que é consórcio?</Text>
              </Link> */}
            </HStack>

            <Heading fontSize={["5xl","5xl","6xl"]}>Pague apenas metade da parcela</Heading>
            <Text fontSize={"22px"} fontWeight={"bold"}>e sem juros.</Text>

            <Text>A Meia parcela é uma exclusividade da HS Consórcios que te permite pagar apenas metade do valor mensal até a contemplação e retirada do seu bem.</Text>
          </Stack>

          <Stack w={["100%", "100%","40%"]}>
            <Img src="./images/dinheiro_imoveis.png" alt="" borderRadius="7"/>
          </Stack>

        </Container>

        {/* <Container>
          <Stack w={["100%", "100%","40%"]}>
            <Img src="./images/house_imoveis.png" alt="Lance Consórcio - Planejamento financeiro e aquisição de bens" borderRadius="7"/>
          </Stack>

          <Stack spacing="6" w={["100%", "100%","50%"]}>
            <TextTag>VANTAGENS</TextTag>

            <Heading fontSize={["5xl","5xl","6xl"]}>Investir em renda e ampliar seu patrimônio</Heading>

            <Text>O consórcio é um excelente mecanismo para ampliar seu patrimônio e garantir que seu dinheiro traga retornos como na locação, ou juros com o crédito aplicado.</Text>
          
            <MainButton size="lg">
              Simular
            </MainButton>
          </Stack>
        </Container> */}

        {/* <Container>
          <Stack spacing="8" w={["100%", "100%","50%"]}>
            <TextTag>NA PRÁTICA</TextTag>

            <Heading fontSize={["5xl","5xl","6xl"]}>Como usar sua carta?</Heading>

            <Text fontWeight="bold">
             <span style={{color: 'blue'}}>-</span> Comprar um imóvel novo, usado ou na planta <span style={{color: 'gray'}}>.</span> <br />
             <span style={{color: 'blue'}}>-</span> Pagar materiais, mão de obra ou outro financiamento <span style={{color: 'gray'}}>.</span> <br />
            </Text>

            <Text>Sempre que contemplado, para poder utilizar o crédito, o sorteado deve passar pelo <b>processo de liberação</b>, no qual depende do tipo do imóvel desejado. No processo, é feita a análise de crédito e garantias</Text>
          
            <MainButton size="lg" onClick={simulador.handleOpenSimulador}>
              Simular
            </MainButton>
          </Stack>

          <Stack w={["100%", "100%","40%"]}>
            <Img src="./images/handshake_imoveis.png" alt="Lance Consórcio - Planejamento financeiro e aquisição de bens" borderRadius="7"/>
          </Stack>

        </Container> */}

        {/* <Container>
          <Stack w={["100%", "100%","40%"]}>
            <Table borderRadius="4px" overflow="hidden">
              <Thead>
                <Tr>
                  <Th bg="blue.primary" fontSize="16px" py="16px" color="white"> </Th>
                  <Th bg="blue.primary" fontSize="16px" py="16px" color="white">Financiamento</Th>
                  <Th bg="blue.primary" fontSize="16px" py="16px" color="white">Consórcio</Th>
                </Tr>
              </Thead>
              <Tbody fontSize="sm">
                <Tr>
                  <Td bg="gray.200" fontWeight="bold" fontSize={"16px"}>Crédito</Td>
                  <Td bg="red.200" fontSize={"18px"} fontWeight="bold">R$400.000,00</Td>
                  <Td bg="green.200" fontSize={"18px"} fontWeight="bold">R$400.000,00</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200" fontSize={"16px"}>Prazo</Td>
                  <Td bg="gray.200" fontSize={"16px"}>180 meses</Td>
                  <Td bg="gray.200" fontSize={"16px"}>180 meses</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200" fontSize={"16px"}>Taxa de Administração</Td>
                  <Td bg="gray.200" fontSize={"16px"}>0,00</Td>
                  <Td bg="gray.200" fontSize={"16px"}>R$92.000,00</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200" fontSize={"16px"}>Juros</Td>
                  <Td bg="gray.200" fontSize={"16px"}>R$582.173,60</Td>
                  <Td bg="gray.200" fontSize={"16px"}>R$0,00</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200" fontWeight="bold">Total</Td>
                  <Td bg="red.200" fontSize={"18px"} fontWeight="bold">R$982.173,00</Td>
                  <Td bg="green.200" fontSize={"18px"} fontWeight="bold">R$492.000,00</Td>
                </Tr>
              </Tbody>
          
            </Table>
          </Stack>

          <Stack spacing="8" w={["100%", "100%","50%"]}>
            <TextTag>Pague menos no seu imóvel</TextTag>

            <Heading fontSize="5xl">Comparando as principais modalidades de compra</Heading>

            <Text fontSize="lg">Com um <b>investimento planejado</b> você aproveita de uma forma muito mais consciente os seus recursos para <b>conquistar o seu sonho</b> e fica longe do perigo das dívidas e juros abusivos.</Text>
          </Stack>
        </Container> */}

        <Container direction="column" spacing="12" py="10">
          <TextTag>CARACTERÍSTICAS</TextTag>

          <Stack spacing={12}>
            <Stack title="Poder de negociação">
                <Dollar width="43px" stroke="#000" fill="none"/>
                <Text fontSize={"22px"}>Você garante um poder de negociação, pois o valor do bem é creditado à vista.</Text>
            </Stack>

            <Stack title="Reajuste">
                <Percent width="46px" stroke="#000" fill="none"/>
                <Text fontSize={"22px"}>O seu crédito é anualmente reajustado, assim você não perde o seu poder de compra.</Text>
            </Stack>

            <Stack title="FGTS">
                <Wallet width="46px" stroke="white" fill="none"/>
                <Text fontSize={"22px"}>Você pode efetuar lances com o seu FGTS para contemplar rapidamente.</Text>
            </Stack>
          </Stack>
        </Container>

        <WeHelpYou/>
      </Flex>

      <FooterLP/>
    </Box>
  )
}

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
import RoadSign from '../../public/icons/road-sign.svg';
import Wallet from '../../public/icons/wallet.svg';
import { Input } from '../components/Forms/Inputs/Input'
import { Select } from '../components/Forms/Selects/Select'
import { ReactSelect } from '../components/Forms/Selects/ReactSelect'
import { Simulador } from '../components/Simulador'
import { Container } from '../components/Container'
import { WeHelpYou } from '@/pageParts/WeHelpYou'
import { useSimulador } from '@/contexts/SimuladorContext'

export default function Veiculos(){
  const router = useRouter();

  const simulador = useSimulador();

  return (
    <Box position="relative">
      <Head>
        <title>Veículos - S&S Investimentos</title>

        <meta name="description" content="Troque ou adquira seu veículo de pequeno a grande porte como carros, vans e caminhões."></meta>
      </Head>

      <Flex px="6" flexDir="column" w="100%" bg="url(./images/banner-veiculo.jpg)" backgroundSize="cover" backgroundPosition="0 0px">

      <Flex flexDir="column" bg="rgba(0,0,0,0.4)" backdropFilter={"blur(30px)"}>
            <Header fixed={true}/>
        </Flex>

        <Container as="main" pt="44" pb="36" color="white">
          <Stack spacing="10" w="100%" maxW={["100%", "100%","50%"]}>
            <Text>CONSÓRCIO DE VEÍCULOS</Text>

            <Heading fontSize={["5xl","5xl","6xl"]}>Seu plano para adquirir veículos</Heading>

            <Text>
              Troque ou adquira seu veículo de pequeno a grande porte como carros, vans e caminhões.
            </Text>

            <OutlineButton size="lg" borderColor="#444" _hover={{borderColor: '#fff'}} onClick={simulador.handleOpenSimulador}>
              Simular consórcio
            </OutlineButton>
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
              <TextTag>OBJETIVO</TextTag>

              <Link href="/consorcio">
                    <Text fontSize="sm">O que é consórcio?</Text>
              </Link>
            </HStack>

            <Heading fontSize={["5xl","5xl","6xl"]}>Conquiste o 1º carro ou planeje a troca.</Heading>

            <Text>No começo, planejar a aquisição de um veículo pagando menos através do consórcio é mais em conta do que um financiamento. E planejar a troca para um veículo melhor é mais interessante.</Text>
          </Stack>

          <Stack w={["100%", "100%","40%"]}>
            <Img src="./images/homem_carro.jpg" alt="Lance Consórcio - Planejamento financeiro e aquisição de bens" borderRadius="7"/>
          </Stack>

        </Container>

        <Container>
          <Stack w={["100%", "100%","40%"]}>
            <Img src="./images/family_car.jpg" alt="Lance Consórcio - Planejamento financeiro e aquisição de bens" borderRadius="7"/>
          </Stack>

          <Stack spacing="6" w={["100%", "100%","50%"]}>
            <TextTag>VANTAGENS</TextTag>

            <Heading fontSize={["5xl","5xl","6xl"]}>Desfrute de conforto e bons momentos</Heading>

            <Text>Carro é uma facilidade que se merece. Então pense no seu bem estar futuro planejando seu veículo.</Text>
          
            {/* <MainButton size="lg">
              Simular
            </MainButton> */}
          </Stack>
        </Container>

        <Container>
          <Stack spacing="6" w={["100%", "100%","50%"]}>
            <TextTag>TRABALHO</TextTag>

            <Heading fontSize={["5xl","5xl","6xl"]}>Amplie sua frota ou adquira seu veículo de trabalho</Heading>

            <Text>Consórcio de veículo para trabalho garante um excelente retorno pelo baixo custo.</Text>
          
            {/* <MainButton size="lg">
              Simular
            </MainButton> */}
          </Stack>

          <Stack w={["100%", "100%","40%"]}>
            <Img src="./images/scania.jpg" alt="Lance Consórcio - Planejamento financeiro e aquisição de bens" borderRadius="7"/>
          </Stack>
        </Container>

        <Container>
          <Stack spacing="8" w={["100%", "100%","50%"]}>
            <TextTag>NA PRÁTICA</TextTag>

            <Heading fontSize={["5xl","5xl","6xl"]}>Como usar sua carta?</Heading>

            <Text fontWeight="bold">
             <span style={{color: 'gray'}}>-</span> Comprar novos e seminovos com até 10 anos<span style={{color: 'gray'}}>.</span> <br />
             <span style={{color: 'gray'}}>-</span> Usar o veículo antigo como lance e o crédito na compra<span style={{color: 'gray'}}>.</span> <br />
            </Text>

            <Text>Sempre que contemplado, para poder utilizar o crédito o sorteado deve passar pelo <b>processo de liberação</b>, nos quais depende do tipo do imóvel desejado.</Text>
          
            <MainButton size="lg">
              Simular
            </MainButton>
          </Stack>

          <Stack w={["100%", "100%","40%"]}>
            <Img src="./images/couple-deal.jpg" alt="Lance Consórcio - Planejamento financeiro e aquisição de bens" borderRadius="7"/>
          </Stack>

        </Container>

        <Container>
          <Stack w={["100%", "100%","40%"]}>
            <Table borderRadius="4px" overflow="hidden">
              <Thead>
                <Tr>
                    <Th bg="blue.primary" fontSize="sm" py="16px" color="white">Parte</Th>
                    <Th bg="blue.primary" fontSize="sm" py="16px" color="white">Valor</Th>
                </Tr>
              </Thead>
              <Tbody fontSize="sm">
                <Tr>
                  <Td bg="gray.200">Crédito</Td>
                  <Td bg="gray.200">R$56.270,00</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200">Taxa de adm.(15%)</Td>
                  <Td bg="gray.200">R$8.440,50</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200">Fundo reserva.(1%)</Td>
                  <Td bg="gray.200">R$562,70</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200">Juros (0%)</Td>
                  <Td bg="gray.200">R$0,00</Td>
                </Tr>
                <Tr>
                  <Td bg="gray.200" fontWeight="bold">Total</Td>
                  <Td bg="gray.200" fontWeight="bold">R$65.273,20</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th bg="black" color="white" textTransform="capitalize" fontSize="sm" py="16px">Prazo: 100 meses</Th>
                  <Th bg="black" color="white" textTransform="capitalize" fontSize="sm" py="16px">Meia parcela: R$326,36</Th>
                </Tr>
              </Tfoot>
            </Table>
          </Stack>

          <Stack spacing="8" w={["100%", "100%","50%"]}>
            <TextTag>EXEMPLO</TextTag>

            <Heading fontSize={["5xl","5xl","6xl"]}>O que compõe a parcela?</Heading>

            <Text fontSize="lg">A <b>meia parcela</b> é um recurso exclusivo da administradora <b>HS consórcios</b>, no qual você paga este valor reduzido até ser <b>contemplado</b>, e então depois passa a pagar a parcela integralmente mas já com o bem em mãos.</Text>
          </Stack>
        </Container>

        <Stack spacing="12" w="100%" maxW="1200px" m="0 auto" py="20">
          <TextTag>CARACTERÍSTICAS</TextTag>

          <SimpleGrid columns={3} spacing={6}>
            <IconTitleItem title="Poder de negociação"
              divider={false}
                icon={<Dollar width="43px" stroke="#000" fill="none"/>}
                description="Além de ser mais barato que outras opções financeiras, com o Consórcio o seu poder de negociação no momento da compra do bem com o vendedor é maior porque o valor do bem é creditado à vista."
            />

            <IconTitleItem title="Seu usado como lance"
              divider={false}
                icon={<Percent width="46px" stroke="#000" fill="none"/>}
                description="Na HS consórcios você pode utilizar o seu veículo usado para efetuar um lance e contemplar para abater o da sua dívida."
            />

            <IconTitleItem title="Meia Parcela"
              divider={false}
                icon={<Wallet width="46px" fill="none"/>}
                description="A meia parcela é um recurso muito benéfico para contemplar investindo pouco do crédito almejado."
            />
          </SimpleGrid>
        </Stack>

        <WeHelpYou/>
      </Flex>

      <Footer/>
    </Box>
  )
}

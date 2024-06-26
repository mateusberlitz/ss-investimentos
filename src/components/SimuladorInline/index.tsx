import { Box, Divider, Flex, Heading, HStack, Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { Board } from "../Board";
import { MainButton } from "../Buttons/MainButton";
import { OutlineButton } from "../Buttons/OutlineButton";
import { SolidButton } from "../Buttons/SolidButton";
import { Input } from "../Forms/Inputs/Input";
import { CreatableReactSelect } from "../Forms/Selects/CreatableReactSelect";
import { ReactSelect } from "../Forms/Selects/ReactSelect";
import { Select } from "../Forms/Selects/Select";
import { TextTag } from "../TextTag";
import { SimulationLead, SimulationProduct, useSimulador } from "../../contexts/SimuladorContext";

import { ArrowLeft, ArrowRight, ArrowUp } from 'react-feather'

import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { creditValues } from "../../utils/creditValues";
import { ControlledInput } from "../Forms/Inputs/ControlledInput";
import { ControlledSelect } from "../Forms/Selects/ControlledSelect";
import { useEffect, useState } from "react";
import { Slider } from "../Forms/Slider";
import { ControlledSlider } from "../Forms/Slider/ControllerSlider";
import { useRouter } from "next/router";
import { serverApi } from "../../services/api";
import { states } from "@/utils/states";

import WhatsappWhite from '../../../public/whatsapp_white.svg';
import * as gtag from '../../services/gtag';
import { callWhatsapp } from "@/functions/callWhatsapp";

const ProductFormSchema = yup.object().shape({
    segment: yup.string().required('Selecione o tipo de consórcio.'),
    credit: yup.number().required('Informe o valor do crédito.').min(30000, "O valor do crédito é no mínimo de R$30.000,00"),
    deadline: yup.string().required('Em quantos meses quer investir?'),
  });
  
  const LeadFormSchema = yup.object().shape({
    name: yup.string().required('Qual o seu nome?'),
    phone: yup.string().required('Informe seu telefone'),
    address_city: yup.string().required('Informe a sua cidade'),
  });

export function SimuladorInline(){
    const { asPath } = useRouter();
    const simulador = useSimulador();
    const isWideVersion = useBreakpointValue({base: false, lg: true,});

    const [isOpenSimulationWindow, setIsOpenSimulationWindow] = useState(false);

    const productForm = useForm<SimulationProduct>({
        resolver: yupResolver(ProductFormSchema),
        defaultValues:{
          segment: simulador.productData?.segment,
          credit: simulador.productData?.credit,
          deadline: simulador.productData?.deadline,
        }
    });

    const leadForm = useForm<SimulationLead>({
      resolver: yupResolver(LeadFormSchema),
      defaultValues:{
        name: simulador.leadData?.name,
        //email: simulador.leadData?.email,
        address_city: simulador.leadData?.address_city,
        //address_state: simulador.leadData?.address_state,
        phone: simulador.leadData?.phone,
      }
    });

    const saveFirstPart = async (productData: SimulationProduct) => {
      await simulador.handleSaveSimulationProduct(productData);
    }

    const saveSecondPart = async (leadData: SimulationLead) => {
      const result = await simulador.handleSaveSimulationLead(leadData);
    }

    return(
        <Stack w="100%" maxW="360px" m="0 auto" padding={"1"} spacing="14">
            {
                (!simulador.step || (simulador.step === 0)) ? (
                <Stack w="100%" spacing="12" color="black" padding="5">
                    <Stack spacing="5">
                    <TextTag>SIMULADOR HS CONSÓRCIOS</TextTag>
                    <Heading fontSize="3xl" color="black">Em até quanto tempo você adquire o seu novo imóvel?</Heading>
                    <Text color="black">A HS é a maior administradora do Brasil e por isso temos o crédito mais barato do mercado.</Text>
                    </Stack>

                    {/* <Text>Veja quantos pontos smiles você acumula</Text> */}

                    <Stack spacing="5" as="form" onSubmit={productForm.handleSubmit(saveFirstPart)}>
                        {/* <ControlledSelect label='*Segmento' control={productForm.control} value={simulador.productData?.segment} error={productForm.formState.errors.segment} h="50px" name="segment" w="100%" fontSize="sm" placeholder="Objetivo" focusBorderColor="blue.primary" bg="gray.400" variant="filled" _hover={ {bgColor: 'gray.500'} } size="lg">
                            <option value="Imóvel">Imóvel</option>
                            <option value="Veículo">Veículo</option>
                            <option value="Máquina Agrícola">Máquina Agrícola</option>
                            <option value="Náutico">Náutico</option>
                            <option value="Energia Solar">Energia Solar</option>
                            <option value="Investimento">Investimento</option>
                        </ControlledSelect> */}

                        <ReactSelect control={productForm.control} value={simulador.productData?.segment} name={"segment"} label='*Segmento' placeholder="Escolher Segmento" options={[
                            {
                                value: "Imóvel",
                                label: "Imóvel",
                                description: "Casa / Apartamento / Terreno / Construção / Imóvel na Praia "
                            },
                            {
                                value: "Veículo",
                                label: "Veículo",
                                description: "Moto / Carro / Caminhão / Caminhonete"
                            },
                            {
                                value: "Investimento",
                                label: "Investimento",
                                description: "Aumento patrimonial / Renda complementar / Aplicação Financeira"
                            },
                        ]}/>

                        {/* <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='row'>
                            <Radio value='1'>First</Radio>
                            <Radio value='2'>Second</Radio>
                            <Radio value='3'>Third</Radio>
                        </Stack>
                        </RadioGroup> */}

                        {
                        isWideVersion ? (
                            <CreatableReactSelect control={productForm.control} value={simulador.productData?.credit} error={productForm.formState.errors.credit} name="credit" options={creditValues} width="100%" label="Valor do crédito"/>
                        ):(
                            <ControlledSlider control={productForm.control} value={simulador.productData?.credit} error={productForm.formState.errors.credit} label="Valor do capital" name="credit" type="text" mask="money"/>
                        )
                        }

                        <ControlledSelect label='*Prazo' control={productForm.control} value={simulador.productData?.deadline.toString() === "0" ? "" : simulador.productData?.deadline.toString()} error={productForm.formState.errors.deadline} h="50px" name="deadline" w="100%" fontSize="sm" placeholder="Prazo em meses" focusBorderColor="blue.primary" bg="gray.400" variant="filled" _hover={ {bgColor: 'gray.500'} } size="lg">
                        {
                            (productForm.watch('segment') === "Veículo" || productForm.watch('segment') === "Máquina Agrícola" || productForm.watch('segment') === "Náutico" || productForm.watch('segment') === "Energia Solar") ? (
                            <>
                                {/* <option value={36}>36 vezes</option> */}
                                <option value={60}>60 vezes</option>
                                <option value={80}>80 vezes</option>
                                <option value={100}>100 vezes</option>
                                <option value={120}>120 vezes</option>
                            </>
                            ):(
                            <>
                                <option value={180}>180 vezes</option>
                                <option value={200}>200 vezes</option>
                                <option value={220}>220 vezes</option>
                            </>
                            )
                        }
                        </ControlledSelect>

                        <MainButton isLoading={productForm.formState.isSubmitting} type="submit" size="lg" w="100%" fontSize="md" rightIcon={<Icon as={ArrowRight} stroke="#ffffff" fontSize="18" fill="none" ml="2"/>}>
                        Continuar 
                        </MainButton>
                    </Stack>
                </Stack>
                )
                : (simulador.step && simulador.step === 1) ? (
                <Stack w="100%" spacing="6" color="black">
                    <TextTag>SIMULADOR</TextTag>

                    {/* <Text>Veja quantos pontos smiles você acumula</Text> */}

                    {
                    simulador.productData && (
                        <Board boxShadow="none" padding="0" display="flex" flexDir="row" justifyContent="space-between" alignItems="center">
                        <Stack spacing="3" w="55%">
                            <TextTag fontSize="11" fontWeight="semibold">VOCÊ SELECIONOU</TextTag>

                            <Stack spacing="0" fontSize="sm">
                            <Text>{simulador.productData.segment}({simulador.productData.deadline}x)</Text>
                            <Text>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(simulador.productData.credit)}</Text>
                            </Stack>
                        </Stack>

                        <OutlineButton color="black" onClick={() => simulador.handleChangeStep(0)} px="4" size="sm" borderColor="#ddd" _hover={{borderColor: '#000'}}>
                            Alterar
                        </OutlineButton>
                        </Board>
                    )
                    }

                    <Divider />

                    <Stack spacing="5" as="form" onSubmit={leadForm.handleSubmit(saveSecondPart)}>
                    <ControlledInput control={leadForm.control} value={simulador.leadData?.name} error={leadForm.formState.errors.name} name="name" placeholder="Seu nome" label="*Nome completo" type="text"/>

                    {/* <ControlledSelect control={leadForm.control} value={simulador.leadData?.address_state === "0" ? "" : simulador.leadData?.address_state} error={leadForm.formState.errors.address_state} label="*Estado" h="50px" name="address_state" w="100%" fontSize="sm" placeholder="Estado" focusBorderColor="blue.primary" bg="gray.400" variant="filled" _hover={ {bgColor: 'gray.500'} } size="lg">
                        {
                            states && states.map((state) => {
                            return(
                                <option key={state.name} value={state.uf}>{state.name}</option>
                            )
                            })
                        }
                    </ControlledSelect> */}
                    
                    <ControlledInput control={leadForm.control} value={simulador.leadData?.address_city} error={leadForm.formState.errors.address_city} name="address_city" placeholder="Cidade onde mora" label="*Cidade" type="text" />

                    {/* <ControlledInput control={leadForm.control} value={simulador.leadData?.email} error={leadForm.formState.errors.email} name="email" label="*E-mail" type="email" placeholder="Seu e-mail" /> */}

                    <ControlledInput control={leadForm.control} value={simulador.leadData?.phone} error={leadForm.formState.errors.phone} name="phone" label="*Telefone" type="tel" mask="phone" placeholder="Seu telefone"/>

                    <MainButton isLoading={leadForm.formState.isSubmitting} type="submit" size="lg" w="100%" rightIcon={<Icon as={ArrowRight} stroke="#ffffff" fontSize="18" fill="none" ml="2"/>}>
                        Ver resultados
                    </MainButton>
                    </Stack>
                </Stack>
                )
                : (simulador.step && simulador.step === 5) ? (
                <Stack color="black" w="100%" spacing="6">
                    <TextTag>SIMULADOR</TextTag>

                    <Heading fontSize="3xl">Veja seus resultados.</Heading>

                    <Board border="2px solid" borderColor="gray.200" padding="5" display="flex" flexDir="row" justifyContent="space-between" alignItems="center">
                    <Stack spacing="3">
                        <TextTag fontSize="11" fontWeight="semibold">CONSÓRCIO NOVO</TextTag>

                        <Text fontWeight="semibold">Veja como fica seu plano para adquirir imóvel nos próximos anos.</Text>

                        <MainButton size="sm">
                        Escolher
                        </MainButton>
                    </Stack>
                    </Board>

                    <Text fontWeight="regular" textAlign="center" fontSize="sm">Ou</Text>

                    <Board border="2px solid" borderColor="gray.200" padding="5" display="flex" flexDir="row" justifyContent="space-between" alignItems="center">
                    <Stack spacing="3" color="black">
                        <TextTag fontSize="11" fontWeight="semibold">EM ANDAMENTO OU CONTEMPLADO</TextTag>

                        <Text fontWeight="semibold" fontSize="lg">Caso tenha um dinheiro guardado para dar de entrada ou lance</Text>

                        <MainButton size="sm">
                        Escolher
                        </MainButton>
                    </Stack>
                    </Board>

                    <Text fontWeight="regular" textAlign="center" _hover={{textDecoration: 'underline', cursor: 'pointer'}}>Simular novamente</Text>
                </Stack>
                )
                :  ( //(simulador.step && simulador.step === 3) ?
                <Stack spacing="6">
                    <TextTag>SIMULADOR</TextTag>

                    <Heading fontSize="3xl">Este é o seu plano calculado:</Heading>

                    <Board border="2px solid" borderColor="gray.200" padding="5" display="flex" flexDir="row" justifyContent="space-between" alignItems="center">
                    <Stack spacing="3" w="100%">
                    {
                        simulador.productData && (
                        <>
                            <TextTag fontSize="11" fontWeight="semibold">VOCÊ SELECIONOU</TextTag>

                            <HStack justifyContent="space-between" color="gray.600">
                            <Stack spacing="1">
                                <Text fontWeight="bold">{simulador.productData.segment}</Text>
                                <Text fontWeight="regular">({simulador.productData.deadline}x)</Text>
                            </Stack>

                            <Text fontWeight="bold">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(simulador.productData.credit)}</Text>
                            </HStack>

                            <Divider />
                        </>
                        )
                    }
                        
                        {
                        simulador.simulationResult && (
                            <>
                            <TextTag fontSize="11" fontWeight="semibold">RESULTADO:</TextTag>

                            <HStack position="relative" justifyContent="space-between" >
                                <Stack spacing="1">
                                <Text fontWeight="bold">Meia parcela</Text>
                                <Text fontWeight="bold">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(simulador.simulationResult.halfParcel)}</Text>
                                </Stack>

                                <Stack spacing="1">
                                <Text fontWeight="regular" color="gray.700">Parcela</Text>
                                <Text fontWeight="bold" color="gray.700">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(simulador.simulationResult.fullParcel)}</Text>
                                </Stack>
                            </HStack>

                            {/* <Divider />

                            <HStack justifyContent="space-between" fontSize="sm">
                                <Text fontWeight="regular" color="gray.800">Smiles</Text>
                                <Text fontWeight="regular">{Math.floor(simulador.simulationResult.smilesPoints)} milhas/mês</Text>
                            </HStack>

                            <Text fontSize="11px">Pontos podem variar de mês a mês devido a conversão do dolar.</Text> */}
                            </>
                        )
                        }

{
                        ((simulador.productData && simulador.simulationResult) && (simulador.productData.segment === "Imóvel" || simulador.productData.segment === "Investimento")) && (
                            <>
                            <TextTag fontSize="11" fontWeight="semibold">RENTABILIDADE:</TextTag>

                            <HStack position="relative" justifyContent="space-between" _before={{content: '""', pos: 'absolute', height: '74px', width: '2px', bg: 'gradient', left: '-22px', top: '-25px'}}>
                                <Stack spacing="1">
                                <Text fontWeight="bold">Potencial de ganhos na venda do crédito</Text>
                                <Text fontWeight="bold">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format((simulador.productData.credit*0.20) - simulador.simulationResult.halfParcel)}</Text>
                                </Stack>
                            </HStack>

                            <HStack position="relative" justifyContent="space-between" _before={{content: '""', pos: 'absolute', height: '74px', width: '2px', bg: 'gradient', left: '-22px', top: '-25px'}}>
                                <Stack spacing="1">
                                <Text fontWeight="bold">Aplicação</Text>
                                <Text fontWeight="bold">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format((simulador.productData.credit*0.0090))} / mês</Text>
                                </Stack>

                                <Stack spacing="1">
                                <Text fontWeight="regular" color="gray.700">Locação</Text>
                                <Text fontWeight="bold" color="gray.700">{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format((simulador.productData.credit*0.0070))} / mês</Text>
                                </Stack>
                            </HStack>

                            {/* <Divider />

                            <HStack justifyContent="space-between" fontSize="sm">
                                <Text fontWeight="regular" color="gray.800">Smiles</Text>
                                <Text fontWeight="regular">{Math.floor(simulador.simulationResult.smilesPoints)} milhas/mês</Text>
                            </HStack>

                            <Text fontSize="11px">Pontos podem variar de mês a mês devido a conversão do dolar.</Text> */}
                            </>
                        )
                        }

                        
                    </Stack>
                    </Board>

                    <MainButton size="lg" w="100%" onClick={() => {callWhatsapp()}}>
                    Falar com consultor
                    </MainButton>

                    <Text onClick={() => simulador.handleChangeStep(0)} fontWeight="regular" textAlign="center" _hover={{textDecoration: 'underline', cursor: 'pointer'}}>Simular novamente</Text>
                </Stack>
                )
            }
            

            </Stack>
    )
}
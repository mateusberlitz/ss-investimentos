import { Box, Divider, Heading, HStack, Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
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

interface State{
  id: number;
  name: string;
  uf: string;
  created_at?: string;
  updated_at?: string;
}

const ProductFormSchema = yup.object().shape({
  segment: yup.string().required('Selecione o tipo de consórcio.'),
  credit: yup.number().required('Informe o valor do crédito.').min(30000, "O valor do crédito é no mínimo de R$30.000,00"),
  deadline: yup.string().required('Em quantos meses quer pagar?'),
});

const LeadFormSchema = yup.object().shape({
  name: yup.string().required('Qual o seu nome?'),
  email: yup.string().email("Informe um e-mail válido").required('Preencha o e-mail'),
  phone: yup.string().required('Informe seu telefone'),
  address_city: yup.string().required('Informe a sua cidade'),
  address_state: yup.string().required('Informe o seu estado'),
});

export function Simulador(){
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
        email: simulador.leadData?.email,
        address_city: simulador.leadData?.address_city,
        address_state: simulador.leadData?.address_state,
        phone: simulador.leadData?.phone,
      }
    });

    const saveFirstPart = async (productData: SimulationProduct) => {
      await simulador.handleSaveSimulationProduct(productData);
    }

    const saveSecondPart = async (leadData: SimulationLead) => {
      const result = await simulador.handleSaveSimulationLead(leadData);
    }

    //const [states, setStates] = useState<State[]>();

    // const getStates = async () => {
    //   const response = await serverApi.get(`/public/states`).then(response => setStates(response.data));
    // }

    // useEffect(() => {
    //   getStates();
    // }, []);

    return(
      <>
        <Modal isOpen={simulador.isOpen} onClose={simulador.handleCloseSimulador}>
          <ModalOverlay w="100%"/>

          <ModalContent w="100%">

            <ModalCloseButton />

            <ModalBody bg="">
              <Stack w="100%" maxW="360px" m="0 auto" py="10" spacing="14">
                {
                  (!simulador.step || (simulador.step === 0)) ? (
                    <Stack spacing="12">
                      <Stack spacing="5">
                        <TextTag>SIMULADOR</TextTag>
                        <Heading fontSize="3xl">Veja qual seu plano ideal</Heading>
                      </Stack>

                      {/* <Text>Veja quantos pontos smiles você acumula</Text> */}

                      <Stack spacing="5" as="form" onSubmit={productForm.handleSubmit(saveFirstPart)}>
                            <ControlledSelect label='*Segmento' control={productForm.control} value={simulador.productData?.segment} error={productForm.formState.errors.segment} h="50px" name="segment" w="100%" fontSize="sm" placeholder="Objetivo" focusBorderColor="blue.primary" bg="gray.400" variant="filled" _hover={ {bgColor: 'gray.500'} } size="lg">
                                <option value="Imóvel">Imóvel</option>
                                <option value="Veículo">Veículo</option>
                                <option value="Máquina Agrícola">Máquina Agrícola</option>
                                <option value="Náutico">Náutico</option>
                                <option value="Energia Solar">Energia Solar</option>
                                <option value="Investimento">Investimento</option>
                            </ControlledSelect>

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
                              <ControlledSlider control={productForm.control} value={simulador.productData?.credit} error={productForm.formState.errors.credit} label="Valor do crédito" name="credit" type="text" mask="money"/>
                            )
                          }

                          <ControlledSelect label='*Prazo' control={productForm.control} value={simulador.productData?.deadline.toString() === "0" ? "" : simulador.productData?.deadline.toString()} error={productForm.formState.errors.deadline} h="50px" name="deadline" w="100%" fontSize="sm" placeholder="Prazo em meses" focusBorderColor="blue.primary" bg="gray.400" variant="filled" _hover={ {bgColor: 'gray.500'} } size="lg">
                            {
                              (productForm.watch('segment') === "Veículo" || productForm.watch('segment') === "Máquina Agrícola" || productForm.watch('segment') === "Náutico" || productForm.watch('segment') === "Energia Solar") ? (
                                <>
                                  {/* <option value={36}>36 vezes</option> */}
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
                    <Stack spacing="6">
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

                            <OutlineButton onClick={() => simulador.handleChangeStep(0)} px="4" size="sm" borderColor="#ddd" _hover={{borderColor: '#000'}}>
                              Alterar
                            </OutlineButton>
                          </Board>
                        )
                      }

                      <Divider />

                      <Stack spacing="5" as="form" onSubmit={leadForm.handleSubmit(saveSecondPart)}>
                        <ControlledInput control={leadForm.control} value={simulador.leadData?.name} error={leadForm.formState.errors.name} name="name" placeholder="Seu nome" label="*Nome completo" type="text"/>

                        <ControlledSelect control={leadForm.control} value={simulador.leadData?.address_state === "0" ? "" : simulador.leadData?.address_state} error={leadForm.formState.errors.address_state} label="*Estado" h="50px" name="address_state" w="100%" fontSize="sm" placeholder="Estado" focusBorderColor="blue.primary" bg="gray.400" variant="filled" _hover={ {bgColor: 'gray.500'} } size="lg">
                          {
                              states && states.map((state) => {
                                return(
                                  <option key={state.name} value={state.uf}>{state.name}</option>
                                )
                              })
                          }
                        </ControlledSelect>
                        
                        <ControlledInput control={leadForm.control} value={simulador.leadData?.address_city} error={leadForm.formState.errors.address_city} name="address_city" placeholder="Cidade onde mora" label="*Cidade" type="text" />

                        <ControlledInput control={leadForm.control} value={simulador.leadData?.email} error={leadForm.formState.errors.email} name="email" label="*E-mail" type="email" placeholder="Seu e-mail" />

                        <ControlledInput control={leadForm.control} value={simulador.leadData?.phone} error={leadForm.formState.errors.phone} name="phone" label="*Telefone" type="tel" mask="phone" placeholder="Seu telefone"/>

                        <MainButton isLoading={leadForm.formState.isSubmitting} type="submit" size="lg" w="100%" rightIcon={<Icon as={ArrowRight} stroke="#ffffff" fontSize="18" fill="none" ml="2"/>}>
                          Ver resultados
                        </MainButton>
                      </Stack>
                    </Stack>
                  )
                  : (simulador.step && simulador.step === 5) ? (
                    <Stack spacing="6">
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
                        <Stack spacing="3">
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

                      <Heading fontSize="3xl">Este é o seu consórcio novo!</Heading>

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

                                <HStack position="relative" justifyContent="space-between" _before={{content: '""', pos: 'absolute', height: '74px', width: '2px', bg: 'gradient', left: '-22px', top: '-25px'}}>
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
            </ModalBody>
          </ModalContent>
        </Modal>

        {
          (asPath !== "/contempladas" && asPath !== "/desagio") && (
            <Box position="fixed" right="20px" bottom="20px" zIndex="999999">
                {/* <Text>Simule um plano</Text> */}

                {/* <SolidButton bg="linear-gradient(225deg, #DB2C2C 0%, #FC5453 100%);" color="white" fontSize="md" size="lg" onClick={simulador.handleOpenSimulador}>
                  Simular consórcio
                </SolidButton> */}
                <HStack>
                    <MainButton onClick={simulador.handleOpenSimulador}>
                        Simular consórcio
                    </MainButton>

                    {/* <Stack>
                        <HStack>
                            <SolidButton>
                                Simular consórcio
                            </SolidButton>
                            <IconButton aria-label="Acessar whatsapp" w="55px" onClick={() => callWhatsapp()} icon={<Icon as={WhatsappWhite} fontSize="22"/>} h="55px" bg="green.400" borderRadius={"full"} _hover={{bg: "green.400", boxShadow: `0 8px 20px -8px #222222`}}/>
                        </HStack>

                        {
                            isOpenSimulationWindow && (
                                <Stack h="600px" w="340px" bg="gray.200">

                                </Stack>
                            )
                        }
                    </Stack> */}

                    <IconButton aria-label="Acessar whatsapp" w="55px" onClick={() => callWhatsapp()} icon={<Icon as={WhatsappWhite} fontSize="22"/>} h="55px" bg="green.400" borderRadius={"full"} _hover={{bg: "green.400", boxShadow: `0 8px 20px -8px #222222`}}/>
                    {/* <MainButton onClick={simulador.handleOpenSimulador}>
                        <Text maxW="40px"><WhatsappWhite/></Text>
                    </MainButton> */}
                </HStack>
            </Box>
          )
        }
      </>
    )
}
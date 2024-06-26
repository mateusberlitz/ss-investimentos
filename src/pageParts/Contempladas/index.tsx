import { OutlineButton } from "@/components/Buttons/OutlineButton";
import { ControlledSelect } from "@/components/Forms/Selects/ControlledSelect";
import { TextTag } from "@/components/TextTag"
import { ContemplatedsFilter, Quota } from "@/pages/cartasOld";
import { Button, Checkbox, HStack, IconButton, Icon, Stack, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue, useToast, Text, Flex, Box } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { ChangeEvent, useRef, useState } from "react";
import { Check, Download, Printer, Search, X } from "react-feather";
import { ControlledSlider } from "@/components/Forms/Slider/ControllerSlider";
import ReactToPrint from "react-to-print";
import { CSVLink } from "react-csv";
import { MainButton } from "@/components/Buttons/MainButton";
import Whatsapp from '../../../public/whatsapp.svg';
import Sum from "@/components/Sum";

interface ContempladasProps{
    quotas: Quota[];
}

const FilterFormSchema = yup.object().shape({
    credit: yup.number().nullable().transform((v) => (v === '' || Number.isNaN(v) ? null : v)),
    value: yup.number().nullable().transform((v) => (v === '' || Number.isNaN(v) ? null : v)),
    deadline: yup.number().nullable().transform((v) => (v === '' || Number.isNaN(v) ? null : v)),
    segment: yup.string().nullable(),
    reserved: yup.string().nullable(),
    adm: yup.string().nullable(),
});

export function Contempladas({quotas} : ContempladasProps){
    const toast = useToast();
    const fontSize = useBreakpointValue({base: '9px', md: 'sm', lg: '',});
    const buttonFontSize = useBreakpointValue({base: 'sm', md: 'sm', lg: '',});
    const isWideVersion = useBreakpointValue({base: false, lg: true});

    const [showingQuotas, setShowingQuotas] = useState<Quota[]>(quotas);

    const border = {borderBottom: "1px solid", borderColor:"gray.500"}

    const [selectedQuotasId, setSelectedQuotasId] = useState<number[]>([]);
    const [selectedQuotas, setSelectedQuotas] = useState<Quota[]>([]);

    const [showReserved, setShowReserved] = useState(true);

    const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target?.checked){
            setSelectedQuotasId([...selectedQuotasId, parseInt(event.target?.value)]);
            //console.log(quotas.filter(quota => quota.id === event.target?.value)[0]);
            setSelectedQuotas([...selectedQuotas, quotas.filter(quota => quota.id === event.target?.value)[0]]);
        }else{
            setSelectedQuotasId(selectedQuotasId.filter((quotaId) => quotaId !== parseInt(event.target?.value)));
            //console.log(selectedQuotas.filter((quota) => quota.id !== event.target?.value));
            setSelectedQuotas(selectedQuotas.filter((quota) => quota.id !== event.target?.value));
        }
    }

    const handleSelectLine = (checked: boolean, id: string) => {

        if(checked){
            setSelectedQuotasId([...selectedQuotasId, parseInt(id)]);
            //console.log(quotas.filter(quota => quota.id === id)[0]);
            setSelectedQuotas([...selectedQuotas, quotas.filter(quota => quota.id === id)[0]]);
        }else{
            setSelectedQuotasId(selectedQuotasId.filter((quotaId) => quotaId !== parseInt(id)));
            //console.log(selectedQuotas.filter((quota) => quota.id !== id));
            setSelectedQuotas(selectedQuotas.filter((quota) => quota.id !== id));
        }
    }

    const handleSelectRealty = (event: ChangeEvent<HTMLInputElement>) => {
        const realtyQuotas = quotas.filter((quota:Quota) => quota.categoria === "Imóvel");
        const realtyQuotasId = realtyQuotas.map((quota: Quota) => parseInt(quota.id));

        if(event.target?.checked){
            setSelectedQuotasId([...selectedQuotasId, ...realtyQuotasId]);
            setSelectedQuotas([...selectedQuotas, ...realtyQuotas]);
        }else{
            const selectedQuotasWithoutRealtyId = selectedQuotasId.map((quotaId) => {
                if(!realtyQuotasId.includes(quotaId)){ return quotaId;}

                return 0;
            });

            setSelectedQuotasId(selectedQuotasWithoutRealtyId);
            setSelectedQuotas(realtyQuotas.filter((quota:Quota) => quota.categoria === "Veículo"));
        }
    }

    const handleSelectVehicle = (event: ChangeEvent<HTMLInputElement>) => {
        const vehicleQuotas = quotas.filter((quota:Quota) => quota.categoria === "Veículo");
        const vehicleQuotasId = vehicleQuotas.map((quota: Quota) => parseInt(quota.id));

        if(event.target?.checked){
            setSelectedQuotasId([...selectedQuotasId, ...vehicleQuotasId]);
            setSelectedQuotas([...selectedQuotas, ...vehicleQuotas]);
        }else{
            const selectedQuotasWithoutVehicle = selectedQuotasId.map((quotaId) => {
                if(!vehicleQuotasId.includes(quotaId)){ return quotaId;}

                return 0;
            })

            setSelectedQuotasId(selectedQuotasWithoutVehicle);
            setSelectedQuotas(vehicleQuotas.filter((quota:Quota) => quota.categoria === "Imóvel"));
        }
    }

    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target?.checked){
            const newSelectedQuotasId = quotas.map((quota: Quota) => parseInt(quota.id));
            setSelectedQuotasId(newSelectedQuotasId);
            setSelectedQuotas(quotas);
        }else{
            setSelectedQuotasId([0]);
            setSelectedQuotas([]);
        }
    }

    const isSelectedQuotas = () => {
        return selectedQuotas.length > 0;
    }

    const [isSumOpen, setIsSumOpen] = useState(false);

    const handleOpenSumModal = () => {
        if(isSelectedQuotas()){
            setIsSumOpen(true);

            return;
        }

        toast({
            //title: 'Nenhuma carta foi selecionada.',
            description: "Nenhuma carta foi selecionada.",
            status: 'warning',
            variant: 'left-accent',
            duration: 9000,
            isClosable: true,
        })
    }

    const handleCloseSumModal = () => {
        setIsSumOpen(false);
    }

    const handleContact = (quota: Quota) => {
        window.open(`https://api.whatsapp.com/send?phone=5551985994869&text=${window.encodeURIComponent(`Olá, tenho interesse na carta de crédito N°${quota.id} para ${quota.categoria} de R$ ${quota.valor_credito}`)}`);
    }

    const handleSend = () => {
        if(isSelectedQuotas()){
            const cardsText = selectedQuotas.reduce((accumulator:string, quota:Quota) => {
                return `${accumulator}Carta ${quota.id} - *${quota.categoria}*:\n*Crédito: R$ ${quota.valor_credito}* \nPrazo: ${quota.parcelas}x\nParcela: R$${quota.valor_parcela}\nEntrada: R$${quota.entrada}\nSaldo devedor: ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(parseFloat(quota.valor_parcela.replace(".", "").replace(",", "."))*parseInt(quota.parcelas))}\n\n`
            }, '');
    
            window.open(`https://api.whatsapp.com/send?text=${window.encodeURIComponent(cardsText)}`);

            return;
        }

        toast({
            //title: 'Nenhuma carta foi selecionada.',
            description: "Nenhuma carta foi selecionada.",
            status: 'warning',
            variant: 'left-accent',
            duration: 9000,
            isClosable: true,
        })
    }

    const toPrintRef = useRef(null);

    const filterForm = useForm<ContemplatedsFilter>({
        resolver: yupResolver(FilterFormSchema),
        defaultValues:{
            credit: 0,
            value: 0,
            deadline: 0,
            segment: '',
            reserved: '',
            adm: ''
        }
    });

    const handleFilter = (filterData: ContemplatedsFilter) => {
        console.log(filterData);
        let filteredQuotas = quotas;

        if(filterData.credit && filterData.credit !== undefined){
            filteredQuotas = filteredQuotas.filter(quota => {
                const parsedCredit = parseFloat(quota.valor_credito.replace(".", "").replace(",", "."));
                //console.log(parsedCredit, filterData.credit * 1.05);
                //console.log(quota.valor_credito, filterData.credit);
                return  parsedCredit < filterData.credit * 1.30 && parsedCredit > filterData.credit * 0.70
            })
        }

        if(filterData.value && filterData.value !== undefined){
            filteredQuotas = filteredQuotas.filter(quota => {
                const parsedValue = parseFloat(quota.entrada.replace(".", "").replace(",", "."));

                return  parsedValue < filterData.value * 1.30// && parsedValue > filterData.value * 0.70
            })
        }

        if(filterData.deadline){
            console.log("filtrou pelo prazo");
            filteredQuotas = filteredQuotas.filter(quota => {
                //return parseFloat(quota.parcelas) === filterData.deadline
                if(filterData.deadline){
                    //console.log(parseFloat(quota.parcelas), filterData.deadline * 0.80, filterData.deadline * 1.20);
                    //return false;
                    return parseFloat(quota.parcelas) > filterData.deadline * 0.80 && parseFloat(quota.parcelas) < filterData.deadline * 1.20
                }
            })
        }

        if(filterData.segment){
            filteredQuotas = filteredQuotas.filter(quota => {
                return quota.categoria === filterData.segment
            })
        }

        if(filterData.adm){
            filteredQuotas = filteredQuotas.filter(quota => {
                return quota.administradora === filterData.adm
            })
        }

        if(filterData.reserved){
            filteredQuotas = filteredQuotas.filter(quota => {
                return quota.reserva === filterData.reserved
            })
        }

        setShowingQuotas(filteredQuotas);
    }

    const handleClearFilter = () => {
        filterForm.reset();
        setShowingQuotas(quotas);
    }

    const [showingFilter, setShowingFilter] = useState(false);

    return(
        <>
        
            <Sum isOpen={isSumOpen} handleCloseSumModal={handleCloseSumModal} selectedQuotas={selectedQuotas}/>

            <Flex flexDir="column" w="100%" px="6">
                <Stack flexDir="column" w="100%" maxW="1200px" m="0 auto" pb="2" pt="16" spacing="12" justifyContent="space-between">
                    <Stack spacing="4" px={["6", "2"]}>
                        <HStack justifyContent="space-between">
                            <TextTag color="blue.primary">Filtre sua escolha</TextTag>

                            {
                                !isWideVersion && (
                                    <IconButton aria-label="" icon={<Icon as={Search} w="19px" h="19px" stroke={showingFilter ? "#000" : "#888"} fill="none"/>} _hover={{borderColor: "#000"}} border="1px solid" borderColor={showingFilter ? "#000" : "#ededed"} onClick={() => setShowingFilter(!showingFilter)}/>
                                )
                            }
                        </HStack>

                        {
                            (isWideVersion || (showingFilter && !isWideVersion)) && (
                                <Stack spacing="4" alignItems={"center"} direction={["column", "column", "row"]} as="form" onSubmit={filterForm.handleSubmit(handleFilter)} bg="rgba(67, 67, 67, 0.03)" px="6" py="4">
                                    <ControlledSelect label="Status" mt="5" control={filterForm.control} error={filterForm.formState.errors.reserved} h="45px" name="reserved" w="100%" fontSize="sm" placeholder="Selecione" focusBorderColor="black" bg="#E7E7E7" variant="filled" _hover={ {bgColor: 'gray.500'} } size="lg">
                                        <option value="Disponível">Disponíveis</option>
                                        <option value="Reservado">Reservadas</option>
                                    </ControlledSelect>

                                    <ControlledSelect label="Segmento" mt="5" control={filterForm.control} defaultValue={""} error={filterForm.formState.errors.segment} h="45px" name="segment" w="100%" fontSize="sm" placeholder="Segmento" focusBorderColor="black" bg="#E7E7E7" variant="filled" _hover={ {bgColor: 'gray.500'} } size="lg">
                                        <option value="Imóvel">Imóvel</option>
                                        <option value="Veículo">Veículo</option>
                                    </ControlledSelect>

                                    <ControlledSlider control={filterForm.control} min={0} step={2000} value={0} error={filterForm.formState.errors.credit} label="Valor do crédito" name="credit" type="text" mask="money"/>
                                    <ControlledSlider control={filterForm.control} min={0} step={2000} value={0} error={filterForm.formState.errors.value} label="Entrada até" name="value" type="text" mask="money"/>
                                    <ControlledSlider control={filterForm.control} value={1} min={0} max={220} step={10} error={filterForm.formState.errors.deadline} label="Prazo" name="deadline" type="text" mask="deadline"/>

                                    {/* <ControlledInput control={filterForm.control} error={filterForm.formState.errors.credit} name="credit" label="Crédito" type="text"/>
                                    <ControlledInput control={filterForm.control} error={filterForm.formState.errors.value} name="value" label="Entrada" type="text"/>
                                    <ControlledInput  control={filterForm.control} error={filterForm.formState.errors.deadline} name="deadline" label="Prazo" type="text"/>
                                    <ControlledInput control={filterForm.control} error={filterForm.formState.errors.adm} name="adm" label="Administradora" type="text"/> */}

                                    

                                    <Stack>
                                        <OutlineButton w={isWideVersion ? "auto" : "100%"} isLoading={filterForm.formState.isSubmitting} type="submit"  _hover={{borderColor:"blue.primary", color: "blue.primary"}} borderRadius="6px">
                                            Filtrar
                                        </OutlineButton>
                                        <Button onClick={() => handleClearFilter()} variant='link' fontSize={"12px"} color="gray.text" opacity="0.8" fontWeight={"normal"} transition="all ease 0.5s">Limpar Filtro</Button>
                                    </Stack>

                                    {/* <ControlledInput control={filterForm.control} error={filterForm.formState.errors.segment} name="segment" label="Segmento" type="text"/> */}
                                </Stack>
                            )
                        }

                    </Stack>
                    

                    <Stack spacing="8" borderRadius="4px" overflow="hidden" px="2">
                        <Stack justifyContent="space-between" p="4" direction={["column", "column", "row","row"]} spacing={["6","6","2","2","2"]}>
                            <Stack direction={["column", "column", "row","row"]}>
                                <HStack>
                                    <OutlineButton onClick={() => handleSend()} px="4" size="sm" >
                                        Compartilhar
                                    </OutlineButton>

                                    <ReactToPrint
                                        trigger={() => {
                                            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                            // to the root node of the returned component as it will be overwritten.
                                            return  <OutlineButton px="4" size="sm" leftIcon={<Icon as={Printer}/>}>
                                                        Imprimir
                                                    </OutlineButton>
                                        }}
                                        content={() => toPrintRef.current}
                                    />
                                </HStack>

                                <HStack>
                                    <ReactToPrint
                                        trigger={() => {
                                            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                            // to the root node of the returned component as it will be overwritten.
                                            return  <OutlineButton px="4" size="sm" leftIcon={<Icon as={Download}/>}>
                                                        Gerar PDF
                                                    </OutlineButton>
                                        }}
                                        content={() => toPrintRef.current}
                                    />

                                    <CSVLink data={quotas}>
                                        <OutlineButton px="4" size="sm">
                                            Salvar
                                        </OutlineButton>
                                    </CSVLink>
                                </HStack>
                            </Stack>

                            <HStack spacing="4">
                                <Checkbox colorScheme="blue" borderColor="rgba(67, 67, 67, 0.7);" onChange={handleSelectAll}><Text fontSize={fontSize}>Selecionar todas</Text></Checkbox>
                                <Checkbox colorScheme="blue" borderColor="rgba(67, 67, 67, 0.7);" onChange={handleSelectRealty}><Text fontSize={fontSize}>Imóveis</Text></Checkbox>
                                <Checkbox colorScheme="blue" borderColor="rgba(67, 67, 67, 0.7);" onChange={handleSelectVehicle}><Text fontSize={fontSize}>Veículos</Text></Checkbox>
                            </HStack>
                        </Stack>
                    </Stack>
                </Stack>
            </Flex>

            <Flex flexDir="column" w="100%" px="0">
                <Stack flexDir="column" w="100%" maxW="1200px" m="0 auto" py="36" pt="2" spacing="20" justifyContent="space-between">
                    <Table variant='simple' ref={toPrintRef} style={{borderCollapse:"separate", borderSpacing:"0 1em"}} fontFamily={"Kanit"}>
                        <Thead>
                            <Tr h="48px">
                                {/* {
                                    isWideVersion && <Th p="1" fontSize={fontSize}>Cota</Th>
                                } */}
                                <Th p="2px" fontSize={fontSize} color="blue.primary" textTransform={"capitalize"} fontWeight="normal" fontFamily={"Kanit"}>{isWideVersion && "Código"}</Th>
                                <Th p="2px" fontSize={fontSize} color="blue.primary" textTransform={"capitalize"} fontWeight="normal" fontFamily={"Kanit"}>Tipo</Th>
                                <Th p="2px" fontSize={fontSize} color="blue.primary" textTransform={"capitalize"} fontWeight="normal" fontFamily={"Kanit"}>Valor</Th>
                                <Th p="2px" fontSize={fontSize} color="blue.primary" textTransform={"capitalize"} fontWeight="normal" fontFamily={"Kanit"}>Entrada</Th>
                                <Th p="2px" fontSize={fontSize} color="blue.primary" textTransform={"capitalize"} fontWeight="normal" fontFamily={"Kanit"}>Prazo</Th>
                                <Th p="2px" fontSize={fontSize} color="blue.primary" textTransform={"capitalize"} fontWeight="normal" fontFamily={"Kanit"}>Parcela</Th>
                                <Th p="2px" fontSize={fontSize} color="blue.primary" textTransform={"capitalize"} fontWeight="normal" fontFamily={"Kanit"}>Adm</Th>
                                <Th p="2px" fontSize={fontSize} color="blue.primary" textTransform={"capitalize"} fontWeight="normal" fontFamily={"Kanit"}>{isWideVersion && "Contato"}</Th>
                                <Th p="2px" fontSize={fontSize} color="blue.primary" textTransform={"capitalize"} fontWeight="normal" fontFamily={"Kanit"}>{isWideVersion && "Status"}</Th>
                            </Tr>
                        </Thead>
                        <Tbody fontSize={fontSize}>
                            {
                                (showingQuotas && showingQuotas.length === 0 ) && (
                                    <Text>Nenhuma cota encontrada.</Text>
                                )
                            }
                            {
                                showingQuotas && showingQuotas.map((quota:Quota) =>{
                                    //onClick={(e) => handleSelectLine(e, !selectedQuotasId.includes(parseInt(quota.id)), quota.id)}
                                    return (
                                        <Tr key={`list-${quota.id}`} minH="40px" h={isWideVersion ? "42px" : "30px"} py="4" cursor="pointer">
                                            <Td p="2px" bg="rgba(67, 67, 67, 0.05)" opacity={quota.reserva === "Disponível" ? 1 : 0.6} pl={["3","5","5"]} borderLeftRadius={"6"}>
                                                <HStack>
                                                    <Checkbox colorScheme="red" isChecked={selectedQuotasId.includes(parseInt(quota.id))} value={quota.id} onChange={handleSelect}/>
                                                    
                                                        <Text onClick={() => handleSelectLine(!selectedQuotasId.includes(parseInt(quota.id)), quota.id)}>
                                                            {quota.id}
                                                        </Text>
                                                </HStack>
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" textAlign="left" p="2px" opacity={quota.reserva === "Disponível" ? 1 : 0.6} onClick={() => handleSelectLine(!selectedQuotasId.includes(parseInt(quota.id)), quota.id)}>
                                                {quota.categoria}
                                                {/* {
                                                    quota.categoria === "Imóvel" ? <Icon as={Home} stroke="#333" w={isWideVersion ? "18px" : "14px"} h={isWideVersion ? "18px" : "14px"}></Icon> : <Icon as={Car} w={isWideVersion ? "18px" : "14px"} h={isWideVersion ? "18px" : "12px"}  fill="#333"></Icon>
                                                } */}
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" p="2px" opacity={quota.reserva === "Disponível" ? 1 : 0.6} onClick={() => handleSelectLine(!selectedQuotasId.includes(parseInt(quota.id)), quota.id)}>
                                                <HStack spacing="1" fontWeight="bold">
                                                    <Text>R$ {quota.valor_credito}</Text>
                                                </HStack>
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" p="2px" opacity={quota.reserva === "Disponível" ? 1 : 0.6} onClick={() => handleSelectLine(!selectedQuotasId.includes(parseInt(quota.id)), quota.id)}>
                                                <HStack spacing="1">
                                                    <Text>R$ {quota.entrada}</Text>
                                                </HStack>
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" p="2px" opacity={quota.reserva === "Disponível" ? 1 : 0.6} onClick={() => handleSelectLine(!selectedQuotasId.includes(parseInt(quota.id)), quota.id)}>
                                                {quota.parcelas}x
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" p="2px" opacity={quota.reserva === "Disponível" ? 1 : 0.6} onClick={() => handleSelectLine(!selectedQuotasId.includes(parseInt(quota.id)), quota.id)}>
                                                <HStack spacing="1">
                                                    <small>R$</small>
                                                    <Text>{quota.valor_parcela}</Text>
                                                </HStack>
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" p="2px" opacity={quota.reserva === "Disponível" ? 1 : 0.6} onClick={() => handleSelectLine(!selectedQuotasId.includes(parseInt(quota.id)), quota.id)}>
                                                {quota.administradora}
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" opacity={quota.reserva === "Disponível" ? 1 : 0.6} borderRightRadius={"6"} p="2px" color={quota.reserva === "Disponível" ? "green.400" : "red.400"} onClick={() => handleSelectLine(!selectedQuotasId.includes(parseInt(quota.id)), quota.id)}>
                                                {
                                                    isWideVersion ? quota.reserva :
                                                    (
                                                        quota.reserva === "Disponível" ? <Check width="12px" color="#48bb78"/> : <X width="12px" color="#DB2C2C"/>
                                                    )
                                                }
                                            </Td>
                                            <Td p="2px" pl="7px">
                                                {
                                                    isWideVersion ? 
                                                    <MainButton onClick={() => handleContact(quota)} p={isWideVersion ? "" : "2"} h="45px" isDisabled={quota.reserva === "Disponível" ? false : true} fontWeight={"normal !important"}>
                                                        Investir
                                                    </MainButton>
                                                    : 
                                                    <IconButton onClick={() => handleContact(quota)} size="sm" minW="26px" h="26px" p="0" color="#48bb78" colorScheme='green' bg="transparent" border="1px solid" borderColor="gray.600" _hover={{borderColor: 'green.400'}} aria-label='Chamar no whatsapp' icon={<Whatsapp width="10px" stroke="#48bb78"/>} isDisabled={quota.reserva === "Disponível" ? false : true}/>
                                                }
                                            </Td>
                                        </Tr>
                                    )
                                })
                            }
                            
                        </Tbody>
                    </Table>
                </Stack>

                <Box position="fixed" right="20px" bottom="20px" zIndex="2" boxShadow="lg">
                    <MainButton onClick={() => handleOpenSumModal()} fontSize="md" size="lg">
                        Somar
                    </MainButton>
                </Box>
            </Flex>
        </>
    )
}
import { Box, Checkbox, Divider, Flex, Heading, HStack, Icon, IconButton, Img, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Spinner, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, useToast } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Router, { useRouter } from "next/router";
import { Check, Edit, LogOut, MoreVertical, Plus, Trash, X } from "react-feather";
import { OutlineButton } from "../../components/Buttons/OutlineButton";
import { ControlledInput } from "../../components/Forms/Inputs/ControlledInput";
import { TextTag } from "../../components/TextTag";
import { useProfile } from "../../contexts/useProfile";

import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SolidButton } from "../../components/Buttons/SolidButton";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { serverApi } from "../../services/api";
import { showErrors } from "../../contexts/useErrors";
import { ControlledSelect } from "@/components/Forms/Selects/ControlledSelect";
import { MainButton } from "@/components/Buttons/MainButton";
import { Quota, useQuotas } from "@/contexts/useQuotas";
import { NewQuotaModal } from "../../pageParts/Quotas/NewQuotaModal";
import { EditQuota, EditQuotaModal } from "../../pageParts/Quotas/EditQuotaModal";
import { ConfirmQuotaRemoveModal, RemoveQuotaData } from "../../pageParts/Quotas/ConfirmQuotaRemoveModal";
import { dateObject } from "@/utils/Date/dateObject";

interface FilterFormData{
    search?: string;
    start_date?: string;
    segment?: string;
    end_date?: string;
    group?: string;
    quota?: string;
    sold?: string;
    is_contemplated?: number;
    reserved?: string;
}

const filterFormSchema = yup.object().shape({
    search: yup.string(),
    start_date: yup.string(),
    end_date: yup.string(),
    group: yup.string(),
    segment: yup.string(),
    quota: yup.string(),
    sold: yup.string(),
    is_contemplated: yup.number().transform((v, o) => o === '' ? null : v).nullable(),
    reserved: yup.string(),
});

export default function AdminPage(){
    const toast = useToast();
    const router = useRouter();
    const { profile, signOut } = useProfile();
    const { quotas, loadQuotas, insertQuota } = useQuotas();

    const [filteredQuotas, setFilteredQuotas] = useState<Quota[]>([]);

    useEffect(() => {
        if(quotas){
            setFilteredQuotas(quotas);
        }
    }, [quotas]);

    const { control, watch, handleSubmit, formState} = useForm<FilterFormData>({
        resolver: yupResolver(filterFormSchema),
    });

    const editLogoRef = useRef<HTMLInputElement>(null);

    const handleChangeLogo = () => {
        if(editLogoRef.current){
            editLogoRef.current.click();
        }
    }

    const [profileImage, setProfileImage] = useState("");

    const [profileFileName, setProfileFileName] = useState("");
    const [toFormFile, setToFormFile] = useState<File>();


    function handleChangeFile(event: any){
        if(event.target.files.length){
            setProfileImage(URL.createObjectURL(event.target.files[0]));
            setProfileFileName(event.target.files[0].name);

            setToFormFile(event.target.files[0]);
        }else{
            setProfileImage("");
            setProfileFileName("");

            setToFormFile(event.target);
        }
    }

    const handleFilter = async (filter : FilterFormData) => {
        if(quotas){
            let newFilteredQuotas = quotas;

            if(filter.search && filter.search !== undefined){
                newFilteredQuotas = newFilteredQuotas?.filter((quota) => {
                    return quota.id == parseInt(filter.search ? filter.search : "")
                });
            }

            if(filter.start_date && filter.start_date !== undefined){
                newFilteredQuotas = newFilteredQuotas?.filter((quota) => {
                    const createdAt = new Date(quota.created_at);
                    let startDate = dateObject(filter.start_date ? filter.start_date : "");

                    return createdAt > startDate;
                });
            }

            if(filter.end_date && filter.end_date !== undefined){
                newFilteredQuotas = newFilteredQuotas?.filter((quota) => {
                    const createdAt = new Date(quota.created_at);
                    let endDate = dateObject(filter.end_date ? filter.end_date : "");

                    return createdAt > endDate;
                });
            }

            if(filter.segment && filter.segment !== undefined){
                newFilteredQuotas = newFilteredQuotas?.filter((quota) => {
                    return quota.segment == filter.segment;
                });
            }

            if(filter.quota && filter.quota !== undefined){
                newFilteredQuotas = newFilteredQuotas?.filter((quota) => {
                    return quota.quota == filter.quota;
                });
            }

            if(filter.group && filter.group !== undefined){
                newFilteredQuotas = newFilteredQuotas?.filter((quota) => {
                    return quota.group == filter.group;
                });
            }

            if(filter.is_contemplated && filter.is_contemplated !== undefined){
                newFilteredQuotas = newFilteredQuotas?.filter((quota) => {
                    if(filter.is_contemplated){
                        return quota.is_contemplated == !!!filter.is_contemplated;
                    }
                });
            }

            setFilteredQuotas(newFilteredQuotas);
        }
    }

    //console.log(quotas);

    const [color, setColor] = useState("");
    const [secondColor, setSecondColor] = useState("");

    useEffect(() => {
        if(profile){
            //setProfileImage(profile.logo && `${storageApi}${profile.logo}`);
            setColor(profile.color);
            setSecondColor(profile.second_color);
        }
    }, [profile])

    const fontSize = useBreakpointValue({base: '9px', md: 'sm', lg: '',});
    const isWideVersion = useBreakpointValue({base: false, lg: true});

    const [selectedQuotasId, setSelectedQuotasId] = useState<number[]>([]);
    const [selectedQuotas, setSelectedQuotas] = useState<Quota[]>([]);

    const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target?.checked && quotas){
            setSelectedQuotasId([...selectedQuotasId, parseInt(event.target?.value)]);
            //console.log(quotas.filter(quota => quota.id === event.target?.value)[0]);
            setSelectedQuotas([...selectedQuotas,(quotas.filter(quota => quota.id === parseInt(event.target?.value))[0])]);
        }else{
            setSelectedQuotasId(selectedQuotasId.filter((quotaId) => quotaId !== parseInt(event.target?.value)));
            //console.log(selectedQuotas.filter((quota) => quota.id !== event.target?.value));
            setSelectedQuotas(selectedQuotas.filter((quota) => quota.id !== parseInt(event.target?.value)));
        }
    }

    const handleSelectLine = (checked: boolean, id: number) => {

        if(checked && quotas){
            setSelectedQuotasId([...selectedQuotasId, id]);
            //console.log(quotas.filter(quota => quota.id === id)[0]);
            setSelectedQuotas([...selectedQuotas, quotas.filter(quota => quota.id === id)[0]]);
        }else{
            setSelectedQuotasId(selectedQuotasId.filter((quotaId) => quotaId !== id));
            //console.log(selectedQuotas.filter((quota) => quota.id !== id));
            setSelectedQuotas(selectedQuotas.filter((quota) => quota.id !== id));
        }
    }

    const handleSelectRealty = (event: ChangeEvent<HTMLInputElement>) => {
        const realtyQuotas = quotas ? quotas.filter((quota:Quota) => quota.segment === "Imóvel") : [];
        const realtyQuotasId = realtyQuotas ?  realtyQuotas.map((quota: Quota) => quota.id) : [];

        if(event.target?.checked){
            setSelectedQuotasId([...selectedQuotasId, ...realtyQuotasId]);
            setSelectedQuotas([...selectedQuotas, ...realtyQuotas]);
        }else{
            const selectedQuotasWithoutRealtyId = selectedQuotasId.map((quotaId) => {
                if(!realtyQuotasId.includes(quotaId)){ return quotaId;}

                return 0;
            });

            setSelectedQuotasId(selectedQuotasWithoutRealtyId);
            setSelectedQuotas(realtyQuotas.filter((quota:Quota) => quota.segment === "Veículo"));
        }
    }

    const handleSelectVehicle = (event: ChangeEvent<HTMLInputElement>) => {
        const vehicleQuotas = quotas ? quotas.filter((quota:Quota) => quota.segment === "Veículo") : [];
        const vehicleQuotasId = vehicleQuotas ? vehicleQuotas.map((quota: Quota) => quota.id) : [];

        if(event.target?.checked){
            setSelectedQuotasId([...selectedQuotasId, ...vehicleQuotasId]);
            setSelectedQuotas([...selectedQuotas, ...vehicleQuotas]);
        }else{
            const selectedQuotasWithoutVehicle = selectedQuotasId.map((quotaId) => {
                if(!vehicleQuotasId.includes(quotaId)){ return quotaId;}

                return 0;
            })

            setSelectedQuotasId(selectedQuotasWithoutVehicle);
            setSelectedQuotas(vehicleQuotas.filter((quota:Quota) => quota.segment === "Imóvel"));
        }
    }

    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target?.checked){
            const newSelectedQuotasId = quotas ? quotas.map((quota: Quota) => quota.id) : [];
            setSelectedQuotasId(newSelectedQuotasId);
            setSelectedQuotas(quotas ? quotas : []);
        }else{
            setSelectedQuotasId([0]);
            setSelectedQuotas([]);
        }
    }

    const [isNewQuotaModalOpen, setIsNewQuotaModalOpen] = useState(false);

    function OpenNewQuotaModal(){
        setIsNewQuotaModalOpen(true);
    }
    function CloseNewQuotaModal(){
        setIsNewQuotaModalOpen(false);
    }

    const [isEditQuotaModalOpen, setIsEditQuotaModalOpen] = useState(false);
    const [editQuotaData, setEditQuotaData] = useState<EditQuota>(() => {

        const data: EditQuota = {
            id: 0,
            credit: '',
            admin: '',
            sold: false,
            reserved: false,
            value: '',
            deadline: 0,
            parcel: '',
            segment: '',
            seller: '',
            contemplated_type: '',
            is_contemplated: false,
            is_hot: false,
            cost: '',
            total_cost: '',
            cpf_cnpj: '',
            description: '',
            group: '',
            quota: '',
        };
        
        return data;
    });

    function OpenEditQuotaModal(quotaData: EditQuota){
        setEditQuotaData(quotaData);
        setIsEditQuotaModalOpen(true);
    }
    function CloseEditQuotaModal(){
        setIsEditQuotaModalOpen(false);
    }

    const [isConfirmRemoveQuotaModalOpen, setIsConfirmRemoveQuotaModalOpen] = useState(false);
    const [removeQuotaData, setRemoveQuotaData] = useState<RemoveQuotaData>(() => {

        const data: RemoveQuotaData = {
            group: '',
            quota: '',
            id: 0,
        };
        
        return data;
    });

    function OpenConfirmRemoveQuotaModal(quotaData: RemoveQuotaData){
        setRemoveQuotaData(quotaData);
        setIsConfirmRemoveQuotaModalOpen(true);
    }
    function CloseConfirmRemoveQuotaModal(){
        setIsConfirmRemoveQuotaModalOpen(false);
    }

    console.log(quotas);

    return profile ? (
        <Box bg="gray.100">
            <NewQuotaModal afterCreate={loadQuotas} isOpen={isNewQuotaModalOpen} onRequestClose={CloseNewQuotaModal}/>
            <EditQuotaModal afterEdit={loadQuotas} isOpen={isEditQuotaModalOpen} onRequestClose={CloseEditQuotaModal} toEditQuotaData={editQuotaData}/>
            <ConfirmQuotaRemoveModal afterRemove={loadQuotas} isOpen={isConfirmRemoveQuotaModalOpen} onRequestClose={CloseConfirmRemoveQuotaModal} toRemoveQuotaData={removeQuotaData}/>

            <Flex flexDir="column" w="100%" bg="white" boxShadow="sm" mb="10" px="6">
                <HStack w="100%" maxW="1000px" m="0 auto" py="8" justifyContent="space-between">
                    <HStack spacing={["6","12"]}>
                        <a href="https://ssinvestimentos.com.br">
                            <Img w="100%" maxW={["250px", "250px", "250px" ]} src={`/logo_black.svg`} alt="SS Investimentos" flexWrap="wrap"/>
                        </a>
                        <Divider orientation="vertical" borderColor="blue.primary" h="30px" />
                        <Heading fontSize={["lg", "xl", "2xl" ]} fontWeight="normal" color="gray.900">Plataforma de contempladas</Heading>
                    </HStack>

                    <OutlineButton onClick={() => signOut()} px="4" size="sm" leftIcon={<Icon as={LogOut} />} borderColor="gray.300" _hover={{borderColor: 'gray.900'}}>
                        Sair
                    </OutlineButton>
                </HStack>
            </Flex>

            <Flex flexDir="column" w="100%" px="6">
                <Stack w="100%" maxW="1000px" m="0 auto" py="5" spacing="14" mb="32">
                    <Stack flexDirection={['column', 'row']} spacing="8" justifyContent="space-between">
                        <Stack>
                            <TextTag>Olá, {profile.name}!</TextTag>
                            <Heading color="gray.900">Gerencie seu estoque de cartas</Heading>
                        </Stack>
                    </Stack>
                    
                    <Stack bg="rgba(0,0,0,0.04)" px="6" py="6" borderRadius={"7"}>
                        <Text fontSize={"2xl"}>Filtrar</Text>

                        <Stack as="form" spacing="5" onSubmit={handleSubmit(handleFilter)}>
                            <Stack  direction={["column", "row"]} spacing="6">
                                <ControlledInput control={control} type="text" name="search" label="Procurar" error={formState.errors.search}/>
                                <ControlledInput control={control} type="date" name="start_date" label="Data Inicial" error={formState.errors.start_date}/>
                                <ControlledInput control={control} type="date" name="end_date" label="Data Final" error={formState.errors.end_date}/>
                                <ControlledSelect control={control} name="segment" label="Segmento" placeholder="Todas" error={formState.errors.segment}>
                                    <option value={"Imóvel"}>Imóvel</option>
                                    <option value={"Veículo"}>Veículo</option>
                                </ControlledSelect>
                            </Stack>

                            <Stack direction={["column", "row"]} spacing="6" alignItems={"self-end"}>
                                <ControlledInput control={control} type="text" name="group" label="Grupo" error={formState.errors.group}/>
                                <ControlledInput control={control} type="text" name="quota" label="Cota" error={formState.errors.quota}/>
                                <ControlledSelect control={control} name="is_contemplated" label="Situação" placeholder="Todas" error={formState.errors.is_contemplated}>
                                    <option value={1}>Contemplada</option>
                                    <option value={0}>Não contemplada</option>
                                </ControlledSelect>

                                <MainButton isLoading={formState.isSubmitting} type="submit" h="50">Filtrar</MainButton>
                            </Stack>

                            {/* <Flex px="6" w="100%" pos="fixed" bottom="0" left="0" right="0" bg="white" zIndex={1} boxShadow="sm">
                                <Flex m="0 auto" py="4" w="100%" maxW="1000px" justifyContent="right">
                                    <SolidButton isLoading={formState.isSubmitting} type="submit" colorScheme="red" h="50">Salvar</SolidButton>
                                </Flex>
                            </Flex> */}
                        </Stack>
                    </Stack>

                    <Table variant='simple' style={{borderCollapse:"separate", borderSpacing:"0 1em"}} fontFamily={"Kanit"}>
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
                                <Th p="2px" fontSize={fontSize} color="blue.primary" textTransform={"capitalize"} fontWeight="normal" fontFamily={"Kanit"}>Administradora</Th>
                                <Th p="2px" fontSize={fontSize} color="blue.primary" textTransform={"capitalize"} fontWeight="normal" fontFamily={"Kanit"}>Reserva</Th>
                                <Th p="2px" fontSize={fontSize} color="blue.primary" textTransform={"capitalize"} fontWeight="normal" fontFamily={"Kanit"}>Disponível</Th>
                                <Th p="2px" fontSize={fontSize} color="blue.primary" textTransform={"capitalize"} fontWeight="normal" fontFamily={"Kanit"}>Ações</Th>
                            </Tr>
                        </Thead>
                        <Tbody fontSize={fontSize}>
                            <OutlineButton onClick={OpenNewQuotaModal} colorScheme={"green"} size="sm" h="32px" leftIcon={<Icon as={Plus}/>} px="6" pl="5">Adicionar</OutlineButton>
                            
                            {
                                (filteredQuotas && filteredQuotas.length === 0 ) && (
                                    <Text>Nenhuma cota encontrada.</Text>
                                )
                            }

                            {
                                (filteredQuotas && filteredQuotas.length > 0) && filteredQuotas.map((quota:Quota) =>{
                                    const toEditQuotaData:EditQuota = {
                                        id: quota.id,
                                        sold: quota.sold,
                                        admin: quota.admin,
                                        reserved: quota.reserved,
                                        credit: quota.credit.toFixed(2).replace('.',','),
                                        common_fund: quota.common_fund ? quota.common_fund.toFixed(2).replace('.',',') : '',
                                        value: quota.value ? quota.value.toFixed(2).replace('.',',') : '',
                                        deadline: quota.deadline ? quota.deadline : 0,
                                        parcel: quota.parcel ? quota.parcel.toFixed(2).replace('.',',') : '',
                                        segment: quota.segment,
                                        seller: quota.seller,
                                        contemplated_type: quota.contemplated_type ? quota.contemplated_type : '',
                                        cost: quota.cost ?  quota.cost.toFixed(2).replace('.',',') : '',
                                        total_cost: quota.total_cost ? quota.total_cost.toFixed(2).replace('.',',') : "",
                                        cpf_cnpj: quota.cpf_cnpj,
                                        description: quota.description,
                                        group: quota.group,
                                        quota: quota.quota,
                                        tax: quota.tax ? quota.tax.toFixed(2).replace('.',',') : '',
                                        is_contemplated: quota.is_contemplated,
                                        is_hot: quota.is_hot,
                                        month_adjust_number: quota.month_adjust_number,
                                        adjust_index: quota.adjust_index
                                    };

                                    //onClick={(e) => handleSelectLine(e, !selectedQuotasId.includes(quota.id), quota.id)}
                                    return (
                                        <Tr key={quota.id} minH="40px" h={isWideVersion ? "42px" : "30px"} py="4">
                                            <Td p="2px" bg="rgba(67, 67, 67, 0.05)" opacity={!quota.reserved ? 1 : 0.6} pl={["2","4","4"]} borderLeftRadius={"6"}>
                                                <HStack>
                                                    <Checkbox colorScheme="red" isChecked={selectedQuotasId.includes(quota.id)} value={quota.id} onChange={handleSelect}/>
                                                    
                                                        <Text onClick={() => handleSelectLine(!selectedQuotasId.includes(quota.id), quota.id)}>
                                                            {quota.id}
                                                        </Text>
                                                </HStack>
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" textAlign="left" p="2px" opacity={!quota.reserved ? 1 : 0.6}>
                                                {quota.segment}
                                                {/* {
                                                    quota.categoria === "Imóvel" ? <Icon as={Home} stroke="#333" w={isWideVersion ? "18px" : "14px"} h={isWideVersion ? "18px" : "14px"}></Icon> : <Icon as={Car} w={isWideVersion ? "18px" : "14px"} h={isWideVersion ? "18px" : "12px"}  fill="#333"></Icon>
                                                } */}
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" p="2px" opacity={!quota.reserved ? 1 : 0.6} >
                                                <HStack spacing="1" fontWeight="bold">
                                                    <Text>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(quota.credit)}</Text>
                                                </HStack>
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" p="2px" opacity={quota.reserved ? 1 : 0.6} >
                                                <HStack spacing="1">
                                                    <Text>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(quota.value ? quota.value : 0)}</Text>
                                                </HStack>
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" p="2px" opacity={!quota.reserved ? 1 : 0.6} >
                                                {quota.deadline}x
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" p="2px" opacity={!quota.reserved ? 1 : 0.6} >
                                                <HStack spacing="1">
                                                    <Text>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(quota.parcel)}</Text>
                                                </HStack>
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" p="2px" opacity={!quota.reserved ? 1 : 0.6} >
                                                {quota.admin}
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" opacity={!quota.reserved ? 1 : 0.6} borderRightRadius={"6"} p="2px" color={quota.reserved ? "green.400" : "gray.text"}>
                                                {
                                                    !quota.reserved ? <Text>--</Text> : <X width="12px" color="#DB2C2C"/>
                                                }
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" opacity={!quota.reserved ? 1 : 0.6} borderRightRadius={"6"} p="2px" color={quota.reserved ? "green.400" : "gray.text"}>
                                                {
                                                    !quota.reserved ? <Text>--</Text> : <X width="12px" color="#DB2C2C"/>
                                                }
                                            </Td>
                                            <Td bg="rgba(67, 67, 67, 0.05)" opacity={!quota.reserved ? 1 : 0.6} borderRightRadius={"6"} p="2px" >
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <IconButton aria-label='Gerenciar carta' icon={<MoreVertical />} />
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <PopoverArrow />
                                                        <PopoverCloseButton />
                                                        <PopoverBody>
                                                            <Stack>
                                                                <OutlineButton onClick={() => OpenEditQuotaModal(toEditQuotaData)} leftIcon={<Icon as={Edit}/>} colorScheme={"orange"} size="sm" h="32px">Alterar</OutlineButton>
                                                                <OutlineButton onClick={() => OpenConfirmRemoveQuotaModal({ id: quota.id, group: quota.group ? quota.group : "", quota: quota.quota ? quota.quota : "" })} leftIcon={<Icon as={Trash}/>} colorScheme={"red"} size="sm" h="32px">Remover</OutlineButton>
                                                            </Stack>
                                                        </PopoverBody>
                                                    </PopoverContent>
                                                </Popover>
                                            </Td>
                                        </Tr>
                                    )
                                })
                            }
                            
                        </Tbody>
                    </Table>
                </Stack>
            </Flex>
        </Box>
    ) : (
        <Flex flexDirection="column" w="100vw" h="100vh" bg="gray.200" alignItems="center" justifyContent="center">
            <Spinner/>
        </Flex>
    )
}
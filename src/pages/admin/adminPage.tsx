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

interface ProfileFormData{
    name: string;
    name_display?: string;
    email: string;
    email_display?: string;
    address: string;
    phone: string;
    logo?: File;
    color?: string;
    second_color?: string;
}

const profileFormSchema = yup.object().shape({
    name: yup.string().required('É preciso inserir um nome'),
    name_display: yup.string().nullable(),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido.'),
    email_display: yup.string().email('E-mail inválido.').nullable(),
    address: yup.string().required('Endereço é obrigatório'),
    phone: yup.string().required('Telefone é obrigatório'),
    color: yup.string().required('Defina uma cor principal para sua página'),
    second_color: yup.string().required('Defina uma cor secundária para sua página'),
});

export default function AdminPage(){
    const toast = useToast();
    const router = useRouter();
    const { profile, signOut } = useProfile();
    const { quotas, loadQuotas, insertQuota } = useQuotas();

    const { control, watch, handleSubmit, formState} = useForm<ProfileFormData>({
        resolver: yupResolver(profileFormSchema),
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

    const handleSaveProfile = async (selfData : ProfileFormData) => {
        try{
            const userFormedData = new FormData();
            if(toFormFile !== undefined){
                userFormedData.append('logo', toFormFile);
            }

            userFormedData.append('name', selfData.name);
            userFormedData.append('name_display', selfData.name_display ? selfData.name_display : '');
            userFormedData.append('email', selfData.email);
            userFormedData.append('email_display', selfData.email_display ? selfData.email_display : '');
            userFormedData.append('phone', selfData.phone);
            userFormedData.append('address', selfData.address);
            userFormedData.append('color', selfData.color ? selfData.color : '');
            userFormedData.append('second_color', selfData.second_color ? selfData.second_color : '');

            if(profile){
                await serverApi.post('/users/self', userFormedData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });

                toast({
                    title: "Sucesso",
                    description: `Seus dados foram salvos.`,
                    status: "success",
                    variant: 'left-accent',
                    duration: 12000,
                    isClosable: true,
                });
            }

        }catch(error: any) {
            showErrors(error, toast);

            if(error.response && error.response.data.access){
                router.push('/');
            }
        }
    }

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
                            <TextTag>Olá {profile.name}!</TextTag>
                            <Heading color="gray.900">Gerencie seu estoque de cartas</Heading>
                        </Stack>
                    </Stack>
                    
                    <Stack bg="rgba(0,0,0,0.04)" px="6" py="6" borderRadius={"7"}>
                        <Text fontSize={"2xl"}>Filtrar</Text>

                        <Stack as="form" spacing="5" onSubmit={handleSubmit(handleSaveProfile)}>
                            <Stack  direction={["column", "row"]} spacing="6">
                                <ControlledInput control={control} type="text" name="search" value={profile.name} label="Procurar" error={formState.errors.name}/>
                                <ControlledInput control={control} type="text" name="start_date" value={profile.name_display} label="Data Inicial" error={formState.errors.name_display}/>
                                <ControlledInput control={control} type="text" name="end_date" value={profile.name_display} label="Data Final" error={formState.errors.name_display}/>
                                <ControlledSelect control={control} name="segment" value={profile.name_display} label="Segmento" error={formState.errors.name_display}>
                                    <option value="Imóvel">Imóvel</option>
                                    <option value="Veículo">Veículo</option>
                                </ControlledSelect>
                            </Stack>

                            <Stack direction={["column", "row"]} spacing="6" alignItems={"self-end"}>
                                <ControlledInput control={control} type="text" name="group" value={profile.email} label="Grupo" error={formState.errors.email}/>
                                <ControlledInput control={control} type="text" name="quote" value={profile.email_display} label="Cota" error={formState.errors.email_display}/>
                                <ControlledSelect control={control} name="segment" value={profile.name_display} label="Segmento" error={formState.errors.name_display}>
                                    <option value="Imóvel">Imóvel</option>
                                    <option value="Veículo">Veículo</option>
                                </ControlledSelect>
                                <ControlledSelect control={control} name="segment" value={profile.name_display} label="Segmento" error={formState.errors.name_display}>
                                    <option value="Imóvel">Imóvel</option>
                                    <option value="Veículo">Veículo</option>
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
                                (quotas && quotas.length === 0 ) && (
                                    <Text>Nenhuma cota encontrada.</Text>
                                )
                            }

                            {
                                (quotas && quotas.length > 0) && quotas.map((quota:Quota) =>{
                                    console.log(quota);
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
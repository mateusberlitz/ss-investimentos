import { Checkbox, Flex, Stack, Text, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { SolidButton } from "../../../components/Buttons/SolidButton";
import { Input } from "../../../components/Forms/Inputs/Input";

import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from "../../../services/api";
import { useRouter } from "next/router";
import { ProfileProvider, useProfile } from "../../../contexts/useProfile";
import { ControlledInput } from "../../../components/Forms/Inputs/ControlledInput";
import { MainButton } from "@/components/Buttons/MainButton";

interface SignInFormData{
    email: string;
    password: string;
    remember?: string;
}

const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido.'),
    password: yup.string().required('Senha Obrigatória'),
    remember: yup.string()
});

export default function LoginPage(){
    const toast = useToast();
    const router = useRouter();

    const { control, watch, handleSubmit, formState} = useForm<SignInFormData>({
        resolver: yupResolver(signInFormSchema),
    });

    const {isAuthenticated, signIn} = useProfile();

    if(isAuthenticated){
        router.push('/admin');
    }

    return(
        <ProfileProvider>
            <Flex flexDirection="column" px="6" w="100vw" h="100vh" bg="gray.200" alignItems="center" justifyContent="center">
                <Text fontSize="2xl" color="color.800" mb="8">Gerenciador</Text>

                <Stack as="form" onSubmit={handleSubmit(signIn)} spacing="7" bg="white" p="8" w="100%" maxW="380px" borderRadius="5" boxShadow="lg" mb="8">
                    <Text fontSize="2xl" fontWeight="bold">Login</Text>

                    <ControlledInput control={control} name="email" type="email" label="E-mail" error={formState.errors.email} placeholder={"Informe seu e-mail"}/>
                    <ControlledInput control={control} name="password" type="password" label="Senha" error={formState.errors.password} placeholder={"Sua senha"}/>

                    {/* <Checkbox color="gray.600" colorScheme="red">Lembrar acesso</Checkbox> */}

                    <MainButton isLoading={formState.isSubmitting} type="submit" w="100%" h="50">Entrar</MainButton>
                </Stack>

                {/* <Link href="/password"><Text color="gray.700">Esqueci minha senha</Text></Link> */}
            </Flex>
        </ProfileProvider>
    )
}
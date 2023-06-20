import { MainButton } from "@/components/Buttons/MainButton";
import { OutlineButton } from "@/components/Buttons/OutlineButton";
import { ControlledInput } from "@/components/Forms/Inputs/ControlledInput";
import { showErrors } from "@/hooks/useErrors";
import { serverApi } from "@/services/api";
import { Flex, Heading, HStack, Stack, Text, useBreakpointValue, useToast } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

interface ContactFormData{
    subject: string;
    name: string;
    email: string;
    phone: string;
    message: string;
}

const ContactFormSchema = yup.object().shape({
    subject: yup.string().required("Qual o assunto da mensagem?"),
    name: yup.string().required("Informe o seu nome"),
    email: yup.string().email("Informe um e-mail válido").required('Preencha o e-mail'),
    phone: yup.string().required('Informe seu telefone'),
    message: yup.string().required('Escreva uma mensagem'),
});

export function Contact(){
    const isWideVersion = useBreakpointValue({base: false, lg: true,});

    const router = useRouter();
    const toast = useToast();

    const contactForm = useForm<ContactFormData>({
        resolver: yupResolver(ContactFormSchema),
        defaultValues:{
            subject: "",
            name: "",
            email: "",
            phone: "",
            message: "",
        }
    });

    const [sent, setSent] = useState(false);

    const handleSendContact = async (contactData: ContactFormData) => {
        try{
            const result = await serverApi.post('/leads/contact/', {...contactData, send_mail: "true"}).then(response => response.data);

            setSent(true);
        }catch(error: any){
            showErrors(error, toast);
        }
    }

    return(
        <Flex id="contato" m="0 auto" w="100%" pos="relative" bg="url(./images/robson_bg.jpg)" backgroundSize="cover" backgroundPosition={["center left","center left","center right","center right","center right"]}>
            <Flex bg="linear-gradient(356.76deg, rgba(33, 39, 73, 0.37) 6.14%, #212749 122.55%)" w="100%" _before={{content: '""', pos: "absolute", bg: "gradient", height: "100%", w: ["5px","10px","10px","10px","20px"]}}>
                <Stack w="100%" maxW="1200px" m="0 auto" p={["0", "auto" ]} py="24" px="6" flexDirection="column" alignItems="left">
                    <Stack spacing="16" w="100%" maxW="500px" as="form" onSubmit={contactForm.handleSubmit(handleSendContact)}>
                        <Text color="white" fontSize={"46px"} fontWeight="medium" lineHeight={"58px"}>Contato</Text>

                        <Stack transition="all ease 0.5s">
                            <Stack spacing="8" opacity={sent ? 0 : 1} display={sent ? "none" : "flex"} transition="all ease 0.5s">
                                <ControlledInput isDisabled={contactForm.formState.isSubmitting} control={contactForm.control} error={contactForm.formState.errors.subject} variant="white" name="subject" type="text" placeholder="Qual é o assunto da mensagem?" label='Assunto*'/>

                                <ControlledInput isDisabled={contactForm.formState.isSubmitting} control={contactForm.control} error={contactForm.formState.errors.name} variant="white" name="name" type="text" placeholder="Qual é o seu nome?" label='Nome completo*'/>

                                <ControlledInput isDisabled={contactForm.formState.isSubmitting} control={contactForm.control} error={contactForm.formState.errors.email} variant="white" name="email" type="text" placeholder="exemplo@email.com" label='E-mail*'/>

                                <ControlledInput isDisabled={contactForm.formState.isSubmitting} control={contactForm.control} error={contactForm.formState.errors.phone} variant="white" name="phone" mask="phone" type="tel" placeholder="(DDD) x xxxx-xxxx" label='Telefone*'/>

                                <ControlledInput isDisabled={contactForm.formState.isSubmitting} control={contactForm.control} error={contactForm.formState.errors.message} variant="white" as="textarea" name="message" type="text" placeholder="Digite aqui a sua mensagem..." label='Mensagem*' height="120px" resize={'unset'}/>

                                <MainButton type="submit" isLoading={contactForm.formState.isSubmitting}>Enviar</MainButton>
                            </Stack>

                            <Stack color="white" spacing="10" display={sent ? "flex" : "none"} opacity={sent ? 1 : 0} visibility={sent ? "visible" : "hidden"} transition="all ease 0.5s">
                                <Text color="white" fontSize={"28px"} fontWeight="medium" lineHeight={"32px"}>Mensagem enviada!</Text>

                                <Text>Obrigado por ter entrado em contato, em breve responderemos. Se quiser confira alguns créditos prontos para o uso ou entrar em contato pelo whatsapp.</Text>
                            
                                <HStack spacing="6">
                                    <MainButton onClick={() => window.open(`https://api.whatsapp.com/send?phone=5551985994869&text=`, '_blank')}>Falar pelo whatsapp</MainButton>
                                    <OutlineButton h="57px" borderColor="gray.600" _hover={{borderColor: "white"}} onClick={() => router.push('/contempladas')}>Cartas contempladas</OutlineButton>
                                </HStack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Flex>
        </Flex>
    )
}
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { setDefaultResultOrder } from "dns";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { api, serverApi } from "../../services/api";


interface ProfileProviderProps{
    children: ReactNode;
}

interface SimplePermission{
    name: string;
}

interface ProfileContextData{
    profile?: Profile;
    isAuthenticated: Boolean;
    signIn: (signInData: SignInFormData) => Promise<void>;
    signOut: () => void;
}

interface SignInFormData{
    email: string;
    password: string;
    remember?: string;
}

interface Profile{
    name: string;
    name_display: string;
    email: string;
    email_display: string;
    address: string;
    phone: string;
    logo: string;
    color: string;
    second_color: string;
}

const ProfileContext = createContext<ProfileContextData>({} as ProfileContextData);

export function ProfileProvider({ children } : ProfileProviderProps){
    const toast = useToast();
    const [profile, setProfile] = useState<Profile>();
    const [token, setToken] = useState<string>(() => {

        const { 'ss.token' : token } = parseCookies();

        return token;

    });
    const isAuthenticated = !!profile;
    const router = useRouter();

    async function signIn(signInData : SignInFormData){
        try{
            const response = await api.post('/authenticate', signInData);

            const data = response.data

            setCookie(undefined, 'ss.token', data.access_token, {
                maxAge: data.expires_in,
                path: '/'
            });

            setToken(data.access_token);

            router.push('/admin');
        }catch(error:any) {
            let errorMessage = '';

            if(error.response){
                errorMessage = error.response.data.error;
            }else{
                errorMessage = error.message;
            }

            toast({
                title: 'Erro.',
                description: errorMessage,
                status: 'error',
                variant: 'left-accent',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    async function signOut(){
        destroyCookie(undefined, 'partner.token');

        router.push('/admin/login')
    }

    useEffect(() => {
        loadProfile();
    }, []);

    //LOADERS
    const loadProfile = async () => {
        if(token){
            await serverApi.get('/me')
            .then((response) => setProfile(response.data))
            .catch((error: AxiosError) => {
                signOut();
            });
        }else{
            if(router.asPath !== '/admin/login'){
                signOut();
            }
        }
    }

    return(
        <ProfileContext.Provider value={{profile, signIn, signOut, isAuthenticated}}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileContext);
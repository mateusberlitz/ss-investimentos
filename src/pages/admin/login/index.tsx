import { ProfileProvider } from "../../../contexts/useProfile";
import LoginPage from "./loginPage";

export default function Login(){
    return (
        <ProfileProvider>
            <LoginPage />
        </ProfileProvider>
    )
}
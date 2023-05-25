import { ProfileProvider } from "../../contexts/useProfile";
import AdminPage from "./adminPage";

export default function Admin(){
    return(
        <ProfileProvider>
            <AdminPage />
        </ProfileProvider>
    )
}
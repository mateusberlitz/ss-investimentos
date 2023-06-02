export function useErrors(){
    return {showErrors};
}

export const showErrors = (error: any, toast: any) => {
    let errorMessage = "";
    let messageTitle = "Erro."

    if(error.response){
        const responseData = error.response.data;

        if(responseData.errors){
            Object.keys(responseData.errors).map((key, field) => {
                responseData.errors[key].map((error:string) => {
                    toast({
                        title: key,
                        description: error,
                        status: "warning",
                        duration: 12000,
                        isClosable: true,
                    });

                    return true;
                })

                return true;
            })

            return;
        }else if(responseData.error){
            errorMessage = responseData.error;
        }else if(responseData.access){
            errorMessage = responseData.access;
            messageTitle = "Acesso."
        }else if(responseData.status){
            errorMessage = responseData.status;
            messageTitle = "Ops."
        }else{
            Object.keys(responseData).map((key, field) => {
                responseData[key].map((error:string) => {
                    toast({
                        title: key,
                        description: error,
                        status: "warning",
                        duration: 12000,
                        isClosable: true,
                    });

                    return true;
                })

                return true;
            })

            return;
        }
    }else{
        errorMessage = error.message;
    }


    toast({
        title: messageTitle,
        description: errorMessage,
        status: (messageTitle === "Erro." ? "error" : "warning"),
        duration: 9000,
        isClosable: true,
    });
}
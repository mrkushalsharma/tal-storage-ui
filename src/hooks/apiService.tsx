/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';
import { ApiError, OpenAPI } from '../services/api-services';
import { toast } from 'react-toastify';

export function apiService() {
    const [error, setError] = useState<ApiError | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Set API base URL and token
    OpenAPI.BASE = "https://tal-storage.onrender.com";

    if(localStorage.getItem("token")){
        OpenAPI.HEADERS = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };
    }
    const handleRequest = useCallback(async function <T>(
        request: Promise<T>
    ): Promise<T | undefined> {
        setIsLoading(true);
        try {
            const response = await request;
            setError(undefined);
            return response;
        } catch (exception: any) {
            setError(exception);
            console.log(exception?.body?.errors)
            if (exception?.body?.message) {
                toast.error(exception.body.message);
            } 
            else if(exception?.body.status == 400 && exception?.body?.errors){
                const errorMessage = Object.keys(exception?.body?.errors)
                .map((key) => `${key}: ${exception?.body?.errors[key].join(", ")}`)
                .join(" | ");
                toast.error(errorMessage);
            }else{
                toast.error("Please Try again. Some thing went wrong.");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { error, isLoading, handleRequest };
}

export default apiService;
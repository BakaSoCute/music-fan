import { useMutation, useQueryClient } from "@tanstack/react-query"
import {client} from "../../../shared/api/client"


export const useLoginMutation = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
    mutationFn: async ({code} : {code: string}) => {
        const response = await client.POST("/auth/login", {
            body: {
                code: code,
                redirectUri: import.meta.env.VITE_CALLBACK_URL,
                rememberMe: true,
                accessTokenTTL: "1d"
            }
        })
        if (response.error) {
            throw new Error(response.error.message)
        }
        return response.data
    },
    onSuccess: (data) => {
        // так токены лучше не хранить, но проект учебный и поместить токены в куки на данном проекте проблематично
        localStorage.setItem("musicfun-refresh-token", data.refreshToken)
        localStorage.setItem("musicfun-access-token", data.accessToken)
        queryClient.invalidateQueries({
            queryKey:["auth", "me"]
        })
    }
    })
    return mutation
}
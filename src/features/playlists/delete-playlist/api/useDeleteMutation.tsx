import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "../../../../shared/api/client"
import type { SchemaGetPlaylistOutput } from "../../../../shared/api/schema"


export const useDeleteMutation = (playlistId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async () => {
            const response = await client.DELETE("/playlists/{playlistId}",{
                params: {path: {playlistId}}
            })
            return response.data
        },
        onSuccess: () => {
            queryClient.setQueriesData({queryKey:["playlists"]}, (oldData: SchemaGetPlaylistOutput) => {
                return {
                    ...oldData,
                    data: oldData.data.filter((p: { id: string }) => p.id !== playlistId)
                }
            })

            // queryClient.invalidateQueries({
            //     queryKey: ["playlists"],
            //     refetchType: "all"
            // })
        }
    })
}
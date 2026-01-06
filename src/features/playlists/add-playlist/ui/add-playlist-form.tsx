import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import type { SchemaCreatePlaylistRequestPayload } from "../../../../shared/api/schema"
import { client } from "../../../../shared/api/client"

export const AddPlaylystForm = () => {

    const {register,handleSubmit} = useForm<SchemaCreatePlaylistRequestPayload>()
    const queryClient = useQueryClient()
 
    const {mutate} = useMutation({
        mutationFn: async (data: SchemaCreatePlaylistRequestPayload) => {
            const response = await client.POST("/playlists", {
                body: data
            })
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:["playlists"],
                refetchType: "all"
            })
        }
    })

    const onSubmit = (data: SchemaCreatePlaylistRequestPayload) => {
        mutate(data)
    }
return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Add new Playlist</h2>
        <p>
            <input {...register("title")}/>
        </p>
        <p>
            <textarea{...register("description")}></textarea>
        </p>
        <button type="submit">Add playlist</button>
    </form>
)
}
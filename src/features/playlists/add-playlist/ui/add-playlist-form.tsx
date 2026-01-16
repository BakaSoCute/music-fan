import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import type { SchemaCreatePlaylistRequestPayload } from "../../../../shared/api/schema"
import { client } from "../../../../shared/api/client"
import style from "../../../../app/style/playlist.module.css"

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
                refetchType: "active"
            })
        }
    })

    const onSubmit = (data: SchemaCreatePlaylistRequestPayload) => {
        mutate(data)
    }
return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Добавить новый плейлист</h2>
        <p>
            Название<input {...register("title")}/>
        </p>
        <p>
            Описание<textarea{...register("description")}></textarea>
        </p>
        <button type="submit">Add playlist</button>
    </form>
)
}
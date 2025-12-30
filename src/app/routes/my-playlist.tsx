import { createFileRoute } from '@tanstack/react-router'
import { MyPlaylistPage } from '../pages/MyPlaylistPage'

export const Route = createFileRoute('/my-playlist')({
  component: MyPlaylistPage,
})

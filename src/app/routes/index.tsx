import { createFileRoute } from '@tanstack/react-router'
import { PlaylistPage } from '../pages/PlaylistPage'

export const Route = createFileRoute('/')({
  component: PlaylistPage,
})

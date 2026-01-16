import { createFileRoute } from '@tanstack/react-router'
import { TracksPage } from '../pages/TracksPage'

export const Route = createFileRoute('/my-tracks')({
  component: TracksPage,
})

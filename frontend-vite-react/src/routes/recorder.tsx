import { createFileRoute } from '@tanstack/react-router';
import { Recorder } from '../pages/recorder';

export const Route = createFileRoute('/recorder')({
  component: Recorder,
});

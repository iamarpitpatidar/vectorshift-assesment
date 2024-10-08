import { PipelineToolbar } from './toolbar';
import { PipelineUI } from '@layout/PipelineUI';
import { SubmitButton } from '@components/submit';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;

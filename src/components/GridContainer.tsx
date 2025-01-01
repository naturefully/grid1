import { ErrorBoundary } from './ErrorBoundary';
import GridFlow from './GridFlow';

export default function GridContainer() {
  return (
    <div className="relative w-full h-screen">
      <ErrorBoundary>
        <GridFlow />
      </ErrorBoundary>
    </div>
  );
}
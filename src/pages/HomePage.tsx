import { useCallback } from "react";
import Button from "../components/button";
import axios from "axios";

export default function HomePage() {
  const handleTestWorkflow = useCallback(async () => {
    const workflowUrl: string = process.env.REACT_APP_WORKFLOW_URL || "";
    if (workflowUrl && workflowUrl !== "") {
      await axios.get(workflowUrl);
    }
  }, []);

  return (
    <>
      <div className="flex sticky py-6 px-8 top-0 bg-white transition-all duration-500">
        <div className="flex flex-col w-full">
          <div className="text-slate-800 text-xl font-medium">Welcome</div>
          <div className="flex w-full justify-end">
            <div className="min-w-[300px] min-h-[300px] rounded-lg bg-sky-50 flex justify-center items-center">
              <Button onClick={handleTestWorkflow} withLoading>
                Test Workflow
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

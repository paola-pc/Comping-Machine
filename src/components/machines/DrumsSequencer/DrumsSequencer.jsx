import LoadingModal from "bring/components/UI/layout/LoadingOverlay";
import PadsGrid from "./PadsGrid";

// Constants · Mapped sampler key for every sample (drums)
const containerStyle = "flex h-[600px] w-full p-2 rounded-b-lg justify-center mx-auto "

const DrumsSequencer = ({isLoading, ...props }) => {
 
  return (
    <div className={`${containerStyle} bg-zinc-900 py-3 px-3 rounded-lg border border-1 border-emerald-200/50`}>
      <LoadingModal isOpen={isLoading}/>
      <PadsGrid {...props} />
    </div>
  );
}

export default DrumsSequencer;
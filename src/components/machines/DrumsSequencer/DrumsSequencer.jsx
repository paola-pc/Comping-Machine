import { useState } from "react";
import PadsGrid from "./PadsGrid";

// Constants · Mapped sampler key for every sample (drums)
const KEY = "C4";
const containerStyle = "flex h-[600px] w-full p-2 rounded-b-lg justify-center mx-auto gap-1 "

const DrumsSequencer = ({...props }) => {
 
  return (
    <div className={`${containerStyle} bg-zinc-900 py-3 px-3 rounded-lg border border-1 border-emerald-200/50`}>
      <PadsGrid {...props} />
    </div>
  );
}

export default DrumsSequencer;
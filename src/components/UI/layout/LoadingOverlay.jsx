const LoadingModal = ({ isOpen }) => {
  if (!isOpen) return null; 
  return (
    <>
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', left: '0', top: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        className="overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div
          className="text-fuchsia-400 inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">

        </div>
      </div>
    </>
  )
}

export default LoadingModal;
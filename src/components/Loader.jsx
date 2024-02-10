const Loader = () => {
  if (false) {
    return (
      <div className="absolute inset-0 flex cursor-wait items-center justify-center bg-black/25">
        <div
          className="inline-block h-16 w-16 animate-spin rounded-full border-8 border-solid  border-current border-r-transparent align-[-0.125em] text-customPurple motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    )
  }
}
export default Loader

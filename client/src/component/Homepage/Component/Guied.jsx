import React from 'react'

function Guied() {
  return (
    <div className='flex items-center flex-col'>
        <div className=" mt-24 w-full bg-black border border-black border-solid min-h-[1px] max-md:mt-10 max-md:max-w-[80%]" />
    <div className="flex gap-5 justify-center items-center px-2 py-9 mt-32 text-2xl text-center text-neutral-700 max-md:flex-wrap max-md:px-5 max-md:mt-10">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd8f3926715c2661ad8a2cf8111f3fb2a903bf202f3df0ebc92f2f24622e9926?"
        className="shrink-0 self-stretch my-auto aspect-[1.19] fill-black w-[25px]"
      />
      <div className="self-stretch max-md:max-w-full">
        Check out some examples
        <br />
        Dashboard, cards, authentication. Some examples built using the
        components. Use this as a guide to build your own.
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/11cf4ab1e1ec54c1aee280e40162155c4bf7ccbcce1fe500d42ff6a2afea7a88?"
        className="shrink-0 self-stretch my-auto w-6 aspect-[1.14] fill-black"
      />
    </div>
    </div>
  )
}

export default Guied
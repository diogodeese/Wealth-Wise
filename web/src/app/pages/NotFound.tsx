export default function NotFound() {
  return (
    <div className='bg-zinc-100 dark:bg-zinc-950 h-screen w-full flex items-center justify-center flex-col gap-8 '>
      <h1 className='text-9xl p-12 after:border after:border-white after:animate-blink after:ml-4'>
        404
      </h1>
      <h3 className='text-5xl'>PAGE NOT FOUND</h3>
    </div>
  )
}

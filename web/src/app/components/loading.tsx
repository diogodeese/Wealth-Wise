import ReactLoading from 'react-loading'

export function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ReactLoading type="spin" color={'white'} height={50} width={50} />
    </div>
  )
}

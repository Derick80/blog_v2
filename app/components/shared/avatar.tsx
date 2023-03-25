import { UserPlaceHolder } from './icons'

export default function Avatar({
  imageUrl,
  w,
  h
}: {
  imageUrl: string
  w?: number
  h?: number
}) {
  // use h-10 w-10 for small avatar and h-20 w-20 for large avatar
  return (
    <div className='flex flex-col items-center'>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt='avatar'
          className={`w-${w} w-${h} rounded-full`}
        />
      ) : (
        <div className={`w-${w} w-${h} rounded-full`}>
          <UserPlaceHolder />
        </div>
      )}
    </div>
  )
}

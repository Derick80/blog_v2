import { UserPlaceHolder } from './icons'

export default function Avatar({
  imageUrl,
  w,
  h,
  className
}: {
  imageUrl: string | null
  w?: number
  h?: number
  className?: string
}) {
  // use h-10 w-10 for small avatar and h-20 w-20 for large avatar
  return (
    <div className={`${className + ''}`}>
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

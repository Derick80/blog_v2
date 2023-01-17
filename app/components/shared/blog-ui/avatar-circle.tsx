import { format } from 'date-fns'

export type PostUserInfoPropsProps = {
  avatarUrl: string
  userName: string
  createdAt?: string
  updatedAt?: string
  createdBy?: string
}

export default function PostUserInfo({
  avatarUrl,
  userName,
  createdAt,
  updatedAt,
  createdBy
}: PostUserInfoPropsProps) {
  return (
    <div className='flex flex-row items-center justify-end'>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={userName}
          className='h-6 w-6 rounded-full'
          style={{ width: '1.5rem', height: '1.5rem' }}
        />
      ) : null}
      <div className='text-right text-xs'>
        {createdBy && (
          <>
            <p className='italic'>Written by: {createdBy}</p>
          </>
        )}
        {createdAt && (
          <span className='inline-flex space-x-1'>
            {' '}
            <p className='italic'>Posted:</p>{' '}
            <p>{format(new Date(createdAt), 'MMM dd yy')}</p>
          </span>
        )}
        {updatedAt && (
          <p className='italic'>
            Updated: {format(new Date(updatedAt), 'MMM dd yy')}
          </p>
        )}
      </div>
    </div>
  )
}

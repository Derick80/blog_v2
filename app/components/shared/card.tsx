
export type Props = {
data:{
    id: string | number
    description: string

    [key: string]: number | string | boolean | undefined
}
}


export const Card = ({ data }: Props) => {

    return(
        <>
        <div
        key={data.id}
        className='border-2'
        >


        </div>
        </>
    )
}
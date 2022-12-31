import { CitiesAndAlbums } from '~/models/travel.server'

export async function reduceTextArray(array: CitiesAndAlbums, key: string) {
  return await array.reduce((acc: any, item: any) => {
    if (!acc.includes(item[key])) {
      acc.push(item[key])
    }
    return acc
  }, [])
}

import api from '@/lib/axios'
import Country from '@/types/country'
import { useQuery } from '@tanstack/react-query'

export async function getCountries(): Promise<Country[]> {
  return await api.get('/countries')
}

export const useCountries = () =>
  useQuery({
    queryKey: ['countries'],
    queryFn: getCountries
  })

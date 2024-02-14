import api from '@/lib/axios'
import Currency from '@/types/currency'
import { useQuery } from '@tanstack/react-query'

export async function getCurrencies(): Promise<Currency[]> {
  return await api.get('/currencies')
}

export const useCurrencies = () =>
  useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies
  })

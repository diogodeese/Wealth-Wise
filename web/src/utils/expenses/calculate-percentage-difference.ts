export const calculatePercentageDifference = (
  currentAmount: number,
  previousAmount: number
) => {
  if (previousAmount === 0) {
    if (currentAmount === 0) {
      return 0 // Handle the case where both amounts are zero
    } else {
      return Infinity // Handle the case where the previous amount is zero
    }
  }

  return ((currentAmount - previousAmount) / previousAmount) * 100
}

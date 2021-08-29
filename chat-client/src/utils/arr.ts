export const selectPickAndFirstInsert = (arr: any[], idx: number) => ([
  arr[idx],
  ...arr.slice(0, idx),
  ...arr.slice(idx + 1, arr.length)
])
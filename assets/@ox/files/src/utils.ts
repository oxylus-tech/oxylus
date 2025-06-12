
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0)
      return '0'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))
  return `${value} ${sizes[i]}`
}

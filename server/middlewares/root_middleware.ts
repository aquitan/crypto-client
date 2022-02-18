
export default function (rootAccess: boolean): boolean {
  const user: boolean = rootAccess
  if (!user) return false
  return true
} 
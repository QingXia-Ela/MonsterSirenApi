const addZero = (n: number) => n > 9 ? n : `0${n}`

export default function () {
  const t = new Date()
  return `${t.getFullYear()}-${addZero(t.getMonth())}-${addZero(t.getDate())} ${addZero(t.getHours())}:${addZero(t.getMinutes())}:${addZero(t.getSeconds())}`
}
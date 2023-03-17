function subQuery(s: string) {
  const i = s.indexOf("?"); let res = s
  if (i !== -1) res = res.substring(0, i)
  return res
}

export default function (s1: string, s2: string) {

  s1 = subQuery(s1), s2 = subQuery(s2)
  const ns1 = s1.split("/"), ns2 = s2.split("/")

  if (ns1.length !== ns2.length) return false
  for (let i = 0; i < ns1.length; i++) {
    const l1 = ns1[i], l2 = ns2[i]

    if (l1[0] === ":" || l2[0] === ":") continue
    if (l1 !== l2) return false
  }

  return true
}

const $input = document.getElementById('input')
const $output = document.getElementById('output')
const $reverse = document.getElementById('reverse')
const $obfuscateEmails = document.getElementById('obfuscateEmails')
const $indentBodies = document.getElementById('indentBodies')

$input.oninput = () => {
  const input = $input.value

  const emailRegEx = /<(\w+)@(\w+)\.(\w+)> wrote:/g

  let cleaned = input

  if ($obfuscateEmails.checked) {
    cleaned = input.replace(emailRegEx, (...args) => {
      const [, name, domain, tld] = args.map((x) =>
        typeof x !== 'string' ? x : x.slice(0, 1) + '...'
      )
      return `<${name}@${domain}.${tld}> wrote:`
    })
  }

  $output.innerHTML = cleaned
}

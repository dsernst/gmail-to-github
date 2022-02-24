const $input = document.getElementById('input')
const $output = document.getElementById('output')
const $reverse = document.getElementById('reverse')
const $obfuscateEmails = document.getElementById('obfuscateEmails')
const $indentBodies = document.getElementById('indentBodies')

const run = () => {
  let cleaned = $input.value

  // Obfuscate emails
  if ($obfuscateEmails.checked) {
    const emailRegEx = /<(\w+)@(\w+)\.(\w+)> wrote:/g
    cleaned = cleaned.replace(emailRegEx, (...args) => {
      const [, name, domain, tld] = args.map((x) =>
        typeof x !== 'string' ? x : x.slice(0, 1) + '...'
      )
      return `<${name}@${domain}.${tld}> wrote:`
    })
  }

  // Output the results
  $output.innerHTML = cleaned
}

// Run on all the triggers
$input.oninput = run
$obfuscateEmails.onchange = run

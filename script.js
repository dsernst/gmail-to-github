const $input = document.getElementById('input')
const $output = document.getElementById('output')
const $reverse = document.getElementById('reverse')
const $obfuscateEmails = document.getElementById('obfuscateEmails')
const $indentBodies = document.getElementById('indentBodies')

const run = () => {
  let cleaned = $input.value

  // Strip out initial lines breaks
  cleaned = cleaned.trim()

  // Modify the messages
  if ($reverse.checked || $indentBodies.checked) {
    // Split the messages by the standard header line
    const headerRegEx =
      /(On \w{3}, \w{3} \d{1,2}, \d{4} at \d{2}:\d{2} [AP]M [\w ]+ <\w+@\w+\.\w+> wrote:)/g
    let split = cleaned.split(headerRegEx).filter(Boolean) // (Remove empties)

    // Indent non-header lines
    if ($indentBodies.checked) {
      split = split.map((section) => {
        if (section.match(headerRegEx)) {
          return section
        } else {
          return section
            .trim()
            .split('\n')
            .map((line) => '> ' + line)
            .join('\n')
        }
      })
    }

    // Now we'll rejoin them
    const joined = []
    split.forEach((section, index) => {
      if (section.match(headerRegEx)) {
        joined.push(section + '\n' + split[index + 1])
      }
    })

    // Reverse the order
    if ($reverse.checked) {
      joined.reverse()
    }

    cleaned = joined.join('\n\n')
  }

  // Obfuscate emails
  if ($obfuscateEmails.checked) {
    const emailRegEx = /<(\w+)@(\w+)\.(\w+)> wrote:/g
    cleaned = cleaned.replace(emailRegEx, (...args) => {
      const [, name, domain, tld] = args.map((x) =>
        typeof x !== 'string' ? x : x.slice(0, 1) + '...'
      )
      return `<${name}@ ${domain} .${tld}> wrote:`
    })
  }

  // Output the results
  $output.innerHTML = cleaned
}

// Run on all the triggers
$input.oninput = run
$reverse.onchange = run
$obfuscateEmails.onchange = run
$indentBodies.onchange = run

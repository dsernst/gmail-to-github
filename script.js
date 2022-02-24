const $input = document.getElementById('input')
const $output = document.getElementById('output')

$input.oninput = () => {
  const input = $input.value

  $output.innerHTML = input
}

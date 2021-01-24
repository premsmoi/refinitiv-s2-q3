const fetch = require('node-fetch')
const HtmlTableToJson = require('html-table-to-json')

const fundName = process.argv[2]

fetch('https://codequiz.azurewebsites.net/', {
  headers: { cookie: 'hasCookie=true' },
})
  .then((res) => res.text())
  .then((body) => {
    const tableStartIndex = body.indexOf('<table>')
    const tableEndIndex = body.indexOf('</table>')
    const tableString = body.substring(tableStartIndex, tableEndIndex + 8)
    const dataList = HtmlTableToJson.parse(tableString)._results[0]
    dataList.forEach((data) => {
      if (data['Fund Name'] === fundName) {
        console.log(data.Nav)
      }
    })
  })

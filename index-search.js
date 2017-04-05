'use strict'

const program = require('commander')
const restClient = require('restler')
const writeJson = require('write-json-file')
const apiKey = require('./config.json').apiKey

program
    .parse(process.argv)

let domain,
    client,
    nextPageUrl,
    emailItems

domain = program.args[0]
nextPageUrl = `https://api.mailgun.net/v3/${domain}/events?event=rejected+OR+failed`
emailItems = []

function getEmailPage(url) {
    restClient
        .get(url, { username: 'api', password: `key-${apiKey}` })
        .on('success', (response) => {
            emailItems = emailItems.concat(response.items)
            console.log(response.paging.next, response.items.length)

            if (response.items.length > 0) {
                getEmailPage(response.paging.next)
            }
            else {
                writeEmailItemsToFile()
            }
        })
}

function writeEmailItemsToFile() {
    writeJson('emails.json', emailItems)
        .then(() => {
            console.log(`Wrote ${emailItems.length} email search results to emails.json`)
        })
}

getEmailPage(nextPageUrl)

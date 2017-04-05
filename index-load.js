'use strict';

const program = require('commander')
const restClient = require('restler')
const loadJson = require('load-json-file')
const config = require('./config.js')

program
parse(process.argv)

let emailItems,
    emailContentItems

emailContentItems = []

loadJson('emails.json')
    .then(obj => {
        emailItems = obj;

        if (!emailItems || !emailItems.length) {
            console.error('No emails found in emails.json')
            process.exit(1)
        }

        getEmailContent(emailItems[0]);
    })

function getEmailContent(emailItem) {
    restClient
        .get(emailItem.url, { username: 'api', password: `key-${config.apiKey}` })
        .on('success', (response) => {
            emailContentItems.push(response)
        })
}

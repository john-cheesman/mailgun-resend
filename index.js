'use strict'

const program = require('commander')

program
    .version('1.0.0')
    .command('search [domain]', 'Search for failed emails on the specified domain')
    .alias('s')
    .command('load', 'Retrieve the stored email content from the search results')
    .alias('l')
    .parse(process.argv)

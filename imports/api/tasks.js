import { Meteor } from 'meteor/meteor';

Meteor.methods({
    'code.check'() {
        ScrapeParser.registerHelper('toInt', function(str, url) {
            return parseInt('0'+str.replace(',', ''));
        });

        ScrapeParser.registerHelper('titleLinks', function(arr, url) {
            return arr && arr.map(function(str) {
                var $ = cheerio.load(str);
                var link = $('a.title');
                return { link: link.attr('href'), title: link.text() };
            });
        });

        ScrapeParser.reset(); // Remove any/all stored parsers

        ScrapeParser.parser('http://www.codecheck.info/essen/knabbergebaeck/weiteres_knabbergebaeck/ean_8710398603319/id_1343951927/Doritos.pro', {
            topic: { path: 'meta[property="og:title"]', attribute: 'content' },
            subscribers: { path: '.subscribers .number', content: true, helper: 'toInt' },
            links: { path: 'a.title', attribute: 'href', multi: true },
            titles: { path: 'td.c3', content: true, multi: true },
            titleLinks: { path: 'p.title', content: true, helper: 'titleLinks', multi: true },
        });

        ScrapeParser.resetExcept(['http://www.codecheck.info/essen/knabbergebaeck/weiteres_knabbergebaeck/ean_8710398603319/id_1343951927/Doritos.pro']); // Remove stored parsers except those in array

        return ScrapeParser.get('http://www.codecheck.info/essen/knabbergebaeck/weiteres_knabbergebaeck/ean_8710398603319/id_1343951927/Doritos.pro');

    }
});
import type { CookieConsentConfig } from 'vanilla-cookieconsent';

export const config: CookieConsentConfig = {

root: '#cc-container',
  
guiOptions: {
consentModal: {
layout: 'bar',
position:  'bottom',
},
preferencesModal: {
layout: 'box',
position: 'right',
equalWeightButtons: true,
flipButtons: false,
},
},
categories: {
necessary: {
readOnly: true,
},
functionality: {},
},
language: {
default: 'en',
autoDetect: 'browser',
translations: {
en: {
consentModal: {
title: "We value your privacy",
description:
'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
acceptAllBtn: 'Accept all',
acceptNecessaryBtn: 'Reject all',
showPreferencesBtn: 'Manage preferences',
footer:
'<a href="/privacy">Privacy Policy</a>\n<a href="/terms">Terms and conditions</a>',
},
preferencesModal: {
title: 'Customise Consent Preferences',
acceptAllBtn: 'Accept all',
acceptNecessaryBtn: 'Reject all',
savePreferencesBtn: 'Save preferences',
closeIconLabel: 'Close modal',
serviceCounterLabel: 'Service|Services',
sections: [
{
title: 'Cookie Usage',
description:
'We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about all cookies under each consent category below. The cookies that are categorized as "Necessary" are stored on your browser as they are essential for enabling the basic functionalities of the site.',
},
{
title:
'Necessary <span class="pm__badge">Always Enabled</span>',
description:
'Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.',
linkedCategory: 'necessary',
},
{
title: 'Functional',
description:
'Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.',
linkedCategory: 'functionality',
},
],
},
},
},
},
};
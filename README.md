# Test Firefox Extentions

example / notes taken while going through https://hacks.mozilla.org/2015/09/lets_write_a_webextension/

create `manifest.json` file

build `.xpi` file (extention files are plain zip files, with `xpi` extention)

to install, enable unsigned in [firefox settings](about:config) by setting `xpinstall.signatures.required` to false ([reference](https://support.mozilla.org/en-US/kb/add-on-signing-in-firefox?as=u&utm_source=inproduct#w_what-are-my-options-if-i-want-to-use-an-unsigned-add-on-advanced-users))

need `tabs` permission to read tabs

can set icons using:

```
"icons": { "48": "icon.png", "128": "icon128.png" }
"default_icon": { "19": "button.png", "38": "button38.png" }
```

## mozilla notes

from https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension

`content_scripts` can be loaded into urls that match a pattern. simple js file that is added into the page

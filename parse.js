function parseHtml() {
    function exportAsHTML() {
        var docID = DocumentApp.getActiveDocument().getId();
        var url =
            "https://docs.google.com/feeds/download/documents/export/Export?id=" +
            docID +
            "&exportFormat=html";
        var param = {
            method: "get",
            headers: {
                Authorization: "Bearer " + ScriptApp.getOAuthToken()
            },
            muteHttpExceptions: true,
        };
        var html = UrlFetchApp.fetch(url, param).getContentText();
        return html;
    }

    function convertClassesToInlineStyles(html) {
        var cssRegex = /<style[^>]*>([\s\S]*?)<\/style>/i;
        var css = (html.match(cssRegex) || ["", ""])[1];
        var classes = {};

        css.split("}").forEach(function (rule) {
            var [selectors, styles] = rule.split("{");
            if (styles) {
                selectors.split(",").forEach(function (selector) {
                    var className = selector.trim().replace(/^\./, "");
                    if (className) {
                        classes[className] = styles.trim();
                    }
                });
            }
        });

        var inlineStyledHtml = html.replace(/<([\w-]+)((?:\s+[\w-]+="[^"]*")*)\s+class="([^"]*)"[^>]*>/gi, function (match, tag, preAttrs, classNames) {
            if (tag === 'a') {
                return match;
            }

            var inlineStyles = classNames
                .split(" ")
                .map(function (className) {
                    return classes[className] || "";
                })
                .join(" ");

            return `<${tag}${preAttrs} style="${inlineStyles}">`;
        });

        return inlineStyledHtml;
    }

    function preserveAHrefTags(html) {
        return html.replace(/<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, function (match, href, text) {
            return `<a href="${href}">${text}</a>`;
        });
    }

    function replaceInHTML(html) {
        var newHtml = html.replace(/(font-weight:700.*?>)(.*?)(<\/span>)/g, '$1<b>$2</b>$3')
            .replace(/(font-style:italic.*?>)(.*?)(<\/span>)/g, '$1<i>$2</i>$3');
        return newHtml;
    }

    var parsed;
    var html = exportAsHTML();
    html = convertClassesToInlineStyles(html);
    html = preserveAHrefTags(html); // Adicione esta linha
    var newHtml = replaceInHTML(html);

    var htmlparser = htmlparser2.init();
    var handler = new htmlparser.DomHandler(function (error, dom) {
        var tagHandlers = {
            _base: function (tag) {
                var str = '';
                tag.children.forEach(function (child) {
                    if (func = tagHandlers[child.name || child.type]) str += func(child);
                });
                return str;
            },
            text: function (textTag) {
                return textTag.data;
            },
            span: function (spanTag) {
                return tagHandlers._base(spanTag);
            },
            b: function (bTag) {
                return `<b>${tagHandlers._base(bTag)}</b>`;
            },
            i: function (iTag) {
                return `<i>${tagHandlers._base(iTag)}</i>`;
            },
            p: function (pTag) {
                return `${tagHandlers._base(pTag)}\n`;
            },
            h1: function (h1Tag) {
                return `título_principal: ${tagHandlers._base(h1Tag)}\n`;
            },
            h2: function (h2Tag) {
                return `título: ${tagHandlers._base(h2Tag)}\n`;
            },
            a: function (aTag) {
                var href = aTag.attribs.href;
                if (href === undefined) return '';

                // extract real URLs from Google's tracking
                var re = /(?:\?|&)q=([^&]+)/;
                var match = re.exec(href);
                if (match) {
                    href = decodeURIComponent(match[1]);
                }

                var str = '<a href="' + href + '">';
                str += tagHandlers._base(aTag);
                str += '</a>';
                return str;
            },
            li: function (tag) {
                return '* ' + tagHandlers._base(tag) + '\n';
            },
            hr(hrTag) {
                // return tagHandlers._base(hrTag);
                return 'separador:';
            }
        };
        // ['i', 'u', 'em', 'strong'].forEach(function(tag) {
        //   tagHandlers[tag] = tagHandlers.b;
        // });

        ['ul', 'ol'].forEach(function (tag) {
            tagHandlers[tag] = tagHandlers.span;
        });
        // ['h1', 'h3', 'h4', 'h5', 'h6'].forEach(function(tag) {
        //   tagHandlers[tag] = tagHandlers.p;
        // });

        var body = dom[0].children[1];
        var parsedText = tagHandlers._base(body);

        // Convert html entities into the characters as they exist in the google doc
        // var entities = new Entities();
        // parsedText = entities.decode(parsedText);

        // Remove smart quotes from inside tags
        parsedText = parsedText.replace(/<[^<>]*>/g, function (match) {
            return match.replace(/”|“/g, '"').replace(/‘|’/g, "'");
        });

        parsed = archieml.load(parsedText);
        console.log(parsed)
    });

    var parser = new htmlparser.Parser(handler, {
        decodeEntities: true
    });

    parser.write(newHtml);
    parser.end();

    return parsed;

}
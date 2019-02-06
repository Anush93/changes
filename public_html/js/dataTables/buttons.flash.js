(function (g) {
    "function" === typeof define && define.amd ? define(["jquery", "datatables.net", "datatables.net-buttons"], function (i) {
        return g(i, window, document)
    }) : "object" === typeof exports ? module.exports = function (i, k) {
        i || (i = window);
        if (!k || !k.fn.dataTable)
            k = require("datatables.net")(i, k).$;
        k.fn.dataTable.Buttons || require("datatables.net-buttons")(i, k);
        return g(k, i, i.document)
    } : g(jQuery, window, document)
})(function (g, i, k, o) {
    function l(a, b, d) {
        var c = a.createElement(b);
        d && (d.attr && g(c).attr(d.attr), d.children &&
                g.each(d.children, function (a, b) {
                    c.appendChild(b)
                }), d.text && c.appendChild(a.createTextNode(d.text)));
        return c
    }

    function y(a, b) {
        var d = a.header[b].length,
                c;
        a.footer && a.footer[b].length > d && (d = a.footer[b].length);
        for (var e = 0, f = a.body.length; e < f && !(c = a.body[e][b].toString().length, c > d && (d = c), 40 < d); e++)
            ;
        return 5 < d ? d : 5
    }

    function u(a) {
        n === o && (n = -1 === v.serializeToString(g.parseXML(p["xl/worksheets/sheet1.xml"])).indexOf("xmlns:r"));
        g.each(a, function (b, d) {
            if (g.isPlainObject(d))
                u(d);
            else {
                if (n) {
                    var c = d.childNodes[0],
                            e, f, h = [];
                    for (e = c.attributes.length - 1; 0 <= e; e--) {
                        f = c.attributes[e].nodeName;
                        var i = c.attributes[e].nodeValue;
                        -1 !== f.indexOf(":") && (h.push({
                            name: f,
                            value: i
                        }), c.removeAttribute(f))
                    }
                    e = 0;
                    for (f = h.length; e < f; e++)
                        i = d.createAttribute(h[e].name.replace(":", "_dt_b_namespace_token_")), i.value = h[e].value, c.setAttributeNode(i)
                }
                c = v.serializeToString(d);
                n && (-1 === c.indexOf("<?xml") && (c = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + c), c = c.replace(/_dt_b_namespace_token_/g, ":"));
                c = c.replace(/<row xmlns="" /g,
                        "<row ").replace(/<cols xmlns="">/g, "<cols>");
                a[b] = c
            }
        })
    }
    var j = g.fn.dataTable,
            h = {
                version: "1.0.4-TableTools2",
                clients: {},
                moviePath: "",
                nextId: 1,
                $: function (a) {
                    "string" == typeof a && (a = k.getElementById(a));
                    a.addClass || (a.hide = function () {
                        this.style.display = "none"
                    }, a.show = function () {
                        this.style.display = ""
                    }, a.addClass = function (a) {
                        this.removeClass(a);
                        this.className += " " + a
                    }, a.removeClass = function (a) {
                        this.className = this.className.replace(RegExp("\\s*" + a + "\\s*"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
                    }, a.hasClass =
                            function (a) {
                                return !!this.className.match(RegExp("\\s*" + a + "\\s*"))
                            });
                    return a
                },
                setMoviePath: function (a) {
                    this.moviePath = a
                },
                dispatch: function (a, b, d) {
                    (a = this.clients[a]) && a.receiveEvent(b, d)
                },
                log: function (a) {
                    console.log("Flash: " + a)
                },
                register: function (a, b) {
                    this.clients[a] = b
                },
                getDOMObjectPosition: function (a) {
                    var b = {
                        left: 0,
                        top: 0,
                        width: a.width ? a.width : a.offsetWidth,
                        height: a.height ? a.height : a.offsetHeight
                    };
                    "" !== a.style.width && (b.width = a.style.width.replace("px", ""));
                    "" !== a.style.height && (b.height = a.style.height.replace("px",
                            ""));
                    for (; a; )
                        b.left += a.offsetLeft, b.top += a.offsetTop, a = a.offsetParent;
                    return b
                },
                Client: function (a) {
                    this.handlers = {};
                    this.id = h.nextId++;
                    this.movieId = "ZeroClipboard_TableToolsMovie_" + this.id;
                    h.register(this.id, this);
                    a && this.glue(a)
                }
            };
    h.Client.prototype = {
        id: 0,
        ready: !1,
        movie: null,
        clipText: "",
        fileName: "",
        action: "copy",
        handCursorEnabled: !0,
        cssEffects: !0,
        handlers: null,
        sized: !1,
        sheetName: "",
        glue: function (a, b) {
            this.domElement = h.$(a);
            var d = 99;
            this.domElement.style.zIndex && (d = parseInt(this.domElement.style.zIndex,
                    10) + 1);
            var c = h.getDOMObjectPosition(this.domElement);
            this.div = k.createElement("div");
            var e = this.div.style;
            e.position = "absolute";
            e.left = "0px";
            e.top = "0px";
            e.width = c.width + "px";
            e.height = c.height + "px";
            e.zIndex = d;
            "undefined" != typeof b && "" !== b && (this.div.title = b);
            0 !== c.width && 0 !== c.height && (this.sized = !0);
            this.domElement && (this.domElement.appendChild(this.div), this.div.innerHTML = this.getHTML(c.width, c.height).replace(/&/g, "&amp;"))
        },
        positionElement: function () {
            var a = h.getDOMObjectPosition(this.domElement),
                    b = this.div.style;
            b.position = "absolute";
            b.width = a.width + "px";
            b.height = a.height + "px";
            0 !== a.width && 0 !== a.height && (this.sized = !0, b = this.div.childNodes[0], b.width = a.width, b.height = a.height)
        },
        getHTML: function (a, b) {
            var d = "",
                    c = "id=" + this.id + "&width=" + a + "&height=" + b;
            if (navigator.userAgent.match(/MSIE/))
                var e = location.href.match(/^https/i) ? "https://" : "http://",
                    d = d + ('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + e + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="' +
                            a + '" height="' + b + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + h.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + c + '"/><param name="wmode" value="transparent"/></object>');
            else
                d += '<embed id="' + this.movieId + '" src="' + h.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' +
                        a + '" height="' + b + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + c + '" wmode="transparent" />';
            return d
        },
        hide: function () {
            this.div && (this.div.style.left = "-2000px")
        },
        show: function () {
            this.reposition()
        },
        destroy: function () {
            var a = this;
            this.domElement && this.div && (g(this.div).remove(), this.div = this.domElement = null, g.each(h.clients, function (b, d) {
                d === a && delete h.clients[b]
            }))
        },
        reposition: function (a) {
            a && ((this.domElement = h.$(a)) || this.hide());
            if (this.domElement && this.div) {
                var a = h.getDOMObjectPosition(this.domElement),
                        b = this.div.style;
                b.left = "" + a.left + "px";
                b.top = "" + a.top + "px"
            }
        },
        clearText: function () {
            this.clipText = "";
            this.ready && this.movie.clearText()
        },
        appendText: function (a) {
            this.clipText += a;
            this.ready && this.movie.appendText(a)
        },
        setText: function (a) {
            this.clipText = a;
            this.ready && this.movie.setText(a)
        },
        setFileName: function (a) {
            this.fileName = a;
            this.ready && this.movie.setFileName(a)
        },
        setSheetData: function (a) {
            this.ready && this.movie.setSheetData(JSON.stringify(a))
        },
        setAction: function (a) {
            this.action = a;
            this.ready && this.movie.setAction(a)
        },
        addEventListener: function (a, b) {
            a = a.toString().toLowerCase().replace(/^on/, "");
            this.handlers[a] || (this.handlers[a] = []);
            this.handlers[a].push(b)
        },
        setHandCursor: function (a) {
            this.handCursorEnabled = a;
            this.ready && this.movie.setHandCursor(a)
        },
        setCSSEffects: function (a) {
            this.cssEffects = !!a
        },
        receiveEvent: function (a, b) {
            var d, a = a.toString().toLowerCase().replace(/^on/,
                    "");
            switch (a) {
                case "load":
                    this.movie = k.getElementById(this.movieId);
                    if (!this.movie) {
                        d = this;
                        setTimeout(function () {
                            d.receiveEvent("load", null)
                        }, 1);
                        return
                    }
                    if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                        d = this;
                        setTimeout(function () {
                            d.receiveEvent("load", null)
                        }, 100);
                        this.ready = !0;
                        return
                    }
                    this.ready = !0;
                    this.movie.clearText();
                    this.movie.appendText(this.clipText);
                    this.movie.setFileName(this.fileName);
                    this.movie.setAction(this.action);
                    this.movie.setHandCursor(this.handCursorEnabled);
                    break;
                case "mouseover":
                    this.domElement && this.cssEffects && this.recoverActive && this.domElement.addClass("active");
                    break;
                case "mouseout":
                    this.domElement && this.cssEffects && (this.recoverActive = !1, this.domElement.hasClass("active") && (this.domElement.removeClass("active"), this.recoverActive = !0));
                    break;
                case "mousedown":
                    this.domElement && this.cssEffects && this.domElement.addClass("active");
                    break;
                case "mouseup":
                    this.domElement && this.cssEffects && (this.domElement.removeClass("active"), this.recoverActive = !1)
            }
            if (this.handlers[a])
                for (var c =
                        0, e = this.handlers[a].length; c < e; c++) {
                    var f = this.handlers[a][c];
                    if ("function" == typeof f)
                        f(this, b);
                    else if ("object" == typeof f && 2 == f.length)
                        f[0][f[1]](this, b);
                    else if ("string" == typeof f)
                        i[f](this, b)
                }
        }
    };
    h.hasFlash = function () {
        try {
            if (new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))
                return !0
        } catch (a) {
            if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] !== o && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)
                return !0
        }
        return !1
    };
    i.ZeroClipboard_TableTools = h;
    var w = function (a,
            b) {
        b.attr("id");
        b.parents("html").length ? a.glue(b[0], "") : setTimeout(function () {
            w(a, b)
        }, 500)
    },
            q = function (a, b) {
                var d = "*" === a.filename && "*" !== a.title && a.title !== o ? a.title : a.filename;
                "function" === typeof d && (d = d());
                -1 !== d.indexOf("*") && (d = g.trim(d.replace("*", g("title").text())));
                d = d.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "");
                return b === o || !0 === b ? d + a.extension : d
            },
            z = function (a) {
                var b = "Sheet1";
                a.sheetName && (b = a.sheetName.replace(/[\[\]\*\/\\\?\:]/g, ""));
                return b
            },
            r = function (a, b) {
                var d = b.match(/[\s\S]{1,8192}/g) || [];
                a.clearText();
                for (var c = 0, e = d.length; c < e; c++)
                    a.appendText(d[c])
            },
            x = function (a, b) {
                for (var d = b.newline ? b.newline : navigator.userAgent.match(/Windows/) ? "\r\n" : "\n", c = a.buttons.exportData(b.exportOptions), e = b.fieldBoundary, f = b.fieldSeparator, g = RegExp(e, "g"), h = b.escapeChar !== o ? b.escapeChar : "\\", i = function (a) {
                    for (var b = "", c = 0, d = a.length; c < d; c++)
                        0 < c && (b += f), b += e ? e + ("" + a[c]).replace(g, h + e) + e : a[c];
                    return b
                }, k = b.header ? i(c.header) + d : "", m = b.footer && c.footer ? d + i(c.footer) : "", l = [], t = 0, A = c.body.length; t < A; t++)
                    l.push(i(c.body[t]));
                return {
                    str: k + l.join(d) + m,
                    rows: l.length
                }
            },
            s = {
                available: function () {
                    return h.hasFlash()
                },
                init: function (a, b, d) {
                    h.moviePath = j.Buttons.swfPath;
                    var c = new h.Client;
                    c.setHandCursor(!0);
                    c.addEventListener("mouseDown", function () {
                        d._fromFlash = !0;
                        a.button(b[0]).trigger();
                        d._fromFlash = !1
                    });
                    w(c, b);
                    d._flash = c
                },
                destroy: function (a, b, d) {
                    d._flash.destroy()
                },
                fieldSeparator: ",",
                fieldBoundary: '"',
                exportOptions: {},
                title: "*",
                filename: "*",
                extension: ".csv",
                header: !0,
                footer: !1
            };
    try {
        var v = new XMLSerializer,
                n
    } catch (B) {
    }
    var p = {
        "_rels/.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
        "xl/_rels/workbook.xml.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
        "[Content_Types].xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml" /><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" /><Default Extension="jpeg" ContentType="image/jpeg" /><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" /><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" /><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" /></Types>',
        "xl/workbook.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/><workbookPr showInkAnnotation="0" autoCompressPictures="0"/><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/></bookViews><sheets><sheet name="" sheetId="1" r:id="rId1"/></sheets></workbook>',
        "xl/worksheets/sheet1.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><sheetData/></worksheet>',
        "xl/styles.xml": '<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><fonts count="5" x14ac:knownFonts="1"><font><sz val="11" /><name val="Calibri" /></font><font><sz val="11" /><name val="Calibri" /><color rgb="FFFFFFFF" /></font><font><sz val="11" /><name val="Calibri" /><b /></font><font><sz val="11" /><name val="Calibri" /><i /></font><font><sz val="11" /><name val="Calibri" /><u /></font></fonts><fills count="6"><fill><patternFill patternType="none" /></fill><fill/><fill><patternFill patternType="solid"><fgColor rgb="FFD9D9D9" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD99795" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6efce" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6cfef" /><bgColor indexed="64" /></patternFill></fill></fills><borders count="2"><border><left /><right /><top /><bottom /><diagonal /></border><border diagonalUp="false" diagonalDown="false"><left style="thin"><color auto="1" /></left><right style="thin"><color auto="1" /></right><top style="thin"><color auto="1" /></top><bottom style="thin"><color auto="1" /></bottom><diagonal /></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" /></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0" /></cellStyles><dxfs count="0" /><tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" /></styleSheet>'
    };
    j.Buttons.swfPath = "//cdn.datatables.net/buttons/1.2.0/swf/flashExport.swf";
    j.Api.register("buttons.resize()", function () {
        g.each(h.clients, function (a, b) {
            b.domElement !== o && b.domElement.parentNode && b.positionElement()
        })
    });
    j.ext.buttons.copyFlash = g.extend({}, s, {
        className: "buttons-copy buttons-flash",
        text: function (a) {
            return a.i18n("buttons.copy", "Copy")
        },
        action: function (a, b, d, c) {
            c._fromFlash && (a = c._flash, d = x(b, c), c = c.customize ? c.customize(d.str, c) : d.str, a.setAction("copy"), r(a, c), b.buttons.info(b.i18n("buttons.copyTitle",
                    "Copy to clipboard"), b.i18n("buttons.copySuccess", {
                _: "Copied %d rows to clipboard",
                1: "Copied 1 row to clipboard"
            }, d.rows), 3E3))
        },
        fieldSeparator: "\t",
        fieldBoundary: ""
    });
    j.ext.buttons.csvFlash = g.extend({}, s, {
        className: "buttons-csv buttons-flash",
        text: function (a) {
            return a.i18n("buttons.csv", "CSV")
        },
        action: function (a, b, d, c) {
            a = c._flash;
            b = x(b, c);
            b = c.customize ? c.customize(b.str, c) : b.str;
            a.setAction("csv");
            a.setFileName(q(c));
            r(a, b)
        },
        escapeChar: '"'
    });
    j.ext.buttons.excelFlash = g.extend({}, s, {
        className: "buttons-excel buttons-flash",
        text: function (a) {
            return a.i18n("buttons.excel", "Excel")
        },
        action: function (a, b, d, c) {
            var a = c._flash,
                    e = 0,
                    f = g.parseXML(p["xl/worksheets/sheet1.xml"]),
                    h = f.getElementsByTagName("sheetData")[0],
                    d = {
                        _rels: {
                            ".rels": g.parseXML(p["_rels/.rels"])
                        },
                        xl: {
                            _rels: {
                                "workbook.xml.rels": g.parseXML(p["xl/_rels/workbook.xml.rels"])
                            },
                            "workbook.xml": g.parseXML(p["xl/workbook.xml"]),
                            "styles.xml": g.parseXML(p["xl/styles.xml"]),
                            worksheets: {
                                "sheet1.xml": f
                            }
                        },
                        "[Content_Types].xml": g.parseXML(p["[Content_Types].xml"])
                    },
            b = b.buttons.exportData(c.exportOptions),
                    i, k, j = function (a) {
                        i = e + 1;
                        k = l(f, "row", {
                            attr: {
                                r: i
                            }
                        });
                        for (var b = 0, c = a.length; b < c; b++) {
                            for (var d = b, j = ""; 0 <= d; )
                                j = String.fromCharCode(d % 26 + 65) + j, d = Math.floor(d / 26) - 1;
                            d = j + "" + i;
                            if (null === a[b] || a[b] === o)
                                a[b] = "";
                            "number" === typeof a[b] || a[b].match && g.trim(a[b]).match(/^-?\d+(\.\d+)?$/) && !g.trim(a[b]).match(/^0\d+/) ? d = l(f, "c", {
                                attr: {
                                    t: "n",
                                    r: d
                                },
                                children: [l(f, "v", {
                                        text: a[b]
                                    })]
                            }) : (j = !a[b].replace ? a[b] : a[b].replace(/&(?!amp;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,
                                    ""), d = l(f, "c", {
                                attr: {
                                    t: "inlineStr",
                                    r: d
                                },
                                children: {
                                    row: l(f, "is", {
                                        children: {
                                            row: l(f, "t", {
                                                text: j
                                            })
                                        }
                                    })
                                }
                            }));
                            k.appendChild(d)
                        }
                        h.appendChild(k);
                        e++
                    };
            g("sheets sheet", d.xl["workbook.xml"]).attr("name", z(c));
            c.customizeData && c.customizeData(b);
            c.header && (j(b.header, e), g("row c", f).attr("s", "2"));
            for (var m = 0, n = b.body.length; m < n; m++)
                j(b.body[m], e);
            c.footer && b.footer && (j(b.footer, e), g("row:last c", f).attr("s", "2"));
            j = l(f, "cols");
            g("worksheet", f).prepend(j);
            m = 0;
            for (n = b.header.length; m < n; m++)
                j.appendChild(l(f,
                        "col", {
                            attr: {
                                min: m + 1,
                                max: m + 1,
                                width: y(b, m),
                                customWidth: 1
                            }
                        }));
            c.customize && c.customize(d);
            u(d);
            a.setAction("excel");
            a.setFileName(q(c));
            a.setSheetData(d);
            r(a, "")
        },
        extension: ".xlsx"
    });
    j.ext.buttons.pdfFlash = g.extend({}, s, {
        className: "buttons-pdf buttons-flash",
        text: function (a) {
            return a.i18n("buttons.pdf", "PDF")
        },
        action: function (a, b, d, c) {
            var a = c._flash,
                    d = b.buttons.exportData(c.exportOptions),
                    e = b.table().node().offsetWidth,
                    f = b.columns(c.columns).indexes().map(function (a) {
                return b.column(a).header().offsetWidth /
                        e
            });
            a.setAction("pdf");
            a.setFileName(q(c));
            r(a, JSON.stringify({
                title: q(c, !1),
                message: c.message,
                colWidth: f.toArray(),
                orientation: c.orientation,
                size: c.pageSize,
                header: c.header ? d.header : null,
                footer: c.footer ? d.footer : null,
                body: d.body
            }))
        },
        extension: ".pdf",
        orientation: "portrait",
        pageSize: "A4",
        message: "",
        newline: "\n"
    });
    return j.Buttons
});
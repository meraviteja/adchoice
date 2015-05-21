(function($jq) {
    $jq(document).ready(function() {
        adchoices.init();
    });

    var adchoices = {

        debug: false,

        init: function() {
            if (this.debug) {
                console.log('----------------------------------------AdCoices--------------------------------------------------');
            }
            this.evidonID = $jq("#adchoices");
            this.evidonCode = 'pub1.js';
            this.ocid = 414;
            this.urlParser = this.urlItems();
            //this.getScript = new GetScript();
            this.protocol = window.location.protocol || 'https:';
            this.cdn = (this.protocol == 'https:' ? 'https://info.evidon.com/c/betrad/pub/' : 'http://cdn.betrad.com/pub/');
            //this.dataPageId = this.element.data('adchoices-pageid');
            this.page_id = (typeof this.dataPageId !== 'undefined' && this.dataPageId !== '') ? this.dataPageId : this.parse();
            if (this.debug) {
                console.log('this.page_id: ', this.page_id);
            }
            this.act();
        },

        hostArray: function() {
            var hostList = ['127.0.0.1', 'localhost.adobe.com', 'aceui.corp.adobe.com', 'www.adobe.com', 'adobe.com', 'get.adobe.com', 'get2.adobe.com', 'get3.adobe.com', 'kb2.adobe.com', 'community.adobe.com', 'helpx.adobe.com', 'store1.adobe.com', 'store2.adobe.com', 'store3.adobe.com'],
                host = this.urlParser.host || window.location.hostname || '';

            if (this.debug) {
                console.log('host: ', host);
            }

            return !!(hostList.indexOf(host) != -1);
        },
        parse: function() {
            var page_id,
                host = this.hostArray();
            switch (this.urlParser.locale) {
                case 'de':
                    page_id = (host) ? '322' : '327';
                    break;
                case 'fr':
                    page_id = (host) ? '324' : '326';
                    break;
                case 'uk':
                    page_id = (host) ? '323' : '328';
                    break;
                case 'se':
                    page_id = (host) ? '1013' : '1024';
                    break;
                case 'at':
                    page_id = (host) ? '1012' : '1021';
                    break;
                case 'ch_de':
                    page_id = (host) ? '1010' : '1020';
                    break;
                case 'ch_fr':
                    page_id = (host) ? '1009' : '1022';
                    break;
                case 'ch_it':
                    page_id = (host) ? '1011' : '1023';
                    break;
                default:
                    page_id = (host) ? '86' : '126';
                    break;
            }

            return page_id;
        },
        act: function() {

            if (this.debug) {
                console.log('this.evidonID: ', this.evidonID);
            }
            proxyThis = this;

            if (this.debug) {
                console.log('fullURL: ', fullURL);
            }

            var fullURL = proxyThis.cdn + proxyThis.evidonCode;
            proxyThis.evidonID.bind("click", function(e) {
                console.log('fullURL: ', fullURL);
                e.preventDefault();

                proxyThis.getUrl(fullURL).done(function(status, textStatus) {
                    BAPW.i(proxyThis.evidonID, {
                        pid: proxyThis.page_id,
                        ocid: proxyThis.ocid
                    }, false);
                });
            });

        },
        urlLinks: function() {
            //this.stringUtils = new StringUtils();
            this.pageURL = window.location.toString();
            this.urlArray = [];
            this.pathArray = [];
            this.product = '';

            this.urlArray = this.pageURL.split('//');
            this.pathArray = this.urlArray[1].split('/');

            /*--- SUBDOMAIN ---*/
            this.subDomain = this.pathArray[0].split('.')[0];

            /*--- LOCALE ---*/
            this.locale = (this.pathArray[1] !== null && this.pathArray[1] !== '') ? this.pathArray[1] : '';
            this.locale = ((this.locale.length === 2) || (this.locale === 'ca_fr') || (this.locale === 'africa') || (this.locale === 'be_en') || (this.locale === 'be_fr') || (this.locale === 'be_nl') || (this.locale === 'eeurope') || (this.locale === 'il_en') || (this.locale === 'il_he') || (this.locale === 'lu_de') || (this.locale === 'lu_en') || (this.locale === 'lu_fr') || (this.locale === 'mena_ar') || (this.locale === 'mena_fr') || (this.locale === 'ch_de') || (this.locale === 'ch_fr') || (this.locale === 'ch_it') || (this.locale === 'hk_zh') || (this.locale === 'hk_en') || (this.locale === 'sea') || (this.locale === 'cy_en') || (this.locale === 'gr_en')) ? this.locale : 'en_us';
            if (this.locale === 'en_us') {
                this.pathArray.splice(1, 0, this.locale);
            }

            /*--- SITE LEVEL ---*/
            this.siteLevel = (this.pathArray[2] !== null && this.pathArray[2] !== '') ? this.pathArray[2] : '';

            /*--- SITE SECTION or PRODUCT ---*/
            this.siteSection = (this.pathArray[3] !== null && this.pathArray[3] !== '') ? this.pathArray[3] : '';
            this.productName = (this.siteLevel === 'products') ? this.product = this.pathArray[3] : '';

            /*--- SITE SUBSECTION or PRODUCT SECTION ---*/
            this.siteSubSection = (this.pathArray[4] !== null && this.pathArray[4] !== '') ? this.pathArray[4] : '';
            this.productSection = (this.siteLevel === 'products') ? this.product = this.pathArray[4] : '';

            /*--- SUB DIRECTORIES ---*/
            this.productSubSection = (this.siteLevel === 'products') ? this.product = this.pathArray[5] : '';

            /*---FILE NAME ---*/
            //this.fileName = '';
            //var proxyThis = this;    

        },
        urlItems: function() {
            this.urlLinks();
            return {
                url: window.location,
                path: window.location.pathname,
                protocol: window.location.protocol,
                hash: window.location.hash,
                search: window.location.search, // returns the entire query string. For one specific item, use this.getQueryParam()
                origin: window.location.origin, // Webkit only
                subDomain: this.subDomain,
                host: this.pathArray[0],
                hostname: window.location.hostname,
                locale: this.locale,
                referrer: document.referrer,
                siteLevel: this.siteLevel,
                siteSection: this.siteSection,
                productName: this.productName,
                siteSubSection: this.siteSubSection,
                productSection: this.productSection,
                productSubSection: this.productSubSection,
                fileName: this.fileName
            };
        },
        getUrl: function(Url, Options) {
            // Use $jq.ajax() since it is more flexible than $jq.getScript
            // Return the jqXHR object so we can chain callbacks
            return $jq.ajax({
                type: "GET",
                url: Url,
                dataType: 'script',
                cache: true
            });
        }

    }
}(jQuery));

$(document).ready(function() {
     _jQuery = window.$;

            function receiveMessage(event)
            {
                if (typeof(window.$) === 'undefined') { window.$ = _jQuery; }
                if (typeof(window.jQuery) === 'undefined') { window.jQuery = _jQuery; }
                console.log("just saying hello");
                 if (typeof(window.$) === 'undefined') { window.$ = $; }
                  if (typeof(window.JQuery) === 'undefined') { window.jQuery = $; }
                      // Do we trust the sender of this message?  (might be
                      // different from what we originally opened, for example).
                      if (event.origin !== "http://cdn.betrad.com/pub/pub1.js")
                        return;
                      else{
                        console.log("hello i am from http cdn");
                }

              // event.source is popup
              // event.data is "hi there yourself!  the secret response is: rheeeeet!"
            }
            window.addEventListener("message", receiveMessage, false);

            $("#_ev_iframe").parent().change(function() {
                    console.log("changed");
            });  

            $('#_ev_iframe').load(function(){
                 alert('loaded!');
            });

               console.log($("iframe[src*=_ev_iframe]").attr("id"));
});   



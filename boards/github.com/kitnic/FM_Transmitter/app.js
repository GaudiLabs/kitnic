!function e(t,n,a){function r(o,l){if(!n[o]){if(!t[o]){var s="function"==typeof require&&require;if(!l&&s)return s(o,!0);if(i)return i(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[o]={exports:{}};t[o][0].call(u.exports,function(e){var n=t[o][1][e];return r(n?n:e)},u,u.exports,e,t,n,a)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<a.length;o++)r(a[o]);return r}({1:[function(e,t,n){"use strict";var a=e("react"),r=e("./gerbers"),i=e("./lazy_load"),o=e("./fade_image"),l=a.createClass({displayName:"BoardShowcase",getInitialState:function(){return{viewFrontBoard:!0}},frontBoardView:function(e){e.preventDefault(),this.setState({viewFrontBoard:!0})},backBoardView:function(e){e.preventDefault(),this.setState({viewFrontBoard:!1})},render:function(){var e="frontBoard boardDiagram ",t="backBoard boardDiagram ";return this.state.viewFrontBoard?e+=" selectedBoard":t+=" selectedBoard",a.createElement("div",{className:"boardShowcaseContainer"},a.createElement(r,null),a.createElement("div",{className:"toggleBoardView responsiveTabs"},a.createElement("button",{disabled:this.state.viewFrontBoard,className:"circuitToggleBtn circuitFrontBtn",onClick:this.frontBoardView},"Front"),a.createElement("button",{disabled:!this.state.viewFrontBoard,className:"circuitToggleBtn circuitBackBtn",onClick:this.backBoardView},"Back")),a.createElement("div",{className:"boardShowcase"},a.createElement(i,{once:!0,component:a.createElement("div",{className:"img"}),distance:300},a.createElement("div",{className:"boardContainer"},a.createElement(o,{className:e,src:"images/top.svg"}),a.createElement("div",{className:"circuitBorderContainer"},a.createElement("div",{className:"circuitBorder"})),a.createElement(o,{className:t,src:"images/bottom.svg"})))))}});t.exports=l},{"./fade_image":7,"./gerbers":8,"./lazy_load":12,react:"react"}],2:[function(e,t,n){"use strict";function a(e){var t=e.split("\n").slice(0,-1),n=t[0].split("	"),a=n.map(function(e){return m(e)});a=s([u(a)]);var r=function(e){return["Manufacturer","MPN","Description"].indexOf(n[e])<0},i=c(t.slice(1).map(function(e,t){return e=e.split("	"),u(".tr"+t%2,e.map(function(e,t){var n={};return r(t)&&""==e&&(n={backgroundColor:"pink"}),d({style:n},e)}))}));return l(".bomTable",[a,i])}var r=e("react"),i=e("react-double-scrollbar"),o=e("react-hyperscript-helpers"),l=o.table,s=o.thead,c=o.tbody,u=o.tr,m=o.th,d=o.td,p=r.createClass({displayName:"BOM",propTypes:{data:r.PropTypes.object.isRequired},render:function(){return 0===this.props.data.lines.length?r.createElement("div",null,"no BOM yet"):r.createElement("div",{className:"bom"},r.createElement("div",{className:"bomTableContainer"},r.createElement(i,null,a(this.props.data.tsv))))}});t.exports=p},{react:"react","react-double-scrollbar":"react-double-scrollbar","react-hyperscript-helpers":20}],3:[function(e,t,n){"use strict";var a=e("react"),r=a.createClass({displayName:"bomInstallPrompt",propTypes:{extensionPresence:a.PropTypes.string.isRequired,bomInstallLink:a.PropTypes.func.isRequired,compatibleBrowser:a.PropTypes.bool.isRequired},render:function(){return"not_present"===this.props.extensionPresence&&this.props.compatibleBrowser?a.createElement("div",{className:"bomInstallPrompt"},"Please ",a.createElement("a",{className:"bomInstallAnchor",onClick:this.props.bomInstallLink}," install the 1-click BOM extension ")," to make full use of this feature."):a.createElement("div",null)}});t.exports=r},{react:"react"}],4:[function(e,t,n){"use strict";var a=e("react"),r=e("1-click-bom"),i=e("browser-version"),o=e("lodash"),l=e("./bom_install_prompt"),s=e("./extension_compatibility_prompt"),c=e("./install_extension"),u=e("./direct_stores"),m=a.createClass({displayName:"StoreButtons",propTypes:{items:a.PropTypes.any},isExtensionCompatible:function(e){return"undefined"==typeof navigator||!/Mobile/i.test(navigator.userAgent)&&(/Chrome/.test(e)||/Firefox/.test(e))},getInitialState:function(){var e=this,t={},n={},a={},l=i(),s=c,u=!0,m=!1,d=void 0;try{for(var p,f=function(){var r=p.value;t[r]=void 0;var i=o.map(e.props.items,function(e){return e.retailers[r]}),l=i.reduce(function(e,t){return t&&e++,e},0),s=void 0;e.props.items.length==l?(s="All parts specified",n[r]="allPartsSpecified"):0==l?(s="No parts specified",n[r]="noPartsSpecified"):(s=l+"/"+e.props.items.length+" parts specified",n[r]="somePartsSpecified"),a[r]={count:l,total:e.props.items.length,summary:s}},I=r.lineData.retailer_list[Symbol.iterator]();!(u=(p=I.next()).done);u=!0)f()}catch(e){m=!0,d=e}finally{try{!u&&I["return"]&&I["return"]()}finally{if(m)throw d}}return"undefined"!=typeof window&&setTimeout(function(){e.setState({extensionPresence:e.state.extensionWaiting?"not_present":"present"})},2e3),{compatibleBrowser:this.isExtensionCompatible(l),extensionInstallLink:s,adding:t,partsSpecified:n,parts:a,onClick:s,extensionWaiting:!0,extensionPresence:"unknown",buyMultiplier:1,buyAddPercent:10}},componentDidMount:function(){var e=this;window.addEventListener("message",function(t){if(t.source==window&&"extension"==t.data.from)switch(e.setState({extensionWaiting:!1}),t.data.message){case"register":e.setState({onClick:function(t){window.postMessage({from:"page",message:"quickAddToCart",value:{retailer:t,multiplier:e._getMultiplier()}},"*")}});break;case"updateAddingState":e.setState({adding:t.data.value})}},!1)},storeIcon:function(e,t,n){var r="/images/"+t+(n?"-grey":"")+".ico";return e?a.createElement("i",{className:"icon-spin1 animateSpin"}):a.createElement("img",{className:"storeIcons",key:t,src:r,alt:t})},storeButtons:function d(){var e=this,t=r.lineData.retailer_list,d=t.map(function(t){var n="storeButtonInner "+e.state.partsSpecified[t],r="storeButton",i="retailerIcon",o="retailerText",l="allPartsSpecified"===e.state.partsSpecified[t]||"somePartsSpecified"===e.state.partsSpecified[t],s=void 0;l&&(s=e.state.onClick.bind(null,t));var c=e.state.parts[t];return e.state.compatibleBrowser&&"present"==e.state.extensionPresence||"undefined"==typeof document||null===document.getElementById(t+"Form")||(s=function(){document.getElementById(t+"Form").submit()}),a.createElement("span",{onClick:s,title:c.summary,className:r,key:"storeButton-"+t},a.createElement("div",{className:n},a.createElement("div",{className:i},e.storeIcon(e.state.adding[t],t,!l)),a.createElement("div",{className:o},t)))});return d.unshift(),d},_getMultiplier:function(){var e=this.state.buyMultiplier,t=this.state.buyAddPercent;return e+e*(t/100)},_quantity:function(){var e=this;return a.createElement("form",{id:"quantityContainer",noValidate:!0},a.createElement("div",null,a.createElement("span",{className:"notSelectable",style:{fontWeight:"bold",marginRight:5}},"x"),a.createElement("input",{type:"number",min:1,value:this.state.buyMultiplier,onChange:function(t){var n=parseFloat(t.target.value);(isNaN(n)||1>n)&&(n=1),e.setState({buyMultiplier:n})}})),a.createElement("span",{className:"notSelectable",style:{fontSize:"2em",marginLeft:10,marginRight:10}}," + "),a.createElement("div",null,a.createElement("input",{type:"number",min:0,step:10,value:this.state.buyAddPercent,onChange:function(t){var n=parseFloat(t.target.value);(isNaN(n)||0>n)&&(n=0),e.setState({buyAddPercent:n})}}),a.createElement("span",{className:"notSelectable",style:{marginLeft:5}},"%")))},render:function(){return a.createElement("div",{className:"storeButtonContainer"},a.createElement("div",{className:"storeContainerLogo",key:"storeContainerLogo"},a.createElement("i",{className:"icon-basket-3"}),"Buy Parts"),a.createElement(l,{extensionPresence:this.state.extensionPresence,bomInstallLink:this.state.extensionInstallLink,compatibleBrowser:this.state.compatibleBrowser}),a.createElement(s,{compatibleBrowser:this.state.compatibleBrowser}),this._quantity(),a.createElement(u,{multiplier:this._getMultiplier(),items:this.props.items}),a.createElement("div",{className:"storeButtons"},this.storeButtons()))}});t.exports=m},{"./bom_install_prompt":3,"./direct_stores":5,"./extension_compatibility_prompt":6,"./install_extension":10,"1-click-bom":"1-click-bom","browser-version":"browser-version",lodash:"lodash",react:"react"}],5:[function(e,t,n){"use strict";var a=e("react"),r=e("1-click-bom/lib/data/digikey.json"),i=e("1-click-bom/lib/data/farnell.json"),o=e("1-click-bom/lib/data/countries.json"),l=function(e,t,n,a){var r,i,o,l;return r=t.line,i=t.notify,o=t.timeout,null==r&&(r=null),null==i&&(i=!1),null==o&&(o=6e4),l=new XMLHttpRequest,l.line=r,l.open("GET",e,!0),l.setRequestHeader("Content-type","application/x-www-form-urlencoded"),l.url=e,l.onreadystatechange=function(e){return 4===e.target.readyState?200===e.target.status?n(e):a(e):void 0},l.timeout=o,l.ontimedout=function(e){return a(e)},l.send()},s=function(e){var t,n=[];for(_ in o)t=o[_],n.push(t);var a="https://freegeoip.kitnic.it";return l(a,{timeout:5e3},function(a){return function(a){var r;return r=JSON.parse(a.target.responseText),t=r.country_code,"GB"===t&&(t="UK"),n.indexOf(t)<0&&(t="Other"),e(t)}}(this),function(){return e("Other")})},c=a.createClass({displayName:"DirectStores",propTypes:{items:a.PropTypes.any.isRequired,multiplier:a.PropTypes.number.isRequired},getInitialState:function(){var e=this;return"undefined"!=typeof window&&s(function(t){e.setState({countryCode:t})}),{countryCode:"Other"}},getParts:function(e){var t=this,n=this.props.items;return n=n.filter(function(t){return e in t.retailers&&""!=t.retailers[e]}),n=n.map(function(n){return{sku:n.retailers[e],reference:n.reference,quantity:Math.ceil(t.props.multiplier*n.quantity)}})},digikeyPartRenderer:function(e,t){return t++,a.createElement("span",{key:"digikeyRenderer"+t},a.createElement("input",{type:"hidden",name:"part"+t,value:e.sku}),a.createElement("input",{type:"hidden",name:"qty"+t,value:e.quantity}),a.createElement("input",{type:"hidden",name:"cref"+t,value:e.reference}))},digikey:function(e,t){var n=r.sites[r.lookup[e]];return a.createElement("form",{target:"_blank",key:"DigikeyForm",id:"DigikeyForm",method:"POST",action:"https"+n+"/classic/ordering/fastadd.aspx?WT.z_cid=ref_kitnic"},t.map(this.digikeyPartRenderer))},tildeDelimiter:function(e){return e.sku+"~"+e.quantity},farnell:function(e,t){var n=i.sites[i.lookup[e]],r=t.map(this.tildeDelimiter).join("~");return a.createElement("form",{target:"_blank",key:"FarnellForm",id:"FarnellForm",method:"GET",action:"https"+n+"/jsp/extlink.jsp"},a.createElement("input",{type:"hidden",name:"CMP",value:"ref_kitnic"}),a.createElement("input",{type:"hidden",name:"action",value:"buy"}),a.createElement("input",{type:"hidden",name:"product",value:r}))},newark:function(e){var t=e.map(this.tildeDelimiter).join("~");return a.createElement("form",{target:"_blank",key:"NewarkForm",id:"NewarkForm",method:"GET",action:"https://www.newark.com/jsp/extlink.jsp"},a.createElement("input",{type:"hidden",name:"CMP",value:"ref_kitnic"}),a.createElement("input",{type:"hidden",name:"action",value:"buy"}),a.createElement("input",{type:"hidden",name:"product",value:t}))},render:function(){var e=this.getParts("Digikey"),t=this.getParts("Farnell"),n=this.getParts("Newark");return a.createElement("span",null,[this.digikey(this.state.countryCode,e),this.farnell(this.state.countryCode,t),this.newark(n)])}});t.exports=c},{"1-click-bom/lib/data/countries.json":17,"1-click-bom/lib/data/digikey.json":18,"1-click-bom/lib/data/farnell.json":19,react:"react"}],6:[function(e,t,n){"use strict";var a=e("react"),r=a.createClass({displayName:"ExtensionCompatibilityPrompt",propTypes:{compatibleBrowser:a.PropTypes.bool.isRequired},render:function(){return this.props.compatibleBrowser?null:a.createElement("div",{className:"extensionCompatibilityPrompt"},"Sorry, the ",a.createElement("a",{className:"bomPromptLink",href:"https://1clickbom.com/"},"1-click BOM extension ")," is not yet available for your browser. Only the Digikey add-to-cart links work fully, Farnell and Newark should work but the references will not be added as line-notes.")}});t.exports=r},{react:"react"}],7:[function(e,t,n){"use strict";var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=e("react"),i=r.createClass({displayName:"FadeImage",propTypes:{style:r.PropTypes.any,speed:r.PropTypes.any,src:r.PropTypes.string.isRequired},getInitialState:function(){return{opacity:0}},fadeIn:function(){this.setState({opacity:1})},render:function(){var e=this.props.style||{};return e.transition="opacity "+(this.props.speed||1)+"s",e.opacity=this.state.opacity,r.createElement("img",a({},this.props,{style:e,src:this.props.src,onLoad:this.fadeIn}))}});t.exports=i},{react:"react"}],8:[function(e,t,n){"use strict";var a=e("react"),r=e("./zip-info.json"),i=a.createClass({displayName:"Gerbers",render:function(){return a.createElement("div",{className:"gerbersContainer"},a.createElement("a",{className:"zipPath",href:r},a.createElement("div",{className:"gerbers"},a.createElement("i",{className:"octicon octicon-circuit-board"})," ","Download Gerbers")))}});t.exports=i},{"./zip-info.json":16,react:"react"}],9:[function(e,t,n){t.exports={id:"github.com/kitnic/FM_Transmitter",summary:"Simple low powered FM radio transmitter based on a MAX2606",site:"https://www.youtube.com/watch?v=ZUxDXXBO3eA",bom:{lines:[{reference:"U2",quantity:1,description:"VCO",partNumbers:[{part:"MAX2606EUT+T",manufacturer:"Maxim Integrated"}],retailers:{Digikey:"MAX2606EUT+TCT-ND",Mouser:"MAX2606EUT+T",RS:"",Newark:"",Farnell:"2517284"},row:2},{reference:"R1, R2",quantity:2,description:"1.1k 0805",partNumbers:[{part:"ERJ-6ENF1001V",manufacturer:"Panasonic"}],retailers:{Digikey:"P1.00KCCT-ND",Mouser:"ERJ6ENF1001V",RS:"7326037",Newark:"64R5369",Farnell:"2303550"},row:2},{reference:"L1",quantity:1,description:"390nH",partNumbers:[{part:"LQW2BASR39J00L",manufacturer:"Murata"}],retailers:{Digikey:"490-5673-1-ND",Mouser:"LQW2BASR39J00L",RS:"8390976",Newark:"",Farnell:"2219340"},row:2},{reference:"U1",quantity:1,description:"3.3V regulator",partNumbers:[{part:"AP2210N-3.3TRG1",manufacturer:"Diodes Inc."}],retailers:{Digikey:"AP2210N-3.3TRG1DICT-ND",Mouser:"AP2210N3.3TRG1",RS:"8287426",Newark:"",Farnell:""},row:2},{reference:"MK1",quantity:1,description:"Microphone",partNumbers:[{part:"CMC-5042PF-AC",manufacturer:"CUI"}],retailers:{Digikey:"102-1724-ND",Mouser:"CMC5042PFAC",RS:"",Newark:"",Farnell:""},row:2},{reference:"R3",quantity:1,description:"2.2k 0805",partNumbers:[{part:"RC0805FR-072K2L",manufacturer:"Yageo"}],retailers:{Digikey:"311-2.20KCRCT-ND",Mouser:"RC0805FR072K2L",RS:"6182928",Newark:"68R0236",Farnell:"2459315"},row:2},{reference:"C4, C5",quantity:2,description:"1nF 0805 NP0",partNumbers:[{part:"CC0805JRNPO9BN102",manufacturer:"Yageo"}],retailers:{Digikey:"311-1122-1-ND",Mouser:"CC0805JRNPO9BN102",RS:"6698899",Newark:"68R4850",Farnell:"718567"},row:2},{reference:"C1, C3",quantity:2,description:"2.2uF 0805 X7R",partNumbers:[{part:"CC0805KKX7R7BB225",manufacturer:"Yageo"}],retailers:{Digikey:"311-1881-1-ND",Mouser:"CC0805KKX7R7BB225",RS:"",Newark:"65R8872",Farnell:""},row:2},{reference:"VR1",quantity:1,description:"10k pot",partNumbers:[{part:"44WR10KLFT7",manufacturer:"BI Technologies"}],retailers:{Digikey:"987-1046-1-ND",Mouser:"44WR10KLFT7",RS:"",Newark:"16M0773",Farnell:"2411389"},row:2}],tsv:"References	Qty	Description	Manufacturer	MPN	Digikey	Mouser	RS	Newark	Farnell\nU2	1	VCO	Maxim Integrated	MAX2606EUT+T	MAX2606EUT+TCT-ND	MAX2606EUT+T			2517284\nR1, R2	2	1.1k 0805	Panasonic	ERJ-6ENF1001V	P1.00KCCT-ND	ERJ6ENF1001V	7326037	64R5369	2303550\nL1	1	390nH	Murata	LQW2BASR39J00L	490-5673-1-ND	LQW2BASR39J00L	8390976		2219340\nU1	1	3.3V regulator	Diodes Inc.	AP2210N-3.3TRG1	AP2210N-3.3TRG1DICT-ND	AP2210N3.3TRG1	8287426		\nMK1	1	Microphone	CUI	CMC-5042PF-AC	102-1724-ND	CMC5042PFAC			\nR3	1	2.2k 0805	Yageo	RC0805FR-072K2L	311-2.20KCRCT-ND	RC0805FR072K2L	6182928	68R0236	2459315\nC4, C5	2	1nF 0805 NP0	Yageo	CC0805JRNPO9BN102	311-1122-1-ND	CC0805JRNPO9BN102	6698899	68R4850	718567\nC1, C3	2	2.2uF 0805 X7R	Yageo	CC0805KKX7R7BB225	311-1881-1-ND	CC0805KKX7R7BB225		65R8872	\nVR1	1	10k pot	BI Technologies	44WR10KLFT7	987-1046-1-ND	44WR10KLFT7		16M0773	2411389\n"},repo:"https://github.com/kitnic/FM_Transmitter"}},{}],10:[function(e,t,n){"use strict";var a=e("browser-version"),r=function(){var e=a(),t=void 0;return t=/Chrome/.test(e)?function(){chrome.webstore.install(void 0,void 0,function(e){return console.log(e)})}:/Firefox/.test(e)?function(){window.open("//addons.mozilla.org/firefox/downloads/latest/634060/addon-634060-latest.xpi","_self")}:function(){window.open("//1clickBOM.com","_self")}};t.exports=r()},{"browser-version":"browser-version"}],11:[function(e,t,n){"use strict";t.exports=function(e,t){"number"!=typeof t&&(t=0);var n=e.getBoundingClientRect(),a={top:n.top+t,left:n.left+t,right:n.right-t,bottom:n.bottom-t},r=window.innerHeight||document.documentElement.clientHeight,i=window.innerWidth||document.documentElement.clientWidth,o=a.top>=0&&a.left>=0,l=a.bottom<=r&&a.right<=i;return o&&l}},{}],12:[function(e,t,n){"use strict";var a=e("react"),r=e("react-dom"),i=e("./is_visible"),o=a.createClass({displayName:"LazyLoad",propTypes:{distance:a.PropTypes.number,component:a.PropTypes.node.isRequired,children:a.PropTypes.node.isRequired,once:a.PropTypes.bool},getDefaultProps:function(){return{distance:100,component:a.createElement("div",null),once:!1}},getInitialState:function(){return{visible:!1}},componentDidMount:function(){this._checkViewport(),this._timer=setInterval(this._checkViewport,1e3)},componentWillUnmount:function(){clearInterval(this._timer)},_checkViewport:function(){if(!this.props.once||!this.state.visible){var e=r.findDOMNode(this);this.setState({visible:i(e,this.props.distance)})}},render:function(){return this.state.visible?this.props.children:this.props.component}});t.exports=o},{"./is_visible":11,react:"react","react-dom":"react-dom"}],13:[function(e,t,n){"use strict";var a=e("react"),r=e("react-document-title"),i=e("./title_bar"),o=e("./bom"),l=e("./board_showcase"),s=e("./buy_parts"),c=e("./info.json"),u=a.createClass({displayName:"Page",render:function(){var e,t=c.id.split("/").slice(2).join(" / "),n=c.id.split("/").slice(0,2).join(" / ");e=""==c.site?a.createElement("div",{className:"disabledSite",title:"no website info available"},a.createElement("span",{className:"octicon octicon-link"}),"website"):a.createElement("a",{href:c.site},a.createElement("span",{className:"octicon octicon-link"})," website");var u=a.createElement("a",{href:c.repo},a.createElement("span",{className:"octicon octicon-repo"})," repo");return a.createElement(r,{title:t+" - kitnic.it"},a.createElement("div",null,a.createElement("div",{className:"page"},a.createElement(i,null,a.createElement("div",{className:"titleText"},t),a.createElement("div",{className:"subtitleText"},n)),a.createElement("div",{className:"pageContainer"},a.createElement("div",{className:"infoBar"},a.createElement("div",{className:"infoBarInner"},a.createElement("div",{className:"infoBarSummary"},c.summary),a.createElement("div",{className:"infoBarLinksContainer"},a.createElement("div",{className:"infoBarLinks"},e),a.createElement("div",{className:"infoBarLinks"},u)))),a.createElement(l,null),a.createElement(s,{items:c.bom.lines?c.bom.lines:[]}),a.createElement(o,{data:c.bom?c.bom:[]})))))}});t.exports=u},{"./board_showcase":1,"./bom":2,"./buy_parts":4,"./info.json":9,"./title_bar":15,react:"react","react-document-title":"react-document-title"}],14:[function(e,t,n){"use strict";var a=e("react"),r=e("react-dom"),i=e("./page");r.render(a.createElement(i,null),document.getElementById("content"))},{"./page":13,react:"react","react-dom":"react-dom"}],15:[function(e,t,n){"use strict";var a=e("react"),r=a.createClass({displayName:"TitleBar",propTypes:{children:a.PropTypes.any},render:function(){return a.createElement("div",{className:"titleBar"},a.createElement("div",{className:"logoContainer"},a.createElement("a",{href:"/"},a.createElement("center",{className:"logoImgContainer"},a.createElement("img",{className:"logoImg",src:"/images/logo.svg"})))),a.createElement("div",{className:"middleContainer"},this.props.children),a.createElement("div",{className:"submitContainer"},a.createElement("a",{className:"uploadContainer",href:"https://github.com/monostable/kitnic/#submitting-your-project"},a.createElement("div",{className:"submissionButton"},a.createElement("span",null,"Register a project"))),a.createElement("a",{className:"contributeContainer",title:"Contribute to Kitnic",href:"https://github.com/monostable/kitnic/"},a.createElement("div",{className:"contributeButton"},a.createElement("span",{className:"octicon octicon-mark-github githubIcon"})))))}});t.exports=r},{react:"react"}],16:[function(e,t,n){t.exports="FM_Transmitter-c48e218-gerbers.zip"},{}],17:[function(e,t,n){t.exports={Argentina:"AR",Armenia:"AM",Australia:"AU",Austria:"AT",Azerbaijan:"AZ",Bahrain:"BH",Belarus:"BY",Belgium:"BE",Bolivia:"BO",Bosnia:"BA",Botswana:"BW",Brazil:"BR",Bulgaria:"BG",Burundi:"BI",Canada:"CA",Centrafrique:"CF",Chile:"CL",China:"CN",Colombia:"CO","Costa Rica":"CR",Croatia:"HR",Cyprus:"CY","Czech Republic":"CZ",Denmark:"DK","Dominican Republic":"DO",Ecuador:"EC",Egypt:"EG",Estonia:"EE",Finland:"FI",France:"FR",Germany:"DE",Ghana:"GH",Greece:"GR",Guatemala:"GT","Hong Kong":"HK",Hungary:"HU",Iceland:"IS",India:"IN",Indonesia:"ID",Ireland:"IE",Israel:"IL",Italy:"IT",Jamaica:"JM",Japan:"JP",Jordan:"JO",Kenya:"KE",Korea:"KR",Kuwait:"KW",Latvia:"LV",Lebanon:"LB",Lesotho:"LS",Liberia:"LR",Libya:"LY",Lichtenstein:"LI",Lithuania:"LT",Luxembourg:"LU",Macedonia:"MK",Madagascar:"MG",Malawi:"MW",Malaysia:"MY",Malta:"MT",Mauritius:"MU",Mexico:"MX",Moldova:"MD",Montenegro:"ME",Morocco:"MA",Mozambique:"MZ",Namibia:"NA",Netherlands:"NL","New Zealand":"NZ",Nigeria:"NG",Norway:"NO",Oman:"OM",Pakistan:"PK",Panama:"PA",Peru:"PE",Philippines:"PH",Poland:"PL",Portugal:"PT","Puerto Rico":"PR",Qatar:"QA",Romania:"RO","Russian Federation":"RU","Saudi Arabia":"SA",Senegal:"SN",Serbia:"RS",Singapore:"SG",Slovakia:"SK",Slovenia:"SI","South Africa":"ZA",Spain:"ES","Sri Lanka":"LK",Sweden:"SE",Switzerland:"CH",Taiwan:"TW",Tanzania:"TZ",Thailand:"TH",Tunisia:"TN",Turkey:"TR",Ukraine:"UA","United Arab Emirates":"AE","United Kingdom":"UK","United States":"US",Uruguay:"UY",Venezuela:"VE","Viet Nam":"VN",Zambia:"ZM",Zimbabwe:"ZW",Other:"Other"}},{}],18:[function(e,t,n){t.exports={sites:{AT:"://www.digikey.at",AU:"://www.digikey.com.au",BE:"://www.digikey.be",CA:"://www.digikey.ca",CH:"://www.digikey.ch",CN:"://www.digikey.cn",DE:"://www.digikey.de",DK:"://www.digikey.dk",ES:"://www.digikey.es",FI:"://www.digikey.fi",FR:"://www.digikey.fr",GR:"://www.digikey.gr",HK:"://www.digikey.hk",IE:"://www.digikey.ie",IL:"://www.digikey.co.il",IT:"://www.digikey.it","US/International":"://www.digikey.com",JP:"://www.digikey.jp",KR:"://www.digikey.kr",LU:"://www.digikey.lu",MX:"://www.digikey.com.mx",NL:"://www.digikey.nl",NO:"://www.digikey.no",NZ:"://www.digikey.co.nz",PT:"://www.digikey.pt",SE:"://www.digikey.se",SG:"://www.digikey.sg",TW:"://www.digikey.tw",UK:"://www.digikey.co.uk"},carts:"/classic/ordering/addpart.aspx",addlines:"/classic/ordering/addpart.aspx",addline_params:"",lookup:{AE:"US/International",AM:"US/International",AR:"US/International",AT:"AT",AU:"AU",AZ:"US/International",BA:"US/International",BE:"BE",BG:"US/International",BH:"US/International",BI:"US/International",BO:"US/International",BR:"US/International",BW:"US/International",BY:"US/International",CA:"CA",CF:"US/International",CH:"CH",CL:"US/International",CN:"CN",CO:"US/International",CR:"US/International",CY:"US/International",CZ:"US/International",DE:"DE",DK:"DK",DO:"US/International",EC:"US/International",EE:"US/International",EG:"US/International",ES:"ES",FI:"FI",FR:"FR",GH:"US/International",GR:"GR",GT:"US/International",HK:"HK",HR:"US/International",HU:"US/International",ID:"US/International",IE:"IE",IL:"IL",IN:"US/International",IS:"US/International",IT:"IT",JM:"US/International",JO:"US/International",JP:"JP",KE:"US/International",KR:"KR",KW:"US/International",LB:"US/International",LI:"US/International",LK:"US/International",LR:"US/International",LS:"US/International",LT:"US/International",LU:"LU",LV:"US/International",LY:"US/International",MA:"US/International",MD:"US/International",ME:"US/International",MG:"US/International",MK:"US/International",MT:"US/International",MU:"US/International",MW:"US/International",MX:"MX",MY:"US/International",MZ:"US/International",NA:"US/International",NG:"US/International",NL:"NL",NO:"NO",NZ:"NZ",OM:"US/International",PA:"US/International",PE:"US/International",PH:"US/International",PK:"US/International",PL:"US/International",PR:"US/International",PT:"PT",QA:"US/International",RO:"US/International",RS:"US/International",RU:"US/International",SA:"US/International",SE:"SE",SG:"SG",SI:"US/International",SK:"US/International",SN:"US/International",TH:"US/International",TN:"US/International",TR:"US/International",TW:"TW",TZ:"US/International",UA:"US/International",UK:"UK",US:"US/International",UY:"US/International",VE:"US/International",VN:"US/International",ZA:"US/International",ZM:"US/International",ZW:"US/International",Other:"US/International"}}},{}],19:[function(e,t,n){t.exports={sites:{AT:"://at.farnell.com",BE:"://be.farnell.com",BG:"://bg.farnell.com",CZ:"://cz.farnell.com",DK:"://dk.farnell.com",EE:"://ee.farnell.com",FI:"://fi.farnell.com",FR:"://fr.farnell.com",DE:"://de.farnell.com",HU:"://hu.farnell.com",IE:"://ie.farnell.com",IL:"://il.farnell.com",IT:"://it.farnell.com",LV:"://lv.farnell.com",LT:"://lt.farnell.com",NL:"://nl.farnell.com",NO:"://no.farnell.com",PL:"://pl.farnell.com",PT:"://pt.farnell.com",RO:"://ro.farnell.com",RU:"://ru.farnell.com",SK:"://sk.farnell.com",SI:"://si.farnell.com",ES:"://es.farnell.com",SE:"://se.farnell.com",CH:"://ch.farnell.com",TR:"://tr.farnell.com",UK:"://uk.farnell.com",NO:"://no.farnell.com",SE:"://se.farnell.com",AU:"://au.element14.com",CN:"://cn.element14.com",HK:"://hk.element14.com",IN:"://in.element14.com",KR:"://kr.element14.com",MY:"://my.element14.com",NZ:"://nz.element14.com",PH:"://ph.element14.com",SG:"://sg.element14.com",TW:"://tw.element14.com",TH:"://th.element14.com",International:"://export.farnell.com"},carts:"/jsp/shoppingCart/shoppingCart.jsp",addlines:"/jsp/shoppingCart/quickPaste.jsp?_DARGS=/jsp/shoppingCart/fragments/quickPaste/quickPaste.jsp.quickpaste",addline_params:"",lookup:{AE:"International",AU:"AU",AM:"International",AR:"International",AT:"AT",AZ:"International",BA:"International",BE:"BE",BG:"BG",BO:"International",BR:"International",BY:"International",CA:"International",CH:"CH",CL:"International",CN:"CN",CO:"International",CR:"International",CY:"International",CZ:"CZ",DE:"DE",DK:"DK",DO:"International",EC:"International",EE:"EE",EG:"International",ES:"ES",FI:"FI",FR:"FR",GR:"International",GT:"International",HK:"HK",HR:"International",HU:"HU",ID:"International",IE:"IE",IL:"IL",IN:"IN",IS:"International",IT:"IT",International:"International",JM:"International",JP:"International",KR:"KR",LB:"International",LK:"International",LT:"LT",LU:"International",LI:"International",LV:"LV",MA:"International",MD:"International",MK:"International",MX:"International",MY:"MY",NL:"NL",NO:"NO",NZ:"NZ",PA:"International",PE:"International",PH:"PH",PK:"International",PL:"PL",PR:"International",PT:"PT",RO:"RO",RS:"International",RU:"RU",SA:"International",SE:"SE",SG:"SG",SI:"SI",SK:"SK",TH:"TH",TN:"International",TR:"TR",TW:"TW",UA:"RU",UK:"UK",US:"International","US/International":"International",UY:"International",VE:"International",VN:"International",ZA:"International",BH:"International",BW:"International",BI:"International",CF:"International",GH:"International",JO:"International",KE:"International",KW:"International",LS:"International",LR:"International",LY:"International",MG:"International",MW:"International",MU:"International",ME:"International",MT:"International",MZ:"International",NA:"International",NG:"International",OM:"International",QA:"International",SN:"International",TZ:"International",ZM:"International",ZW:"International",Other:"International"}}},{}],20:[function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(n,"__esModule",{value:!0}),n.hh=void 0;var l=e("react"),s=a(l),c=e("./tag-names.js"),u=function(e){return Array.isArray(e)},m=function(e){return"string"==typeof e&&e.length>0},d=function(e){return m(e)&&(f(e,".")||f(e,"#"))},p=function(e){return/string|number|boolean/.test("undefined"==typeof e?"undefined":o(e))||u(e)},f=function(e,t){return 0===e.indexOf(t)},I=function(e,t){return e.split(t)},g=function(e,t,n){return e.substring(t,n)},y=function(e){var t=/([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/,n=I(e,t);return n.reduce(function(e,t){return f(t,"#")?e.id=g(t,1):f(t,".")&&(e.className=(e.className+" "+g(t,1)).trim()),e},{className:""})},b=function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=arguments.length<=2||void 0===arguments[2]?[]:arguments[2],a=[e,t];return u(n)?a.push.apply(a,r(n)):a.push(n),s["default"].createElement.apply(s["default"],a)},h=n.hh=function(e){return function(t,n,a){if(d(t)){var r=y(t);if(p(n))return b(e,r,n);var o=n||{},l=o.className,s=void 0===l?"":l;s=(r.className+" "+s+" ").trim();var c=i({},n,r,{className:s});return p(a)?b(e,c,a):b(e,c)}return p(t)?b(e,{},t):p(n)?b(e,t,n):b(e,t)}},S=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),a=1;t>a;a++)n[a-1]=arguments[a];return h(e).apply(void 0,n)};t.exports=c.TAG_NAMES.reduce(function(e,t){return e[t]=h(t),e},{h:S,hh:h})},{"./tag-names.js":21,react:"react"}],21:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=n.TAG_NAMES=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","video","wbr","circle","clipPath","defs","ellipse","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]},{}]},{},[14]);
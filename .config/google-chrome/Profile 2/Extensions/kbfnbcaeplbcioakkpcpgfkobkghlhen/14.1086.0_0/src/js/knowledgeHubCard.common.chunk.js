(self.webpackChunk=self.webpackChunk||[]).push([[902],{33678:(e,t,n)=>{n.d(t,{A:()=>c,a:()=>r});var r,a=n(27378),o=n(88056),i=n(95195),l=n(95574);!function(e){!function(e){e.supportsSVGDominantBaseline="supportsSVGDominantBaseline",e.supportsSetGoalsLoader="supportsSetGoalsLoader",e.onlyTrustedEvents="onlyTrustedEvents"}(e.Flag||(e.Flag={})),e.Context=a.createContext(o.Y.invariantContent("PlatformEnvironment"));var t=function(){this.has=function(){return!1},this.actions={openUrl:function(){return i.F2(void 0)},openPopup:function(){return i.F2(void 0)}}};e.Mock=t}(r||(r={}));var c=function(){function e(){this.actions={openUrl:function(e){return l.vM((function(){throw new Error("Not implemented")}))},openPopup:function(e){return l.vM((function(){throw new Error("Not implemented")}))}}}return e.prototype.has=function(e){throw new Error("Not implemented")},e}()},101:(e,t,n)=>{n.d(t,{l:()=>r});var r,a=n(59312),o=n(27378),i=n(95300),l=n(60797),c=n(66310),s=n(24209),u=n(85089),m=n(49708),d=n(85985),p=n(76974),f=n(98403),v=n(17343),g=n(93508),h=n(77176),C=n(2844),E=n(41398),w=n(19751),k=n(18625),b=n(5114),x=n(19962),y=n(18208),N=n(81531);!function(e){var t;!function(e){e.nextLevel=function(e,t){return{rect:e,level:t+1}}}(e.State||(e.State={})),function(e){e.empty={top:0,bottom:0}}(e.Padding||(e.Padding={})),function(e){e.root="root",e.inherit="inherit"}(t=e.ContainerType||(e.ContainerType={})),e.withViewportContainer=function(n,r){return function(C){function E(){var e=null!==C&&C.apply(this,arguments)||this;return e._viewportEl=new i.X(b.none),e._onMount=function(t){e._viewportEl.next(b.fromNullable(t)),e.props.onMount&&t&&e.props.onMount(t)},e}return(0,a.ZT)(E,C),E.prototype.render=function(){var i=this.props,C=i.name,E=i.children,w=this._viewportEl.pipe(l.oA,c.w((function(e){return s.T(u.Qr,m.R(e,"transitionend").pipe(d.h((function(t){return t.target===e}))),p.of(!0).pipe(c.w(f.b2.rafScheduler))).pipe(v.h(e),g.O(e),h.U(x.UL.fromEl))}))),k=r.type===t.root?e.RootVirtualContainer:e.InheritVirtualContainer;return o.createElement(n,(0,a.pi)({},this.props,{onMount:this._onMount,name:C}),o.createElement(k,{viewport:w,name:C},E))},E}(o.Component)},e.RootVirtualContainer=function(t){var n=t.viewport,r=t.viewportPadding,a=void 0===r?p.of(e.Padding.empty):r,i=t.name,l=t.children,c=o.useContext(e.Context);return o.createElement(e.Context.Provider,{key:P(i),value:C.aj(n,a,_).pipe(E.M(c.pipe(h.U((function(e){return e.level}))),e.State.nextLevel),w.shareReplay({bufferSize:1,refCount:!0}))},l)},e.InheritVirtualContainer=function(t){var n=t.viewport,r=t.viewportPadding,a=void 0===r?p.of(x.UL.empty):r,i=t.name,l=t.children,c=o.useContext(e.Context);return o.createElement(e.Context.Provider,{key:P(i),value:C.aj(c.pipe(h.U((function(e){return e.rect}))),C.aj(n||c.pipe(h.U((function(e){return e.rect}))),a,_),x.UL.intersection).pipe(h.U(b.getOrElse((function(){return N.C8.Logging.getLogger("InheritVirtualContainer").warn("Got an empty rect for inherit viewport",{name:i}),x.UL.empty}))),E.M(c.pipe(h.U((function(e){return e.level}))),e.State.nextLevel),w.shareReplay({bufferSize:1,refCount:!0}))},l)};var n=k.P((function(){return u.Qr.pipe(v.h(document.body),g.O(document.body),h.U(x.UL.fromEl),h.U((function(e){return{rect:e,level:0}})))})).pipe(w.shareReplay({bufferSize:1,refCount:!0}));e.Context=o.createContext(n)}(r||(r={}));var _=function(e,t){return{top:e.top+t.top,bottom:e.bottom-t.bottom,height:e.height-t.top-t.bottom,left:e.left,right:e.right,width:e.width}},P=function(e){return"viewportProvider".concat(y._A(e))}},88056:(e,t,n)=>{var r;n.d(t,{Y:()=>r}),function(e){e.invariantContent=function(e){return"function"==typeof Proxy?new Proxy({},{get:function(t,n){if(null==t[n])throw new Error("Please provide context using ".concat(e,".Context.Provider"));return t[n]}}):void 0}}(r||(r={}))},62226:(e,t,n)=>{n.r(t),n.d(t,{KnowledgeHubCard:()=>_});var r=n(27378),a=n(33678),o=n(95195);var i=n(18390),l=n(75235),c=n(64757),s=n(61922),u=n(22590);const m=({model:e,onPointPeopleClick:t})=>{const n=e.communicationMethods.length>0,a=n?e.communicationMethods[0].link:"";return r.createElement(c.zx,{name:"point-person-details","data-grammarly-part":"knowledge-hub-card-point-person",target:"_blank",rel:"noreferrer",className:u.item,disabled:!n,href:a,onClick:()=>t()},e.avatarUrl?r.createElement("img",{className:u.avatar,src:e.avatarUrl,alt:""}):r.createElement(s.JO.UserProfile,{className:u.icon}),r.createElement("div",{className:u.text},e.firstName," ",e.lastName))},d=({list:e,onPointPeopleClick:t})=>r.createElement("div",{"data-grammarly-part":"knowledge-hub-card-point-people-list",className:u.list},e.map(((e,n)=>r.createElement(m,{key:n,model:e,onPointPeopleClick:()=>t()}))));var p=n(74868);const f=({model:e,onRelatedMaterialsClick:t})=>r.createElement(c.zx,{name:"related-material-link","data-grammarly-part":"knowledge-hub-card-related-material",target:"_blank",rel:"noreferrer",className:p.item,href:e.link,onClick:()=>t()},r.createElement("img",{className:p.icon,src:e.iconUrl,alt:""}),r.createElement("div",{className:p.text},e.title)),v=({list:e,onRelatedMaterialsClick:t})=>r.createElement("div",{"data-grammarly-part":"knowledge-hub-card-related-materials-list",className:p.list},e.map(((e,n)=>r.createElement(f,{key:n,model:e,onRelatedMaterialsClick:()=>t()})))),g=(0,r.forwardRef)((function({articleTitle:e,articleContent:t,relatedMaterials:n,pointPeople:a,onRelatedMaterialsClick:o,onPointPeopleClick:i},c){return r.createElement("div",{"data-grammarly-part":"knowledge-hub-card-content",className:l.cardContent,ref:c},r.createElement("div",{className:l.section},r.createElement("div",{className:l.primaryTitle},e),r.createElement("div",{className:l.text},t)),n.length>0&&r.createElement("div",{className:l.section},r.createElement("div",{className:l.secondaryTitle},"Related materials"),r.createElement(v,{list:n,onRelatedMaterialsClick:()=>o()})),a.length>0&&r.createElement("div",{className:l.section},r.createElement("div",{className:l.secondaryTitle},"Point people"),r.createElement(d,{list:a,onPointPeopleClick:()=>i()})))}));var h=n(5872),C=n(18813),E=n(5376);const w=({className:e,width:t=18})=>r.createElement(s.a1,{className:e,width:t,viewBox:"0 0 18 17"},r.createElement("path",{d:"M17.5 15.9998C17.7761 15.9998 18 16.2237 18 16.4998C18 16.776 17.7761 16.9998 17.5 16.9998H0.5C0.223858 16.9998 0 16.776 0 16.4998C0 16.2237 0.223858 15.9998 0.5 15.9998H17.5ZM13.894 0.853402L15.1464 2.10586C15.7322 2.69164 15.7322 3.64139 15.1464 4.22718L5.37377 13.9998H2V10.6261L11.7727 0.853402C12.3585 0.267616 13.3082 0.267616 13.894 0.853402ZM10.666 3.37306L3 11.0403V12.9998H4.95956L12.626 5.33306L10.666 3.37306ZM12.4798 1.56051L11.373 2.66606L13.333 4.62606L14.4393 3.52007C14.6346 3.32481 14.6346 3.00822 14.4393 2.81296L13.1869 1.56051C12.9916 1.36525 12.675 1.36525 12.4798 1.56051Z",fill:"#646B81"})),k=({suggestCorrectionUrl:e,onTurnOffKnowledgeHub:t,onSuggestEditClick:n})=>r.createElement("div",{"data-grammarly-part":"knowledge-hub-card-actions-list",className:E.actionsList},r.createElement(c.zx.Flat,{name:"turn-off-knowledge-hub-button",className:E.item,textPosition:"surrounded",onClick:()=>t()},r.createElement(s.JO.Mute,{className:E.icon}),r.createElement("div",{className:E.text},"Turn off Knowledge Hub")),""!==e&&r.createElement(r.Fragment,null,r.createElement("div",{className:E.splitter}),r.createElement(c.zx.Flat,{name:"suggest-correction-button",className:E.item,textPosition:"surrounded",target:"_blank",href:e,onClick:()=>n()},r.createElement(w,{className:E.icon}),r.createElement("div",{className:E.text},"Suggest correction")))),b=({isOverlay:e,suggestCorrectionUrl:t,onAlertMenuClick:n,onTurnOffKnowledgeHub:a,onSuggestEditClick:o})=>r.createElement("div",{"data-grammarly-part":"knowledge-hub-card-footer",className:(0,h.cs)(E.cardFooter,e&&E.isOverlaid)},r.createElement("div",{className:E.toolbar},r.createElement(C.L,{name:"actions-dropdown-menu",appearanceBehavior:"mouseClick",showDelay:0,closeDelay:500,theme:{dropdownList:E.actionsContainer},label:r.createElement(c.zx.Flat,{name:"actions-dropdown-button",textPosition:"surrounded",className:E.button,onClick:()=>n()},r.createElement(s.JO.Expand,{className:E.icon}))},r.createElement(k,{suggestCorrectionUrl:t,onTurnOffKnowledgeHub:a,onSuggestEditClick:o}))));var x=n(92677);const y=({headerText:e,headerIconSrc:t})=>r.createElement("div",{"data-grammarly-part":"knowledge-hub-card-header",className:x.cardHeader},r.createElement("div",{"data-grammarly-part":"knowledge-hub-card-title",className:x.title},r.createElement("div",{className:x.icon},r.createElement("img",{src:t,alt:""})),r.createElement("div",{className:x.text},e)));const N=new class{constructor(){this._flags=new Set,this.actions={openUrl:()=>o.t$(new Error("Not implemented")),openPopup:()=>o.t$(new Error("Not implemented"))}}has(e){return this._flags.has(e)}},_=({model:e})=>{const t=(0,r.useRef)(null),{refYOverflowing:n}=(e=>{const[t,n]=(0,r.useState)(!1);return(0,r.useEffect)((()=>{if(!(null==e?void 0:e.current))return;const r=e.current.scrollHeight>e.current.clientHeight;t!==r&&n(r)}),[e.current]),{refYOverflowing:t}})(t);return e.isUserAuthenticated?r.createElement("div",{"data-grammarly-part":"knowledge-hub-card",className:i.card},r.createElement(a.a.Context.Provider,{value:N},r.createElement(y,{headerIconSrc:e.headerIconSrc,headerText:e.headerText}),r.createElement(g,{articleTitle:e.articleTitle,articleContent:e.articleContent,relatedMaterials:e.relatedMaterials,pointPeople:e.pointPeople,onRelatedMaterialsClick:e.onRelatedMaterialsClick,onPointPeopleClick:e.onPointPeopleClick,ref:t}),r.createElement(b,{isOverlay:n,suggestCorrectionUrl:e.suggestCorrectionUrl,onAlertMenuClick:e.onAlertMenuClick,onTurnOffKnowledgeHub:e.onTurnOffKnowledgeHub,onSuggestEditClick:e.onSuggestEditClick}))):null}},75235:e=>{e.exports={cardContent:"__s4G",section:"_3Ol6f",primaryTitle:"_2_VR5",secondaryTitle:"Rk10i",text:"_1imbL"}},22590:e=>{e.exports={list:"_3Awr0",item:"_2883T",avatar:"_7NLsf",icon:"_1dFB9",text:"_3z01E"}},74868:e=>{e.exports={list:"we-yz",item:"uZKJX",icon:"_10ygE",text:"_1uhVt"}},18390:e=>{e.exports={card:"_1yywm"}},5376:e=>{e.exports={cardFooter:"reCcH",isOverlaid:"_3Jg0h",toolbar:"_121eK",button:"wbbXw",text:"_3qZ8D",icon:"_3vR6U",actionsContainer:"_2ulcY",actionsList:"_2t-_Q",item:"_1zOQJ",splitter:"_1G0B5"}},92677:e=>{e.exports={cardHeader:"_1_vf7",title:"_2HnM2",icon:"_3si_g",text:"_2K5bd",betaButton:"_1ZHjr"}}}]);
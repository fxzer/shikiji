import{ac as y,G as i,h as u,X as c,y as m}from"./framework.NBdjhPqr.js";import{d as j}from"./pinia.23Neb2sl.js";const F=j("playground",()=>{const l=y("shikiji-playground-lang","typescript"),o=y("shikiji-playground-theme","vitesse-dark"),L=i("TypeScript"),w=i("Vitesse Dark"),p=u(""),v=u(""),s=i([{id:"vitesse-dark",displayName:"Vitesse Dark",type:"dark",import:void 0}]),t=i([{id:"typescript",name:"TypeScript",import:void 0}]),T=i([]),b=i([]),r=y("shikiji-playground-input",""),C=u("<pre></pre>"),E=u(""),h=u(!0);function S(){p.value="",v.value="",t.value.length&&s.value.length&&(l.value=t.value[Math.floor(Math.random()*t.value.length)].id,o.value=s.value[Math.floor(Math.random()*s.value.length)].id)}return typeof window<"u"&&(async()=>{const{getHighlighter:V,addClassToHast:M}=await c(()=>import("./index.c6WTzp4G.js"),__vite__mapDeps([0,1,2,3,4])),{bundledLanguagesInfo:d}=await c(()=>import("./bundle-full.82MQ5j1u.js"),__vite__mapDeps([1,2,3,4])),{bundledLanguagesInfo:N}=await c(()=>import("./bundle-web.gSPBq830.js"),__vite__mapDeps([5,2,4,3])),{bundledThemesInfo:g}=await c(()=>import("./themes.2ajtV2zR.js"),__vite__mapDeps([3,2])),f=await V({themes:[o.value],langs:["typescript","javascript",l.value]}),_=new Map;function R(e){return _.has(e)||_.set(e,fetch(`https://raw.githubusercontent.com/antfu/textmate-grammars-themes/main/samples/${e}.sample`).then(a=>a.text()).catch(a=>{console.error(a)})),_.get(e)}s.value=g,t.value=d,T.value=d,b.value=N,m(r,I,{immediate:!0}),m([l,o],async(e,a)=>{var P,D;if(L.value=((P=t.value.find(n=>n.id===e[0]))==null?void 0:P.name)||"",w.value=((D=s.value.find(n=>n.id===e[1]))==null?void 0:D.displayName)||"",h.value=!0,await Promise.all([f.loadTheme(o.value),f.loadLanguage(l.value)]),(a[0]||!r.value)&&e[0]!==a[0]){const n=await R(l.value);n&&(r.value=n.trim().replace(/\n.*?from.*?$/i,"").trim())}I()},{immediate:!0}),m(p,e=>{t.value=e?d.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())||a.id.includes(e.toLowerCase())):t.value=d}),m(v,e=>{s.value=e?g.filter(a=>a.displayName.toLowerCase().includes(e.toLowerCase())||a.id.includes(e.toLowerCase())):g});function I(){C.value=f.codeToHtml(r.value,{lang:l.value,theme:o.value,transformers:[{pre(e){var a;M(e,"vp-code"),E.value=((a=e.properties)==null?void 0:a.style)||""}}]}),h.value=!1}})(),{lang:l,theme:o,langName:L,themeName:w,allLanguages:t,allThemes:s,langFilter:p,themeFilter:v,bundledLangsFull:T,bundledLangsWeb:b,input:r,output:C,isLoading:h,preStyle:E,randomize:S}});export{F as u};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/chunks/index.c6WTzp4G.js","assets/chunks/bundle-full.82MQ5j1u.js","assets/chunks/framework.NBdjhPqr.js","assets/chunks/themes.2ajtV2zR.js","assets/chunks/wasm.KAaG3kdu.js","assets/chunks/bundle-web.gSPBq830.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,t,n){"use strict";n.r(t);var r=n(17),c=n.n(r),u=n(8),a=n(3),o=n(2),i=n(4),s=n.n(i),d="/api/persons",l=function(){return s.a.get(d).then((function(e){return e.data}))},b=function(e){return s.a.post(d,e).then((function(e){return e.data}))},j=function(e){return s.a.delete("".concat(d,"/").concat(e))},f=function(e,t){return s.a.put("".concat(d,"/").concat(e),t).then((function(e){return e.data}))},h=n(0),m=function(e){var t=e.message;if(null!==t){var n={color:"error"===t.type?"red":"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return Object(h.jsx)("div",{style:n,children:t.text})}return null},O=function(e){var t=e.handleFilterText;return Object(h.jsxs)("div",{children:["filter show with ",Object(h.jsx)("input",{onChange:t})]})},x=function(e){return Object(h.jsxs)("form",{onSubmit:e.addPerson,children:[Object(h.jsxs)("div",{children:["name: ",Object(h.jsx)("input",{value:e.newName,onChange:e.handleNewName})]}),Object(h.jsxs)("div",{children:["number: ",Object(h.jsx)("input",{value:e.newNumber,onChange:e.handleNewNumber})]}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{type:"submit",children:"add"})})]})},p=function(e){var t=e.name,n=e.number,r=e.handleDelete;return Object(h.jsxs)("div",{children:[t," ",n," ",Object(h.jsx)("button",{onClick:r,children:"delete"})]})},v=function(){var e=Object(o.useState)([]),t=Object(a.a)(e,2),n=t[0],r=t[1],c=Object(o.useState)(""),i=Object(a.a)(c,2),s=i[0],d=i[1],v=Object(o.useState)(""),w=Object(a.a)(v,2),g=w[0],N=w[1],y=Object(o.useState)(""),k=Object(a.a)(y,2),S=k[0],C=k[1],T=Object(o.useState)(null),D=Object(a.a)(T,2),P=D[0],B=D[1];Object(o.useEffect)((function(){l().then((function(e){return r(e)}))}),[]);return Object(h.jsxs)("div",{children:[Object(h.jsx)("h2",{children:"Phonebook"}),Object(h.jsx)(m,{message:P}),Object(h.jsx)(O,{handleFilterText:function(e){return C(e.target.value)}}),Object(h.jsx)("h2",{children:"add a new"}),Object(h.jsx)(x,{newName:s,newNumber:g,addPerson:function(e){e.preventDefault();var t=n.findIndex((function(e){return e.name===s}));if(-1===t){b({name:s,number:g}).then((function(e){r(n.concat(e)),d(""),N(""),B({text:"Added ".concat(e.name),type:"success"}),setTimeout((function(){B(null)}),3e3)})).catch((function(e){B({text:e.response.data.error,type:"error"}),setTimeout((function(){B(null)}),3e3)}))}else{var c=n[t];if(window.confirm("".concat(c.name," is already added to phonebook, replace the old number with a new one?"))){var a=Object(u.a)(Object(u.a)({},c),{},{number:g}),o=a.id;f(o,a).then((function(e){r(n.map((function(t){return t.id!==o?t:e}))),d(""),N(""),B({text:"Changed ".concat(e.name,"'s number"),type:"success"}),setTimeout((function(){B(null)}),3e3)})).catch((function(e){B({text:e.response.data.error,type:"error"}),setTimeout((function(){B(null)}),3e3)}))}}},handleNewName:function(e){return d(e.target.value)},handleNewNumber:function(e){return N(e.target.value)}}),Object(h.jsx)("h2",{children:"Numbers"}),n.filter((function(e){return e.name.toLowerCase().startsWith(S.toLowerCase())})).map((function(e){return Object(h.jsx)(p,{name:e.name,number:e.number,handleDelete:function(){return function(e){window.confirm("Delete ".concat(e.name," ?"))&&j(e.id).then((function(){r(n.filter((function(t){return t.id!==e.id}))),B({text:"Deleted ".concat(e.name),type:"success"}),setTimeout((function(){B(null)}),3e3)}))}(e)}},e.id)}))]})};c.a.render(Object(h.jsx)(v,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.b9b02699.chunk.js.map
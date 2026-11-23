const foods = [
["الأرز","الحبوب","مسموح منسوب","تذكره بعض القوائم ضمن المسموحات؛ راجع المصدر."],
["زيت الزيتون","الدهون","مسموح منسوب","يستخدم باعتدال؛ كثيف السعرات."],
["البطاطس","النشويات","مسموح منسوب","تذكره بعض القوائم ضمن المسموحات."],
["السمك البحري الطبيعي","البروتين","مسموح منسوب","تذكره بعض القوائم بشروط تتعلق بالمصدر."],
["اللحم البقري","البروتين","مسموح منسوب","تذكر بعض القوائم له تكراراً أسبوعياً."],
["اللحم الضأن","البروتين","مسموح منسوب","تذكر بعض القوائم له تكراراً أسبوعياً."],
["الموز","الفواكه","مسموح منسوب","تصنيف منقول من قوائم منشورة."],
["التفاح","الفواكه","مسموح منسوب","قد تذكر بعض القوائم شروطاً لطريقة تناوله."],
["التمر","الفواكه","مسموح منسوب","تصنيف منقول من قوائم منشورة."],
["الفراولة","الفواكه","مسموح منسوب","تصنيف منقول من قوائم منشورة."],
["الطحينة","الدهون","مسموح منسوب","مصدر للدهون وبعض البروتين النباتي."],
["البيض","البروتين","ممنوع منسوب","مدرج ضمن الممنوعات في بعض القوائم المتداولة."],
["الدجاج","البروتين","ممنوع منسوب","مدرج ضمن الممنوعات في بعض القوائم المتداولة."],
["الحليب الطازج","الألبان","ممنوع منسوب","مدرج ضمن الممنوعات في بعض القوائم."],
["الزبادي","الألبان","ممنوع منسوب","مدرج ضمن الممنوعات في بعض القوائم."],
["الخبز الأبيض","الحبوب","ممنوع منسوب","مدرج ضمن الممنوعات في بعض القوائم."],
["المكرونة","الحبوب","ممنوع منسوب","مدرجة ضمن الممنوعات في بعض القوائم."],
["الخيار","الخضروات","ممنوع منسوب","مدرج ضمن الممنوعات في بعض القوائم."],
["الخس","الخضروات","ممنوع منسوب","مدرج ضمن الممنوعات في بعض القوائم."],
["العدس","البقوليات","ممنوع منسوب","مدرج ضمن الممنوعات في بعض القوائم."],
["الكوسة","الخضروات","مشروط منسوب","تختلف القوائم في شروطها."],
["البامية","الخضروات","مشروط منسوب","تختلف القوائم في شروطها."],
["الباذنجان","الخضروات","مشروط منسوب","تختلف القوائم في شروطها."],
["الملوخية","الخضروات","مشروط منسوب","تختلف القوائم في شروطها."]
];
const plans = {
"السبت":["بيضتان وخبز حبوب كاملة وخضروات","سمك مشوي وأرز وسلطة متنوعة","تفاحة و10 حبات لوز","شوربة عدس وسلطة"],
"الأحد":["شوفان مع حليب وفاكهة","دجاج مشوي وأرز وخضروات","فاكهة ومكسرات","سمك مشوي وبطاطس"],
"الاثنين":["فول وخبز حبوب كاملة","لحم قليل الدهون وأرز وخضروات","زبادي وفاكهة","بيض وخضروات"],
"الثلاثاء":["بيض وخبز وخضروات","سمك مشوي وبطاطس وسلطة","مكسرات وفاكهة","شوربة عدس"],
"الأربعاء":["زبادي وشوفان وفاكهة","دجاج مشوي وأرز وخضروات","فاكهة ومكسرات","سلطة حمص ولبن"],
"الخميس":["فول وخضروات وخبز","لحم قليل الدهون وأرز وسلطة","فاكهة","سمك مشوي وخضروات"],
"الجمعة":["بيض وخبز حبوب كاملة","سمك أو لحم مشوي وأرز وخضروات","فاكهة ومكسرات","شوربة خضار ومصدر بروتين"]
};
const labels=["الإفطار","الغداء","الوجبة الخفيفة","العشاء"];
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const today=new Date().toLocaleDateString("ar");
const defaultData={weights:[{date:today,weight:95}],tasks:{},notes:""};
let data=load();
function load(){try{return {...defaultData,...JSON.parse(localStorage.getItem("tayyibatData")||"{}")}}catch{return {...defaultData}}}
function save(){localStorage.setItem("tayyibatData",JSON.stringify(data))}
function renderTasks(){
  const tasks=data.tasks[today]||{};
  $$("[data-task]").forEach(el=>el.checked=!!tasks[el.dataset.task]);
  const count=$$("[data-task]").filter(el=>el.checked).length;
  $("#dailyProgress").style.width=(count/6*100)+"%";
  $("#progressText").textContent=`${count} من 6 مهام مكتملة`;
}
function renderFoods(){
  const q=$("#foodSearch").value.trim();
  const filter=$(".filter.active")?.dataset.filter||"الكل";
  const list=foods.filter(f=>(f[0].includes(q)||f[1].includes(q))&&(filter==="الكل"||f[2]===filter));
  $("#foodList").innerHTML=list.map(f=>{
    const cls=f[2].startsWith("مسموح")?"allowed":f[2].startsWith("ممنوع")?"banned":"conditional";
    return `<article class="food-item"><div class="food-row"><strong>${f[0]}</strong><span class="tag ${cls}">${f[2]}</span></div><p>${f[1]} · ${f[3]}</p></article>`;
  }).join("")||'<p class="muted">لا توجد نتائج مطابقة.</p>';
}
function renderMeals(){
  const day=$("#daySelect").value;
  $("#mealCards").innerHTML=plans[day].map((m,i)=>`<article class="meal-card"><h3>${labels[i]}</h3><p>${m}</p></article>`).join("");
}
function renderWeights(){
  $("#latestWeight").textContent=data.weights.length?data.weights[data.weights.length-1].weight:"95";
  $("#weightHistory").innerHTML=[...data.weights].reverse().map(x=>`<div class="history-row"><span>${x.date}</span><strong>${x.weight} كجم</strong></div>`).join("");
}
function renderAll(){renderTasks();renderFoods();renderMeals();renderWeights();$("#notes").value=data.notes||""}
$$(".tab").forEach(b=>b.addEventListener("click",()=>{
  $$(".tab").forEach(x=>x.classList.toggle("active",x===b));
  $$(".panel").forEach(x=>x.classList.toggle("active",x.id===b.dataset.tab));
}));
$$("[data-task]").forEach(el=>el.addEventListener("change",()=>{
  data.tasks[today]=data.tasks[today]||{};
  data.tasks[today][el.dataset.task]=el.checked;save();renderTasks();
}));
$$(".filter").forEach(b=>b.addEventListener("click",()=>{
  $$(".filter").forEach(x=>x.classList.toggle("active",x===b));renderFoods();
}));
$("#foodSearch").addEventListener("input",renderFoods);
$("#daySelect").addEventListener("change",renderMeals);
$("#todayLabel").textContent=today;
$("#saveWeight").addEventListener("click",()=>{
  const n=Number($("#weightInput").value);
  if(!Number.isFinite(n)||n<30||n>300){$("#backupStatus").textContent="أدخل وزناً صحيحاً بين 30 و300 كجم.";return}
  data.weights.push({date:new Date().toLocaleDateString("ar"),weight:n});
  data.weights=data.weights.slice(-100);save();renderWeights();$("#weightInput").value="";$("#backupStatus").textContent="تم تسجيل الوزن على هذا الجهاز.";
});
$("#saveNotes").addEventListener("click",()=>{data.notes=$("#notes").value;save();$("#backupStatus").textContent="تم حفظ الملاحظات على هذا الجهاز."});
$("#exportData").addEventListener("click",()=>{
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  download(blob,"tayyibat-life-backup.json");$("#backupStatus").textContent="تم تجهيز النسخة الاحتياطية.";
});
$("#importData").addEventListener("change",async e=>{
  const f=e.target.files[0];if(!f)return;
  try{const parsed=JSON.parse(await f.text());if(!parsed||!Array.isArray(parsed.weights))throw new Error();data={...defaultData,...parsed};save();renderAll();$("#backupStatus").textContent="تم استيراد البيانات بنجاح."}
  catch{$("#backupStatus").textContent="تعذر استيراد الملف. تأكد أنه نسخة JSON صالحة."}
  e.target.value="";
});
$("#printReport").addEventListener("click",()=>window.print());
function download(blob,name){const a=document.createElement("a");const u=URL.createObjectURL(blob);a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
renderAll();
if("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("./sw.js").catch(()=>{});

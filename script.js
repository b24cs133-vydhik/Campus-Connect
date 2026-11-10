var Q="Kakatiya Institute of Technology & Science, Hasanparthy, Warangal 506015";
var G="https://www.google.com/maps/";
function gs(t){return G+"search/?api=1&query="+encodeURIComponent(t)}
function gd(){return G+"dir/?api=1&destination="+encodeURIComponent(Q)+"&travelmode=driving"}
var L=[
{id:"b1",n:"Block I",c:"Academic",x:20,y:20,i:["Civil Engineering Department","Dean of Planning & Execution Office"]},
{id:"b2",n:"Block II",c:"Academic",x:200,y:20,i:["Computer Science & Engineering (CSE) Department","Central Library (Ground Floor Wing)","Dean of Research & Development Office"]},
{id:"b3",n:"Block III",c:"Academic",x:380,y:20,i:["Electrical & Electronics Engineering (EEE) Department","Mechanical Engineering Department"]},
{id:"b4",n:"Block IV",c:"Administrative",x:560,y:20,i:["Principal's Office","Dean of Academic Affairs","Examination Branch"],t:"Administrative Block"},
{id:"b5",n:"Block V",c:"Academic",x:20,y:150,i:["Information Technology (IT) Department","Physical Education Facilities"]},
{id:"b6",n:"Block VI",c:"Academic",x:200,y:150,i:["Electronics & Communication Engineering (ECE) Department","Electronics Communication and Instrumentation Engineering (ECIE) Department","Dean of Student Affairs Office"]},
{id:"b7",n:"Block VII",c:"Innovation",x:380,y:150,i:["Innovation, Incubation, Research and Entrepreneurship (I²RE) Hub","AICTE IDEA Lab / Advanced Labs"]},
{id:"ho",n:"Hostels",c:"Hostels",x:560,y:150,i:["Boys Hostel","New Boys Hostel Extensions","Girls Hostel"]},
{id:"st",n:"Indoor Stadium",c:"Sports",x:20,y:280,i:["Central Indoor Sports Stadium"],t:"Central Indoor Sports Stadium"},
{id:"au",n:"Auditorium",c:"Amenities",x:200,y:280,i:["Multi-purpose Auditorium"]},
{id:"gh",n:"Guest House",c:"Amenities",x:380,y:280,i:["Guest House"]},
{id:"dh",n:"Dining Hall",c:"Amenities",x:560,y:280,i:["Boys Dining Hall"]}];
var cats=["All","Academic","Administrative","Innovation","Hostels","Sports","Amenities"],cat="All",sel=null,term="",saved=[];
try{saved=JSON.parse(localStorage.getItem("cc_saved")||"[]")}catch(e){}
function matches(l){var t=term.toLowerCase();if(cat!="All"&&l.c!=cat)return false;if(!t)return true;
return (l.n+" "+(l.t||"")+" "+l.i.join(" ")).toLowerCase().indexOf(t)>-1||(t=="cse"&&/computer/i.test(l.i.join()))||(t=="library"&&/library/i.test(l.i.join()))}
function draw(){
var s="";L.forEach(function(l){var h=(term||cat!="All")&&matches(l);
s+='<g data-id="'+l.id+'" tabindex="0" role="button" aria-label="'+l.n+'"><rect class="blk'+(h?" hit":"")+(sel==l.id?" sel":"")+'" x="'+l.x+'" y="'+l.y+'" width="140" height="110" rx="14"/><text x="'+(l.x+70)+'" y="'+(l.y+50)+'" text-anchor="middle">'+l.n+'</text><text class="s" x="'+(l.x+70)+'" y="'+(l.y+70)+'" text-anchor="middle">'+l.c+(saved.indexOf(l.id)>-1?" ★":"")+'</text></g>'});
s+='<rect x="20" y="405" width="680" height="14" rx="7" fill="var(--bd)"/><text class="s" x="360" y="416" text-anchor="middle">Main road / campus entrance (position unverified)</text>';
var sv=document.getElementById("svg");sv.innerHTML=s;
sv.querySelectorAll("g").forEach(function(g){g.onclick=function(){pick(g.dataset.id)};g.onkeydown=function(e){if(e.key=="Enter")pick(g.dataset.id)}});
document.getElementById("chips").innerHTML=cats.map(function(c){return '<button class="chip'+(c==cat?" on":"")+'" data-c="'+c+'">'+c+'</button>'}).join("");
document.querySelectorAll(".chip").forEach(function(b){b.onclick=function(){cat=b.dataset.c;draw()}});
var m=L.filter(matches);
document.getElementById("list").innerHTML=m.length?m.map(function(l){return '<button class="it'+(sel==l.id?" on":"")+'" data-id="'+l.id+'">'+l.n+(l.t?" · "+l.t:"")+'<small>'+l.i.length+' place'+(l.i.length>1?"s":"")+'</small></button>'}).join(""):'<p class="note">No matches. Try a department name.</p>';
document.querySelectorAll(".it").forEach(function(b){b.onclick=function(){pick(b.dataset.id)}});panel()}
function pick(id){sel=id;draw()}
function panel(){var p=document.getElementById("panel"),l=L.filter(function(x){return x.id==sel})[0];
if(!l){p.innerHTML='<b>Select a location</b><p class="note">Tap a block on the map or choose one from the list to see what is inside and how to reach campus.</p>';return}
var isS=saved.indexOf(l.id)>-1;
p.innerHTML='<span class="pill">'+l.c+'</span><h3 style="margin:8px 0 2px">'+l.n+(l.t?" · "+l.t:"")+'</h3><b style="font-size:13px">Inside</b><ul class="d">'+l.i.map(function(i){return"<li>"+i+"</li>"}).join("")+'</ul>'+
'<p class="note"><span class="pill w2">Coordinates pending</span> Exact GPS for this building isn’t verified yet, so Google Maps links go to the KITSW campus.</p>'+
'<div class="acts"><a class="btn pri" target="_blank" rel="noopener" href="'+gd()+'">Directions to campus</a><a class="btn" target="_blank" rel="noopener" href="'+gs("KITSW "+(l.t||l.i[0])+" Warangal")+'">Search in Google Maps</a><button id="sv">'+(isS?"★ Saved":"☆ Save")+'</button></div>';
document.getElementById("sv").onclick=function(){var k=saved.indexOf(l.id);k>-1?saved.splice(k,1):saved.push(l.id);try{localStorage.setItem("cc_saved",JSON.stringify(saved))}catch(e){}draw()}}
document.getElementById("q").oninput=function(e){term=e.target.value.trim();var m=L.filter(matches);if(term&&m.length==1)sel=m[0].id;draw()};
var rows="";L.forEach(function(l){l.i.forEach(function(i){rows+='<tr><td>'+i+'</td><td>'+l.n+(l.t?" ("+l.t+")":"")+'</td></tr>'})});
document.getElementById("tb").innerHTML=rows;
document.getElementById("dir1").href=gd();document.getElementById("view1").href=gs(Q);
document.getElementById("th").onclick=function(){var r=document.documentElement,d=r.dataset.theme?r.dataset.theme=="dark":matchMedia("(prefers-color-scheme:dark)").matches;r.dataset.theme=d?"light":"dark"};
draw();

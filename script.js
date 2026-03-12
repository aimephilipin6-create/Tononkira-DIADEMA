const songs = {};

/* ----- PAGE NAVIGATION ----- */
function showPage(pageId){
  document.querySelector('.hero').classList.add('blur-active');
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('show'));
  document.getElementById(pageId).classList.add('show');
}

function showTitlePage(){ showPage('titles'); }
function showSongPage(title){
  document.getElementById('songTitle').textContent=title;
  document.getElementById('songLyrics').textContent=songs[title]||"Tononkira mbola tsy misy.";
  showPage('songContent');
}

function backToHome(){
  document.querySelector('.hero').classList.remove('blur-active');
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('show'));
}

function backToTitles(){ showPage('titles'); }

/* ----- SEARCH TITLES ----- */
function filterTitles(){
  const input=document.getElementById('searchTitle').value.toUpperCase();
  Array.from(document.getElementById('titleButtons').getElementsByTagName('button'))
    .forEach(b=>b.style.display=b.innerText.toUpperCase().includes(input)?"":"none");
}

/* ----- NOTES SYSTEM ----- */
let editingIndex = null;

function saveNote() {
    const titleInput = document.getElementById("noteTitle");
    const textInput = document.getElementById("noteText");

    const title = titleInput.value.trim();
    const text = textInput.value.trim();

    if (!title || !text) { alert("Fenoy ny titre sy ny texte"); return; }

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    if (editingIndex !== null){
        notes[editingIndex] = { title, text };
        editingIndex = null;
    } else {
        notes.push({ title, text });
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    titleInput.value = "";
    textInput.value = "";
    displayNotes();
}

function displayNotes(){
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = "";

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach((note,index)=>{
        const div = document.createElement("div");
        div.className = "note-item";
        div.innerHTML = `
            <strong>${note.title}</strong>
            <p>${note.text}</p>
            <div class="note-menu" onclick="toggleMenu(${index})">⋮</div>
            <div class="menu-options" id="menu-${index}">
                <button onclick="editNote(${index})">Modifier</button>
                <button onclick="deleteNote(${index})">Supprimer</button>
            </div>
        `;
        notesList.appendChild(div);
    });
}

function toggleMenu(index){
    const menu = document.getElementById(`menu-${index}`);
    const isVisible = menu.style.display==="block";
    document.querySelectorAll(".menu-options").forEach(m=>m.style.display="none");
    menu.style.display = isVisible?"none":"block";
}

function editNote(index){
    let notes = JSON.parse(localStorage.getItem("notes"));
    document.getElementById("noteTitle").value=notes[index].title;
    document.getElementById("noteText").value=notes[index].text;
    editingIndex=index;
    document.getElementById(`menu-${index}`).style.display="none";
}

function deleteNote(index){
    if(!confirm("Hamafa ity note ity ve ianao?")) return;
    let notes=JSON.parse(localStorage.getItem("notes"));
    notes.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notes));
    displayNotes();
}

/* ----- GALLERY ----- */
window.addEventListener("DOMContentLoaded",()=>{
    const gallery=document.getElementById("selectedPhotos");
    const totalPhotos=186;

    for(let i=1;i<=totalPhotos;i++){
        const img=document.createElement("img");
        img.src=`photos/photo${i}.jpg`;
        img.alt=`Photo ${i}`;
        img.style.objectFit="cover";
        img.style.imageRendering="auto";
        img.onclick = ()=> openPhotoViewer(img.src);
        gallery.appendChild(img);
    }
});

/* ----- PHOTO VIEWER ----- */
function openPhotoViewer(src){
    document.getElementById("photoSingle").src=src;
    showPage("photoViewer");
}

function backToGallery(){
    showPage("photos");
}

/* ----- HERO IMAGE POSITIONABLE ----- */
function setHeroImage(src, top='0', left='0'){
    const heroImg = document.querySelector('.hero img.solfege-img');
    heroImg.src=src;
    heroImg.style.top=top;
    heroImg.style.left=left;
}
// Lisitry ny titre rehetra
const songTitles = [
  "Aiza?", "Anao ny dera", "Andeha re", "Andeha isika", "Andriamanitra fitiavana",
  "Antso", "Aza manda", "Averiko", "Akory aby","Dada","Dimy adala", "Dobodoboka Fiderana","Ela ty ela",
  "Fahefana", "Falifaly","Falifaly2","Fa toy izao", "Feo mamanton'alina", "Filamana fitia", "Fitia", "Fitia Agape",
  "Fitiavan'Andriamanitra", "Gasy mila vonjy", "Générique 1.0", "Générique 2.0", "Générique Xms",
  "Glory to the lord", "Hadinina","Hasambarana", "Ho anao", "Ho iray", "Hoy ianao", "Ia re", "Ilay fahefana",
  "Indraidray", "Ireo talenta", "Izy no Mpanjaka", "Jesosy ampandomba", "Jesosy irery ihany",
  "Rambeso Jesosy", "Mahareta", "Mahery noho ny mahery", "Maty Kristy", "mba mamindra fo",
  "Mba ho iray", "Misaotra anao", "Mitsangana", "Mila Anao", "Mitaray tany","Mikaiky anao Jeso", "Nijaly Ianao",
  "Noely izay", "Ny finoako", "Ny fitiavana mahery", "Ny hirako", "Omeo finoana", "Sambatra",
  "Sao very maina", "Tano mafy", "Tanora ô", "Talilio", "Telo izay Iray",
  "Tsaroko fa manana hery aho", "Tsa soa ny manan-droa", "Veloma", "Zanaharinay"
];

// Raha tsy mbola manana tononkira, apetraho default
songTitles.forEach(title => {
  songs[title] = "Tononkira mbola tsy misy.";
});

// Mamorona boutons ho an'ny titre
const titleButtonsDiv = document.getElementById("titleButtons");
songTitles.forEach(title => {
  const btn = document.createElement("button");
  btn.textContent = title;
  btn.onclick = () => showSongPage(title);
  titleButtonsDiv.appendChild(btn);
});
// Ohatra:
songs["Ela ty ela"]=`
Afaka amin'ity hagadra
Afaka amin'ity havoa nahazo (zahay e)
Afake hagnano Zao
Tsisy raha mangedregedre
Choeur: Aouap

1e V:Ela Ty ela
Afaka amin'ity hagadra
Afaka amin'ity havoa nahazo
Afake hagnano Zao
Tsisy raha mangedregedre

2e V
: Jesosy aveo ro hazo manga
Hazo manga soa
Le ifaharo iha fa soa biby

3e V:
Magnao mahavelo agnao
Zahay ndrenagnahary
Fa novotoranao Ty helokay

4e V: Ingo fa velo Jeso Tomponao
Leheroa ka magnitrà
Iha koa fa avotsa`
songs["Jesosy irery ihany"]=`
Izy nanolontena hamonjy antsika eh
hanafaka ireo gadra any anaty
Izy 'lay Kapiteny andrasantsika eh
hanaingy ho any an-danitra amin'izay aho

Izy no Dokotera tao antanana eh
fa na ny efa maty aza dia natsangany ihany 

solo: Moramora ikoranako azy(2)

`
songs ["Mikaiky anao Jeso"]=`
1.Babakô variana loatra, 
mifohaza ndreka arô 
Ndao ry Kaky el mekameka el 
Fo ny ditra tafahoatra ajanony ndreka arô 
Ndao hitory, Baiboly.

Zoky, zandry (iaby)2 e ! 
Mbô mikaike anao Jesô 
Ndao zalahy, ndao viavy el 
Mbô mikaike anao Jesô 
Hanarombaka fiaina, 
tsara vaovao Mitongava mekameka, 
tsy ho neninao.

2. Endrika matoritory e
mifohaza ndreka ary 
Ndao re Endry e I mekameka e! 
Tsy nivavaka ela loatra, 
mitongava ndreka arô 
Sika jiaby el hibebaka e!`

songs ["Dada"]=`
Dada ô
Toloranay fisaorana
Dada ô
Fa mendrika izany ianao
Raha tsy hiteny afatsy hoe
Ireo hanatranatrao
Dia fitiavan- dehibe natolotrao
Ho ahy
Tiako ianao, tiako ianao
Olon-tokana
Tsy azoko soloina

Tiako i Dada
Na manaona fiainany
Na ratsy izy na tsara
Ilaiko ny fisiany
Tiako i Dada
Fa Anton'ny fisiako
Mivavaka no anjara
Raha Mbola zanaka Manoa

Dada ô
Hifonan'isanandro izao
Dada ô
Ireo nampalahelo anao
Ireo bedibedinao
Nohon'ny ditrako
Hay namampalahelo anao sy nankarary fo
Enganie, enganie
Andriamanitra, hitatana ny fiainanao`

songs["Falifaly2"]=`
Ouh!! (x12)

Solo:
Hirahira am-pifalian' indray
No atolotra ho anareo
Ouh (x5)
Fa ny hikam-pijaliana
No efa resy teo
Ouh(x5)
Hihira am-pifaliana
Ch:Hallelujah
Hirahira am-piderana
Ch:Hallelujah

Ref:
Faly fa afaka
Ch:Falifaly e
Ny gadra tapaka
Ch: efa rava
Jesô mpanjakanay
Ch: looooo no nomenanay
Ouh! (x12)`
songs["Rambeso Jesosy"]=`
Anô havako ô... Anô longoko ô.... 
Anio e! e! Molia Anô ô !! 
Falio e ! e! Filio Jesosy eh!! 
Rambeso Jesosy Ka mivimbio koa 
Rambeso Jesosy Ka manamafy loha 
Rambeso... 
Izay lasa dia lasa taloha Rambeso... 
Izay Tonga ao dia olom-baovao

Efa sasatra miasà manadigna fanahy ka 
Toa biby nani-bato, ka tapitra dia hale

Fitoriana ihany, an-Kira ny anay 
Ho filasantsora eh Miankina 
Aminao ny mandray (n'a tsia) 
Tena misy fitsarana`

songs["Fa toy izao"]=`
Fitiavana tsy misy toy izao
Atolotra ho ahy sy ho anao 
Izy Andriamanitra 
Nefa tonga olona 
Mba ho famonjen'izao tontolo izao 
Fitiavana tsy Mila taminy 
Fiainana mandrakizay doriia 
Zay rehetra mino Azy 
Tsy ho very sanatria 
Hanam-piainana mandrakizay doria

Ref:

Fa toy izao tokoa fa toy izao 
No nitiavan'Andriamanitra 
Izao tontolo izao (zao tontolo izao) 
Nomeny ilay Jeső Kristy Mpanjaka 
Lahy tokany Mba tsy hisy very ireo zay mino azy (zay mino azy)

Miambena miomana dieny izao 
Hitsena ilay Mpanjaka ho anao 
Aoka hibebahana Ilay fo tsy mendrika 
Mba ho tonga fo madio sy vaovao 
Ny TENIN'ANDRIAMANITRA ihany 
No hantateraka izany 
Zay rehetra mino 
Azy Tsy ho very sanatria 
Hanam-piainana Mandrakizay doria`

songs["Hasambarana"] =`
Misy hasambarana ao anaty
Misy hafanana tsy mba maty
Misy fitsikiana ao anatin'ny fo
Misy hafaliana be tokoa
Misy fahatsapana fa mpandresy
Misy fiadanana tsy lefy
Misy haravoana ao anaty ny fo
Misy herintsaina tsy manahy

Ref:
Reny rehetr'ireny noho lanao e
Ry Jesosy Tompo lehibe
Zany rehetra izany dia fitia e
Ka mampifaly ny mino rehetra ety
Reny rehetr'ireny anie no misy
Noho ny fahatongavanao tety
Ka ny dera sy ny laza
No hasandrato hanako ho doria (1 er V)
No hasandrato izao ho doria (2e,3e V)`
songs["Glory to the lord"] =` Fa toy izao (no nitiavana)2 Oo!
nitiavan'Andriamanitra Ray zao tontolo
tontolo izao Nomeny ny Zanany, Lahitokana

mba tsy ho very izay rehetra ety 
zay rehetra, rehetra mino Azy
Fa hanana ny fiainana doria 
Fiainana mandrakizay doria 
Ho doria

zay no hiderako Anao 
Hiraiko hoe: 
Glory to the Lord Glory to the Lord
to the lord
Glory to the lord`

songs["Générique 1.0"] =`Ny fahasoavan'Andriamanitra
No mbola nahatoy izao anay
Ny Anarany no asadratray
omaly anio ary ho mandrakizay

V: Ny fahasoavan'Andriamanitra
no mbola naha toy izao anay
Ny fahasoavan'Andriamanitra
no mbola nahatoy izao anay
ny Anarany no andeha ho asandratray
fa izy no tompon'ny zava-drehetra `
songs["Générique 2.0"] =`Anao, Anao
no anton'izao fiderana izao eh
Deraina, Deraina
Fa mendrik'izany Ianao

Lako loatra ty fitiavanao ahy
Lako loatra ty rah natolotrao ahy

solo: Hidera Anao aho
hanompo Anao aho
Hianao irery ihany eh

solo: Lafatra loatra .....
`
songs["Générique Xms"] =`Hosana any an-danitra any
Hosana any an'Abo any

Teraka izao ny famonjena
Navy eto oh Navy Imanoela`
songs["Akory aby"] =`solo:Akory iaby ny ona......
ch: Akory iaby ny ona
akory eh
Akory iaby ny ona 
akory eh

akory aby ny ona(2)

solo: Ahia iaby ny ona....
ch: Ahia iaby ny ona
ahia eh

Ahia iaby ny ona (2)`

songs["Aiza?"] = `
Aiza? lay hafanana teo nangatsiaka 
Nandevy vetivety dia tsy hita 
nandroatra kely monja dia efa ritra,fa... 
Aiza a?ianao ilay niseo fa mahavita 
Nazoto tamin'ny ora sy minitra 
Nanjary mpitsikera foana sisa

Refrain:
Mitady tany malemy, 
asiam-pangady ianao 
Mitady rano marivo, 
idirana Toa tsy maharitra, 
tsy afa-miaritra 
Mitady faritra, mafinaritra

2
Aiza, inao nilokaloka fa hitory? 
Kanefa toa tsy tazana eny intsony 
Ianao tsy resy lahatra akory, Fa... 
Aiza, ianao ilay sakaizam-baiboly 
Toa azo midoroboka irony 
Mandrobona kanefa tsisy voany

3

Aiza? Ianao tsy noterena fa safidy 
Kanefa rehefa tonga ny mangidy 
Nilaozanao mandositra adidy, fa... 
Aiza? Ilay toetra tsara taminao fahiny 
Toa tsy hitako eny intsony ankehitriny 
Angamba namboamboarina izy iny`;

songs["Anao ny dera"] = `
Anao ny dera sy ny voninahitra
Andriamanitra Tompo mpanjaka tsioha
Tompon'izao rehetra izao

Anao ny fanjakana sy ny hery
Ny haleloia hosana no hiraiko
Ho anao mandrakizay

Tsy misy ambony noho Ianao
Eo amin'izao tontolo izao
Ny famonjena vitanao
No ilazako ihany koa fa mbola hafa Ianao

Anao ny vonjy sy ny fiadanana
Ry mpanota mahantra sy rerakaam-po
Famonjena tsisy ohatr'izao

Ho ety an-tany anie ny fahasambarana
Ho an'izay mino sy izay mahatoky
Ary ankahasitrahany

Fitia tsy misy toy izao
Ho an'izao tontolo izao
Fiainana mandrakizay
Hatramin'izao anio izao
Ka tonga hatrany an-danitra`;

songs["Andeha re"] = `
Andeha re hozakaina
Raha ny azo fijaliana
No misakana hahazon'ilay
Fonenana tsy maba vidiana

Tsy aleo ve dieny ety tokoa
No miharitra ny zava-manjo
Toy izay rehefa ao an-dapn-dRay
Vao ho lavina mandrakizay

Refrain:
Andrandrao (X2), ao efa vonona ho ahy
Ary koa ho anao
O! avia re! (X2) toa mijere

Sambatra izay tafiditra ao
Andeha re horesena
Raha toa ka ny fakam-panahy
No jadona izay manakana

Tsy handovana izay manakana
Zay hambarany efa lapan'ny Ray
Voafantina sy voafidy
Tsara saina mahay misafidy`;

songs["Andeha isika"] =`
Andeha isika hiara-hanandram-peo 
Ka hidera ny mpanavotra 
Fifaliam-be hasamaram-be 
Ny voninahitra ho amin'ny avo 
Fiadanana ho ety

Na na na na na na...
Reo izay manan'aina 
Aza mba malaina 
Tongava mba midera
Aza miandry ela
(fa) Mendrika ho deraina

Aza ataonao mmahazatra 
Isan'ora isan'andro ny midera ilay tsitoha 
Ka meteza mba hitraka, ka hihira, 
Sy hidera tena avy ao am-po tokoa

Ka diniho ny tenanao 
Saino aloha ny atao 
Mba hiraisan-tsika 
izao Na na na na na na...`

songs["Andriamanitra fitiavana"]=`Andriamanitra fitiavana

Andriamanitra fitiavana, 
ianao no hoe mampiray 
Ary koa mampihavana ireo havan_tiana X2 
Nefa ny fiainana tsy mora, 
Sarotra koa izany dia 
Koa ampio ireo tanora, 
mba haharitra doria (X2)
Raha sendra ka mivena

Fa ho resim_palemena
Dia omeo fahendrena
Mba hahay hanarin-tena
(Tahio e!)X2 Zanahary
{Na finaritra ireo na marary 
Arovy ireo hatrany hatrany 
Fa malama anie ny tany o! )X2

Raha sendra fifaliana
Aza avela ho variana
Raha tojo fahoriana
Tsy ho diso fanampiana

(Tahio e!)X2 Zanahary
Na finaritra ireo na marary
Arovy ireo hatrany hatrany
Fa malama anie ny tany ol`

songs["Antso"]=`
Ianao izay mbola mandre ny antso
Andao, fa sao dia vidina lafo
Aza variana mangataka andro lava izao
Ario ny ratsy fanao rehetra
Anio, Jesosy no aok'itoetra
Fidio ny tsara sao avy ny fetra
Ka anjoretra

Fiaina_mikorotana ambony sy ambany
Dia mbola tsy taitra ianao
Habibiana efa tsy hita lazaina intsony
Dia mbola tsy taitra ianao
Ray sy Reny,zoky, zandry feno lonilony
Dia mbola tsy taitra ianao
Libaliba, jangajanga,taoka, rongony
Dia mbola tsy taitra ianao
Hafatr'izay, fitoriana ny anay
Asanao raha handray, ho avy izay fotoana izay

Fa'zao mbola misy ny fotoana
Dia aoka mba hiova fa...
Ho avy ny farany
Izao mbola misy ny fotoana
Dia aoka mba hiova famindra fa
Efa tsy fantatrao, dieny izao
Dieny izao, miomana izao sy ianao`

songs["Averiko"]=`
Averiko eto indray, 
ilay teniko hatr 'izay
Hanompo anao ry Ray

Averiko eto indray,
na hisy hanafay
Anao aho o ry Ray

Toriko eto indray,
ny afom-pitiavako anao
Toriko eto indray, 
ilay voadiko hatr'izay

Hanompo anao doria, 
tsy hiala aho sanatria 
Na sarotra ny dia

Refrain:
larahanay mihira,
hiran'ny fitiavana anao 
Hiraisanay satria, 
hiray saina ho anao 

Hatambatray androany,
ny herin'ny Diadema 
Hitory anao hatrany,
hanao ny asam-pamonjena

Averiko eto indray, 
ilay teniko hatr'izay 
Hanompo anao ry Ray
Averiko eto indray,na hisy hanafay
Anao aho o ry Ray`

songs["Aza manda"]=`
Oh! aza manda
Aza manda oio
Aza manda

Oh! ingo Jeso
Jesosy be hatea
Ingo Jeso

Ingo Jeso hanarombake anao
Ne hatea ni
Ni zotsoany
Ny zotsoany Jesosy bakao

Ingo Jeso be hatea
Be hatea, be hatea
Avy anarombake

Be hatea, be hatea
Mahavelo, Ray nandria
Ingo Jeso hazo mangasoa tokoa
`
songs["Dimy adala"]=`
Izao andro izao
Andro maha rendremana
Sao matory ianao
Nefa andro fiambenana

Toa tsy mamanala
Nefa tsy mafana ianao
Toa ireo dimy adala
Tsy mahalala izay atao

Refrain:
(Miambena ianao) X2 
Sao ritra ny solika 
Isan'andro izao,isan'alina 
Aza sondrian-tory (izao)X2 ianao`

songs["Fahefana"]=`
Ilazao ny ao an-tanana
Fa misy fahagagana
Mbola tsy hitanao tety

Ilazao 'reo havan-tiana
Teneno mba hangina @tomaniny

Ilazao ireo namanao
Variana milalao
Tsy mahalala vaovao

Ilazao ireo mpitondra fanjakana
F'efa hita izao 'lay fahefana

Velon'Izy, tsy nahatazon Azy
Ny fasana aky, fa resiny
Jeso Kristy, naneho ny asa sy fahefany
Velon'Izy, tsy nisy nahasakana
Ny heriny sy tanjany
(Velon'Izy)X2, noho ilay fahefany

Iza indray no tsy ho faly,fa velon'Izy
'Reo toloko sy ny jaly nahafahany
'Reo rehetra efa maty sy mbola hody
Dia ho velona indray tsy ho faty intsony`

songs["Falifaly"]=`
Falifaly ery ny foko
Mandre ny feonao
Milaza fiainana
Fiainam-baovao

Fa ny sento sy toloko
Misinda avokoa
Mitoetra ao am-po
Ilay fitiavana

Refrain:
Fa toy izao
Toy izao no nitiavana
Nitiavan'ilay ray
Nomeny ny zanany
Hamonjy antsika ety`

songs["Feo mamanton'alina"]=`
1
Indray ny feo mamanton'alina 
Milaza fifaliana lehibe, 
fiadanana Ho an'izay rehetra mino ety

Refrain
Fa ny tontolo renoka tokga 
sondrian-tory tamin'ny alina 
Kankie samy taitra avokoa 
Nandre ny feo mamanton'alina

2
indray ny feo mamanton'alina
Anjely maro no mihira hoe haleloia
hosana ho amin'ny avo indrindra
`
songs["Filamana fitia"]=`
Ny fitiavana, izy mampihavana
Eny kanto loatra ny miara-dia
Ao amin'ny Jesoa Kristy
Ny firaisana, izy mampiadana
Hafa noho ny hafa raha ny fitia
Avy amin'i Jesoa Kristy

Firaisn-kina e, io no filamatra
Fa mampirindra e, izay atao
O! mifalia e, Jesoa no mampiray
Hiara-dia e, mandrakizay
Jesoa no nanolotra ny ainy tety
Izy nampianatra antsika filamatra fitia

Feo voalohany

Firaisan-kina e, io no filamatra

Feo faharoa

Firaisan-kina e, io no filamatra
`
songs["Fitia"]=`
Fitia,fitia tsy misy toy izao
Nomena ho ahy sy ho anao
Sy izao tontolo izao
Satria Kristy efa natolotra
Natao ho sorona
Ho fanavotana

Lehilahy:
Fa toy izao tokoa
No nitiavana, nitiavan'Andriamanitra
Izao tontolo izao

Vehivavy
Nomeny ny zanany
Lahy tokana
Mba tsy ho very izay
Rehetra mino azy

Fa hanana fiainana mandrakizay 
Fiainana mandrakizay doria
`
songs["Fitia Agape"]=`
1
Ataoko an-kira isan'andro 
Ho velona ao anatiko 
Ka na ny alina na andro 
Ho ranovelona ao am-po 
Ka n'inon'inona fotoana, 
Tsy mety afaka ao an-doha 
Satria fitiavana tsy ho foana 
Ataon'ny Tompo Ray Tsitoha

Refrain:
Fitiavana io ka fitiavana
Fitiavan Andriamanitra
Nomena ho ahy sy ho anao
Sy izao tontolo izao
D'ireo izay mino azy
Fa hanana ny fiainana
Fiainana ho mandrakizay
Omena ho ahy sy ho anao
Sy izao tontolo izao
Ilay fitia AGAPE

2
Ataoko an-kira isan'andro Ireo teny maminy
 Ka isan'ora, isan'andro 
Mba hiresahako Aminy
Ka n'inon'inona hitranga
Tsy misy hankarary fo
Fa ny fanahiny no momba
Fanahy Masina tokoa`

songs["Fitiavan'Andriamanitra"]=`
Tsisy ho toy izao
Raha tsy nisy fitiavana
Fitiavan'Andriamanitra
Izao tontolo izao

Na mana-tanjaka
Na ambony fahalalana
Samy tsisy ho afaka toy izao
Raha tsy teo ilay fitiavana

Na mana-karena
Na ny tsy manana
Samy tsisy ho afaka toy izao
Raha tsy teo ilay fitiavana
Inona ary izao

1
No mba havaliko ano
Ny soa rehetra nataonao tety
Ny tenako no atolotro anao

2
Ianao koa izao
Aza mitoetra foana
Mandraisa anjara hiasa koa
Hanolo-tena izao
`
songs["Hadinina"]=`
Reo navotana,
hidiran-doza raha tsy mitory
Fa hadinina

n'aiza n'aiza no aleha 
n'inon'inona ataonao
Hadinina, hadinina

Reo nomena feo
Hidiran-doza raha tsy mihira
Fa hadinina

n'aiza n'aiza no aleha 
n'inon'inona ataonao
hadinina hadinina

Refrain:
Izay rehetra, nomena anao
N'inon'inona, ampiasao
Misy fetra,izao rehetra izao
Omeo Ampiasao

Izay manana talenta
Omeo azy
Na ny vola sy harena
Omeo azy
Aza asina ahiahy
Omeo azy
Ka ny tena sy fanahy
Omeo azy
`
songs["Ho anao"]=`
1
Ho anao,ho anao ity hira ity 
Ho anao, ho anao ry Tomponay o 
Ka ny feonay izao entinay midera anao 
Vokatry ny hafaliana ao aminay

Refrain
Ho anao (ho anao) 
ho anao (ho anao) 
Ho anao ity hira ity

2
Ianao, ianao andry sy tokinay Ianao, 
ianao ry Tomponay o! 
Fiadananay sy fifalianay 
Ka ny hira ho anao no asandratray

3
Izahay rehetra izao ravoravo am-po 
Hankalaza anao ry Tomponay o! 
Haleloia Hosana, Haleloia Hosana 
Hiran-danitra mafinaritra
`
songs["Mba ho iray"]=`
Mba ho iray izao tontolo izao
Mba ho iray izao sy ianao
Mba ho iray ny fiangonana
Dia Jeso no mampiray

Mba ho iray ny firazanana
Mba ho iray ny volon-koditra
Mba ho iray ny fivavahana
Dia Jeso no mampiray

Dia Jeso no na na na....
`
songs["Hoy ianao"]=`
Efa leo ianao raha ilazako vaovao
Efa mankalao, hoy ianao,an....
Isan'andro izao, efa reko hoy ianao Efa mahazatra, hoy ianao

Oop a!
O! oop an!

Efa leo ianao...
(Hoy ianao, oop,nanananana)X4

Nefa lazaiko anao 
Na tsy hino aza ianao 
Ny ora sy fotoana
Tsy hiandry anao an...
Iza no hasakana
Ny fitsaran'ny lanitra
Ho avy Jeso eny @lanitra

Miomana ianao, fa sao hanenina 
Dieny izao, fa sao hanenina
`
songs["la re"]=`
Tsy misy atakaloko 
Izay olona anankiray izay 
Efa nalaza teto hatramin'izay 
Izy no nahavita an'izay 
Tsy vitan'ireo mahay 
Izy no ilay mahery mandrakizay

Ia re! maba lazaoe!
Ia re! mba lazao anayzaka torogny soa

Andraso ndraika moa 
Hilazako azy anareo o! 
Izy tsy hoe apelan'ny betsileo 
Izy tsa hoe minisitra 
Tsa mba mera na deputé 
Kanefa dia tena ilo malaza be

Eny re! efa fantatray e!
Eny re efa fantatray fa Jesosy izay.
`
songs["lay fahefana"]=`
1
Miaramila mpiambina nandositra tsy tana 
Horohoron-tany mafy tena nigagana 
Fa nitsangana, velon'izy ka nitsangana 
Efa voadika teo ilay varavaram-bato 
Raiki-tahotra ny miaramilan'ny Pilato 
Fa nitsangana, velon'izy ka nitsangana

Ry fasana o fahavalo resy ianao 
Ry fasana of aiza ny herinao 
Jesosy no santatry ny mandrakizay 
Jesosy no antoky ny mandrakizay

2
Fasana tsy mihidy intsony fa midanadana 
Izay vao nikoropaka ireo tao an-tanana 
Fa nitsangana, velon'izy ka nitsangana 
Ireo Andriambavilanítra aza tena gina 
Lamba namonosana ny razana no sisa 
Fa nitsangana, velon'izy ka nitsangana
`
songs["Indraidray"]=`
Indraindray tsy takatry ny saina 
Mahafay toa ratsy ny mianina 
Nefa injay miferiferin aina 
Mahatrotraka ny aina

Indraindray toa kivy sy malaina
Very indray ilay nantenaina
Ary izay no Mahavery saina
Maizin-kitroka marana
Ny finoana tsy maintsy sedraina

Hay va re! Ka fitiavana izany
Hay va re! Izy ireo fitsapana 
Fa isika no adala
Fa izao no variana mitomany

Hay Jesosy no mpiandry tsara

Feo faha efatra:
Mitrakà fa aza mitomany 
Mitrakà fa fiainana izany 
Ireny rehetra ireny dia Jesosy miteny 
Indraindray dia fiantsoana 
Hanatanjaka Finoana 

Hay Jesosy tompo tena tia Isika no be siasia
`
songs["Ireo talenta"]=`
Ireo talenta anananao
Raha toa nalevina
Dia asorina aminao tokoa
Raha mbola mafy loha

Ireo talenta sarobidy
Tsy misy vidiny
Ary tsy mba mahasoa tokoa
Raha tsy miasa sy mamoa

vola sy fahaizana
tena sy fanana
saina tena sy fanahy anie

samy tsy fananao
fa natolotra ho anao
Andriamanitra no manome

Ka isan'adro isan'ora
Aoka ho fantatrao
Fa tsy ho vita moramora
Ny fitsarana anao

Raha toa ka ny asan'i satana
No andaniana
Ireo tanlenta izay nomena
Nampindramina anao
`
songs["Izy no Mpanjaka"]=`
Andriamanitra o!
Ray be faminndram-po
Ny tany rehetra anie midera nanao
Ny voninahitrao
Ny herinao tsitoha
Ty misy fetrany
Fa maharitra mandrakizay doria

Miderà ka mihira ny fihirana vaovao
Asandrato re ny feo
Haleloia hõsana ho anao
Ry Tompo sy Mpanjaka
"Haleloia hôsana ho anao
Ry Tompo sy Mpanjaka"
Mahagaga lehibe ny asany

{Fa lehibe
lehibe ny asany }X3
(Maharitra
Mandrakizay doria)X2
Ha.... Jeloia Izy no Mpajaka
`
songs["Jesosy ampandomba"]=`
Velona e! Jesosy 
Tomponay ampandomba 
Ka mandrongy anao'zahay 
Nanome anay fahasoavana soa biby 
Avotra ny fanolikay

Mitsinjaka manitra eo lahy
Ingo Jeso avy ho anao
Nandaiay soasoa sy vao
Ho manao noho sy longonao
`
songs["Mahareta"]=`
O! tonga indray ity 
Ny andro hatsiarovana 
Fa boboka sy vovoka 
Ny manan'aina mpanota 
Raha tsisy ny famonjena

O!isan'andro izao 
Mahatsiaro izany ve? 
Ireo voavonjy marobe 
Sa variana fotsiny e! 
Fa vita ny famonjena

Izao fiainana izao miharatsy 
Miovaova ny tany tsisy antenaina 
Mahavery saina 
Indrindra ireo heverina 
Fa tena efa manana ny fahazavana 
Toa mahalasa saina izy ity 
Ahoana ity fiainana ity ?
fiainan'ny mpino 
Izao no ambarako anao 
Izao no lazaiko anao izao!

Teny tsotra iany
Miomana f'efa akaiky ny farany
Teny tsotra iany Miambena fefa akaiky Jesosy
Teny tsotra iany
Mivavaha k'aza mba mitrahatra
Teny tsotra iany
Mahareta amin'ny finoana
`
songs["Mahery noho ny mahery"]=`
Jeso Tompo no ho deraina 
Jeso Tompo no ho lalaina 
Fa mahery noho ny mahery 

Tsy mandà izay miantso azy 
Fa mizara ny soa tsy lany 
Lay mahery noho ny mahery

refrain:
Tsy mba mety lany ny fitiavany
Miely eran_tany ny lazany
Raiso mba ho Tompon'ny fiainanao
Ifikiro fa tsy sandoka

Jeso Tompo no ho hiraina 
Manome izay mitaraina 
Fa mahery noho ny mahery 
Tsy mifidy an'iza n'za 
Fa mihaino mandrakariva 
Lay mahery noho ny mahery

Jeso Tompo no nde hajaina 
F'izy iany no tena ilaina 
Fa mahery noho ny mahery 
Nisolo heloka tsy antery 
Hanavotra ireo very
`
songs["Maty Kristy"]=`
Maty Jeso Kristy
Maty maty niaritra ny mafy
Latsaka ny ràny

Maty tao Kalvary
Tsy mba misy fitia
Toy ny azy

Ny ainy mihitsy
No nataony sorona ho anao

Ho anao
Eny ho anao sy ho ahy
Eny ho ahy sy ho anao
Ianao no antony
Dia tsy ho taitra foana ve ianao
`
songs["Mba mamindrà fo"]=`
Omeo fo mahay mitia (Jeso)
Omeo fo mahay midera anao

Toroy ny fo vatoko
Mba mamindrà fo
Ry Jesosiko

Refrain
O! ohm...! a. a a...an!
O! ohm o...! o.o...ohm
ohm!

Omeo fo mandefitra (Jeso)
Omeo fo mahay mihira

Vonoy fialonako
Mba mamindrà fo
Ry Jesosiko
`
songs["Misaotra anao"]=`
Misaotra izahay
Mbola velon'aina toy'zao
Afaka midera anao
Manandra-peo ka miara-mihira
Tsy nisainao ny helokay fa mamindra fo ianao
Misaotra anao be dia be ry Ray

Nomenao Mesia nisolo helokay ety
Satria tianao ny handova 'lay paradisa vaovao
Nomenao Mesia nisolo helokay ety
Satria tianao ny handova lanitra

Refrain
Sambatra ny fo mandray Anao
Miramirana to vaovao
Velombelona, finaritra
Tsy mba mahatsiaro vizana
Na torovana sy sasatra
Tena velona finaritra
`
songs["Mitsangana"]=`
O!.....Mitsangana
Ka..... Mandehana
Ee!....Ndao hihira
Nanana nanana nanana
Ndao hidera

Ario aloha ny tahotra 
ka aza miahotrahotra fa avia 
Ny famonjena efa azo 
k' aza misy mihazohazo avia 

Hirao indray t.d:-,r's
Feo maromaro natambatra ho hira iaraha-manao
Ataoko indray td:-r's
Feo fiderana sy fankalazana
Fa afaka aho
`
songs["Mila anao"]=`
An! An!
Sororo tsotso! Dam
Oh! oh ho ho
Shalalala tsoro! Dam

Mila anao aho
Eny mila anao
Anao Jeso
Anao efa tia talo

Mila anao!
Mila anao!
Mila anao!
Mila anao!
`
songs["Nijaly Ianao"]=`
Nijaly mafy tokoa 
Ianao ry Mpanjaka soa 
Nangirifiry koa 
nisedra fampijaliana fa...

Nefa ianao tsy nandà
Nanaiky alatsa-drà
Ny ranao nipatrapatraka tamin'izay
Nijaly ianao

Eny mafy ny japin'ny karavasy
Izay nampivaditra2 Anao 
Ka zary ho takaitra mandra-maty
Mefa ianao tsy nanda...

Niafiafy ery ianao tao kalvary 
Nitondra mangidy koa
Nampiarana habibiana fa...

Nefa ianao tsy nanda...
Satro-tsilo eo an-doha sy tanana aman-tongotra 
Nofatsihana tambonin'ny hazo fijaliana
Nefa ianao tsy nanda...
`
songs["Noely izay"]=`
Isika izao, na dia maro
Dia tena iray ihany
Eo anatrehan'i Jesosy

Koa andeha hiray feo
Raha mbola eto an-tany
Indrindra moa amin'ny andro anio

Fety fampiraisana
Ny nahaterahan'i Kristy
Fanehoam-pitiavana
Toy izay vitany

Noely izay
Ho ahy sy ho anao
Noely izay
Ho an'ny tsara sy ny ratsy fanahy

Noely izay
Ho ahy sy ho anao
Fitiavana avy amin'ilay Andriamanitra
Noely izay
`
songs["Ny finoako"]=`
Na misy ny fahasarotana
Na misy ny mikorotana
Tsy misy ny mahaketraka fa fiainana izany

Na misy ny fifandonana
Na misy ny fialonana
Tsy misy ny mahaketraka fa fiainana izany

Ny finoako tsy miova (TSY miova)X2
Dia Jesosy izay
Ny fioako tsy miova (TSY miova)X2
Ho mandrakizay

Na iza no hanozongozona mafy amin'ny asan'ilay satana
Mandroso aho fa tsy mba ho naman'ny mihemotra

Na misy ny fifandirana
Na misy ny manahirana
Tsy misy ny mapihemotra fa mandroso ihany

Na misy ny fandrabiana
Na misy ny mpanakiana
Tsy misy ny mampihemotra fa mandroso ihany
`
songs["Ny fitiavana mahery"]=`
Mangorohoro ny fanahy
Refinjay ka misaina 
Ilay fitiavanao ry Ray 
Tsy ho haiko tanisaina

Andriamanitra mahery
Tsy mamela ho irery
Fa mampiposaka masoandro
Ho an'ny tsara sy ny ratsy
Fanambinana isan'andro
Efa raisina hatrany

Tsy mahay mitia be faniasia
Ratsy saina izahay ety
Kanefa he ny fitahiana
Fa toy ny rano mikoriana

Tsy haiko intsony ny miteny 
Ilay fitiavanao mahery

Tsy mahay manoa be kitoatoa
Feno faratsiana ny ety
Kanefa he ny fitahiana
Fa toy ny rano mikoriana

Tsy haiko intsony ny miteny 
Ilay fitiavanao mahery
`
songs["Ny hirako"]=`
'Zay hira izay tsy foiko
Hirahira ho anao ry Jeso
Itoriako ilay anaranao
Ilazako ny fitiavanao

Ny hira izay kaloiko
Fiderana avy ao am-poko ao
Noho ny hery sy tanjakao aminay
Sy talenta izay avy aminao

'Zay hira izay mba tiako
Hirahira ho anao ry Jeso
Itoriako ilay anaranao
Illazako ny fitiavanao

Ny hira izay hiraiko
Fiderana avy ao am-poko ao
Noho ny hery sy tanjakao aminay
Sy talenta izay avy aminao
`
songs["Omeo finoana"]=`
Fahazarana ihany satria
Amizao andro izao mampanahy 
Amin'ny fiainana fitoriana 
Marobe no tsy misy aim-panahy 
Te ho mpananatra fa tsy mety anarina 
Ka toa manahirana ihany
Toa tsy taratra @asa
Tsy fiainana, tsy lali-paka
Fiainana ivelany,fa tsy mba misy ao anaty
Izay lazainy tsy toy ny atao an...

Koa ity andro ity aho Jeso mitalao 
Omeo finoana fa te hitory anao 
Tsy ho toy izay vita taloha
F'izay natao dia hitanao tsy soa`

songs["Sambatra"]=`
Tsaroako fa manana hery aho 
Na mafy aza ny ady atrehako ety 
Tsaroako fa tsy mba irery aho 
Fa manana azy

Tsaroako fireo adin-tsaina
Na misy aza hita fa maivana ery 
'Reo feriko nampitaraina 
Dia sitrana satry
Ny olona mety mandao 
Amin'izao fiainana izao 
Fa sambatra izao sy ianao 
Manana an'i Jesosy Tompo tsy mba mandao:

V
Lay tsy mandao
Mba sambatra ihany ka sambatra
'Zay manana an'i Jeso
Mba sambatra ihany ka sambatra
'Zay miaraka aminy
`
songs["Sao very maina"]=`
Tsisy afak'hilaza 
fizy mahavita tena @fiainany
Sanatria

Tsisy afak hilaza 
fizy manana ny ampy @ fiainany
Sanatriavina izany

'Zay no nahatongavan'llay Mpamonjy
Mba ho fampiraisana
Hampitambatra antsika mianakavy
Tsy hisaraka fa hiara-dia

Ario androany ilay fahazarana
Mihira ihany nefa tsy ampy fitia
'Ndrao very maina lay fampiraisana
Ka hiala maina 'lay Jesosy be fitia
ש
`
songs["Tano mafy"]=`

1-Eny fantatro tokoa ny asanao 
Tsy mitandro hasasarana ianao 
Saingy ory am-panahy, fa kely hery 
Raha ny fitandremana ny teny

ref:
Miomana, miambena ianao
Ho avy faingana Jesosy Tomponao
Tano mafy izay anananao
Mba tsy hisy haka ny satroboninahitrao

2-Misy marobe tokoa ny fitsapana 
Ao koa ny vela-pandriky satana 
Tena misy koa ny fizahana toetra 
Ho an'ny olombelona rehetra

3-'Zay mandresy no ho andrin'ny tempoly 
Ary izy tsy hiala eo intsony 
Hoy Jesosy nanome toky anao 
Dia ilay Jerosalema vaovao
`
songs["Tanora ô"]=`
1-Tanora ô! aiza ianao fa ela loatra ery 
No niandrasana anao hanao 'ty asa inty 
Ka mandehana @izao herinao izao 
Fa aza de variana milalao

Tanora ô! zato ianao mitazan-davitra
Misalasala lava izao tsy resy lahatra 
Miantso anao ankehitriny Jeso fitiavana
Ka asakasakao ra hoe handà

Tsy fantatrao va re izao fiainana izao
Mihasarotra isan'andro isan'ora
Kanefa ianao hatramizao milaza tsy hanao
Mialangalana eny sao voakom
Atambaro izao ny herintsika (rehetra)2
Ary ampiasao fa samy manana talenta
Izao sy ianao
Ka miheritrereta

2
Tanora ō! sonnerie alerte ange izao 
Jesosy kapiteny no chef d'equipe ao 
Fa misy ady dangereux tsy maintsy atrehina 
Ka raiso ny apinga anananao

Tanora o miainga, tsy an-jaza intsony ity 
Fa efa an-dohalika ny ranom-bary
Ianao irery ihany no sisa antenaina 
Ka mandehana dieny malaina
`
songs["Tsaroko fa manana hery aho"]=`

Tsaroako fa manana hery aho 
Na mafy aza ny ady hatrehako ety 
Tsaroako fa tsy mba irery aho 
Fa manana azy

Tsaroako fa ireo adin-tsaina 
Na misy aza hita fa maivana ery 
'Lay feriko nampitaraina 
Dia sitrana satria

Ny olona mety mandao 
Amin'izao fiainana izao 
Fa sambatra izaho sy ianao 
Manana an'i Jesosy
Tompo tsy mandao
Lay tsy mandao 

Fa sambatra ihany 
ka sambatra Izay 
manana an'i Jesosy 
Fa sambatra ihany 
ka sambatra 
Izay miaraka aminy`

songs["Telo izay Iray"]=`
Eh,he, he, he he.... 
Na ho vy, na ho vato
Tsy,hi, hi, hi,hi..... 
tsy mba misy atakalo
Anao ry Ray
Anao Jeso
Anao Fanahy

Eh, he, he, he, he.... N'aiza n'aiza, n'iza n'iza
Tsy,hi, hi, hi,hi... Tsy mba misy, mahasolo
Anao ry Ray
Anao Jeso
Anao Fanahy

Lehilahy:
Ny Ray no nampisy
Namorona izao rehetra hita izao
Jesoa no mpamonjy
Nomena ho ahy sy ho anao
Sy izay rehetra mino

Vehivavy:
Ny fanahy kosa no mananatra mampianatra
Manoro hevitra raha sendra diso lalana
Mibitsibitsika ao anaty isan'andro isan'andro izao

Feo fahatelo:
Ny fanahy kosa no mananatra mampianatra
Manoro hevitra raha sendra diso lalana
Mibitsika ao am-po

Rehetra:
Mibitsika ao am-po

Ny Andriamanitra Tompoinay
Tsy maro fa iray, ilay telo izay iray
Ny Andriamanitra ivavahanay
Tsy maro fa iray, ilay telo izay iray
Ny Andriamanitra derainay
Tsy maro fa iray, ilay telo izay iray
Ny Andriamanitra hinoanay
Tsy maro fa iray, ilay telo izay iray
`
// ... Ary avy eo dia tohizo amin'ny titre rehetra
// Raha tsy mbola misy tononkira dia apetraho hoe:
songTitles.forEach(title => {
  if(!songs[title]) songs[title] = "Tononkira mbola tsy misy.";
});
document.getElementById('songLyrics').scrollTop = 0;
function showSongPage(title){
  document.getElementById('songTitle').textContent = title;
  const lyricsEl = document.getElementById('songLyrics');
  lyricsEl.textContent = songs[title];
  lyricsEl.scrollTop = 0; // manomboka eo ambony rehefa misokatra
  showPage('songContent');
}
function openNoteForm(){

document.getElementById("noteModal").style.display="flex";

}

function closeNoteForm(){

document.getElementById("noteModal").style.display="none";

}

const APIURL = 'https://pokeapi.co/api/v2/pokemon/';
const content = document.querySelector('.container');
const form = document.getElementById('form');
const input = document.getElementById('input');

input.focus();
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const inputNumber = input.value; 

    if(!isNaN(inputNumber)){
        input.value = '';
        content.innerHTML = '';
        getProperties(APIURL+inputNumber);

        setTimeout(()=>{
            // window.location.reload();
        }, 10000);
    

    }else{
        console.log('Not a number')
        input.value = '';
        createErrorCard();
        setTimeout(()=>{
            // window.location.reload();
        }, 4000);
    }

    
})


const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

async function getProperties(url){
    const res = await fetch(url);
    const data = await res.json();

   moreDetails(data);
}


async function moreDetails(data_json){

    const {abilities, height, weight, sprites, types,name} = data_json;

    const color = types[0].type.name;
        const abilityRes = await fetch(abilities[0].ability.url.toString());
        const { effect_entries } = await abilityRes.json();
        
        effect_entries.forEach((effect_entry)=>{
            if(effect_entry.language.name === 'en'){
                pokemonAbilityDescription = effect_entry.effect;
                pokemonAbilityDescription2 = effect_entry.short_effect;

                pokemonAbilityName = abilities[0].ability.name;

            }
        })
    const _ = name[0].toUpperCase() + name.slice(1);
    const __ = pokemonAbilityName[0].toUpperCase() + pokemonAbilityName.slice(1);


    const details = document.createElement('div');
    details.classList.add('details');
    details.style.backgroundColor = `#fff`

    details.innerHTML = `
    <div class = 'header'>
        <div class = 'img-container' style = 'background-color: ${colors[color]}'>
        <img src = '${sprites.back_default}'>
    </div>
        <ul>
        <li>
            <h3>Name: <span>${_}</span></h3></li>
            <li><h3>Height:<span>${height} ft.</span></h3></li>
            <li><h3>Weight: <span>${weight} kg.</span></h3></li>
        </ul>
    </div>

    <div class = 'more-details'>
        <h3>ABILITY</h3>
        <h5>${__}</h5>
        <p>${pokemonAbilityDescription} </p><p>${pokemonAbilityDescription2}</p>
    </div>
    `
    content.appendChild(details);

    
}


function createErrorCard(){
    content.innerHTML = ''
    content.innerHTML = '<h4>Oops! <i class="fa-regular fa-face-frown">,</i> That wasn\'t a number.</h4>'
}

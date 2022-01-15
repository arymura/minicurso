const container = document.querySelector('#Container');
const botao = document.querySelector('#botao');



gerarValorAleatorio =(total) => {
    return Math.floor(Math.random() *total);
}

constroiInfo = (dado) => {
    
    const img = document.createElement('img');
    const ul = document.createElement('ul');
    const liNome = document.createElement('li');
    const liEspecie = document.createElement('li');
    const liStatus = document.createElement('li');
    const card = document.createElement('div');            
    img.src = dado.image;
    img.alt = dado.name;
    liNome.innerHTML = dado.name;
    liEspecie.innerHTML = dado.species;
    liStatus.innerHTML = dado.status;    
    card.appendChild(img)
    ul.appendChild(liNome);
    ul.appendChild(liEspecie);
    ul.appendChild(liStatus);
    card.appendChild(ul);
    container.appendChild(card);
}

const popula = dado => new Promise(resolve => {
    constroiInfo(dado);
    return resolve});


pegarPersonagem = () => {

    return fetch(`https://rickandmortyapi.com/api/character/`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-type": 'application/json'
        }        
    }).then((response) => response.json()).then((data)=>{
        for(let curr=0; curr<3; curr++){
            const al = gerarValorAleatorio(data.info.count);
            fetch(`https://rickandmortyapi.com/api/character/${al}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    "Content-type": 'application/json'
                }        
            }).then((response) => response.json()).then((data) => constroiInfo(data));
        }
    });
}
botao.onclick = () => {
    while(container.hasChildNodes()){
        container.removeChild(container.childNodes[0]);
    }

    pegarPersonagem();
}
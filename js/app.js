//Varibles
const $form  = document.querySelector('#form');
const $listTweets = document.querySelector('#list-tweets');
let tweets = [];

eventListeners();
//Events listener
function eventListeners(){
    $form.addEventListener('submit', addTweet);
    document.addEventListener('DOMContentLoaded',() =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        showTweets();
    })
}
//Functions
function addTweet(e){
    e.preventDefault();
    //Textarea 
    const valueTweet = document.querySelector('#tweet').value    
    if(valueTweet === ''){
       error();
       return;
    }else{
        const tweetObj = {
            id: Date.now(),
            text: valueTweet
        }
        tweets = [...tweets,tweetObj];
        console.log(tweets)
        showTweets();
    }
    $form.reset();
}

function error(){
    const error = document.createElement('p');
    error.textContent = 'El Tweet no puede ir vacio'
    error.classList.add('error')
    const $content = document.querySelector('#content');
    $content.appendChild(error)
    setTimeout(()=>{
        error.remove();
    },3000)
}
function showTweets(){
    clearHTMl();
    tweets.forEach( tweet=> {
        const li = document.createElement('li');
        li.textContent = tweet.text;
        $listTweets.appendChild(li);

        const btnDelate = document.createElement('a');
        btnDelate.classList = 'borrar-tweet'
        btnDelate.textContent = 'X';
        li.appendChild(btnDelate);
    
        btnDelate.addEventListener('click', () =>{
            delateTweets(tweet.id);
        });

    });
    addStrorage();
}

function addStrorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

function clearHTMl(){
    while($listTweets.firstChild){
        $listTweets.removeChild($listTweets.firstChild);
    }
}

function delateTweets(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    showTweets()
}
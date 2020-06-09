let myData;
let cat = 'general';

function createReq(cat){
    let http = new XMLHttpRequest();
    //  To open a connection between me and the server
    http.open("GET" , `http://newsapi.org/v2/top-headlines?country=eg&category=${cat}&apiKey=2ca38045cc2e44929e8dd3efd457330f`)
    // Send Request To the destination to get data From it
    http.send();
    http.addEventListener('readystatechange' , ()=>{
        if(http.readyState == 4 && http.status == 200){
            myData = JSON.parse(http.response).articles;
            showData();
        }
});
}
createReq(cat);
// Display Data 
function showData(){
    let output = ``;
    for(let i = 0 ; i < myData.length ; i++){
        output += `
        <div class ='col-lg-3 col-md-4 col-sm-6 my-2'> 
            <div class='layer'>
                <div class ='img-cont'>
                    <img class ='w-100' src ='${myData[i].urlToImage}'>
                </div>    
                <div class="content">
                    <a href='${myData[i].url}' target='_blank'>
                        <h1 class='text-primary'>${myData[i].title}</h1>
                    </a>
                    <p class ='text-muted'> ${myData[i].description}</p>
                    <a href='${myData[i].url}' target='_blank'>Read More</a>
                </div>
            </div>
        </div>`
    }
    document.getElementById('data').innerHTML= output;
}
// Activate Nav Links
let links = document.getElementsByClassName('nav-link');
for( let i = 0 ; i < links.length ; i++){
    links[i].addEventListener('click' , e => createReq((e.target.text.toLowerCase())));
}
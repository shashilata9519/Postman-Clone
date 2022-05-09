let paraBox = document.getElementById('paraBox');
// intially hide the parameter
paraBox.style.display = 'none';

//no of parameter
let count = 0;

function getString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// if the user click on parabox , hide the json box 
let pararadio = document.getElementById('pararadio');
pararadio.addEventListener('click', () => {
    document.getElementById('requestJson').style.display = 'none'
    document.getElementById('paraBox').style.display = 'block'
});

// if the user click on json request box , hide the parabox 

let jsonradio = document.getElementById('jsonradio');
jsonradio.addEventListener('click', () => {
    document.getElementById('paraBox').style.display = 'none'
    document.getElementById('requestJson').style.display = 'block'
});

//if the user click on plus button add more parameter

let addpara = document.getElementById('addpara');
addpara.addEventListener('click', () => {
    let param = document.getElementById('param');
    let string = `<div class="row g-3 my-2">
                        <label for="URL" class="col-sm-2 col-form-label">Parameter ${count + 2}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parakey${count + 2}" placeholder="Enter Parameter ${count + 2} key ">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="paravalue${count + 2}" placeholder="Enter Parameter ${count + 2} value">
                        </div>
                    
                        <button class="btn btn-info deletePara">-</button>
                    </div>`;

    let paraElem = getString(string);
    param.appendChild(paraElem);

    //to delete the parameter

    let deletePara = document.getElementsByClassName('deletePara');
    for (item of deletePara) {
        item.addEventListener('click', (e) => {
            alert("Do you want to delete");
            e.target.parentElement.remove();
        });
    }
    count++;

})

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    document.getElementById('responseJsonText').value = "Please wait....Fetching response";

    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    
    //if the user has used parameter option instead of json , collect  all the parameter in an object 
    
    if (contentType == 'para') {
        data = {};
        for (let i = 0; i < count + 1; i++) {
            if (document.getElementById('parakey' + (i + 1)) != undefined){
                let key = document.getElementById('parakey' + (i + 1)).value;
                let value = document.getElementById('paravalue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data=document.getElementById('requestJsonText').value;
        
    }
    console.log("url is :", url);
    console.log("request is :", requestType);
    console.log("content type is :", contentType);
    console.log("data",data);


    //if the request type is post ,invoke fetch api to create a post request
    if(requestType == 'GET')
    {
        fetch(url,{
            method: 'GET',
        })
        .then(response=>response.text())
        .then((text)=>{
            data=document.getElementById('responseJsonText').value=text;
        });
    }
    else{
        fetch(url,{
            method: 'POST',
            body:data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
              }
        })
        .then(response=>response.text())
        .then((text)=>{
            data=document.getElementById('responseJsonText').value=text;
        });

    }
});
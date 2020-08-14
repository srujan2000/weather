document.querySelector(".submit").addEventListener('click',getResult);

function getResult(e){
    
    const city = document.querySelector(".city").value;

    const xhr  = new XMLHttpRequest();

    xhr.open("GET",`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=(yourapikey)`,true);

    xhr.onload = function(){
        if(this.status === 200){
            result = JSON.parse(this.responseText);
            let name  = result['name'];
            let temp = (result['main']['temp'] -273).toFixed(2);
            let  humidity = result['main']['humidity'];
            let clouds = result['clouds']['all'];
            let condition = result['weather'][0]['description'];

            const output = `
            <li class="list-group-item text-center">City :${name} </li>
            <li class="list-group-item text-center">Temperature :${temp}</li>
            <li class="list-group-item text-center">Humidity :${humidity}</li>
            <li class="list-group-item text-center">Clouds :${clouds}</li>
            <li class="list-group-item text-center">Description :${condition}</li>
            `

            document.querySelector('.results').innerHTML = output;
        }else{
            Error('Enter a valid name/Something Went Wrong')
        }
    }

    xhr.send();
    e.preventDefault();
}

function Error(error){

   //create element

   var errorDiv =document.createElement('div');

   //elements
   var cont = document.querySelector('.container');
   var head = document.querySelector('.heading')
   
   var classname = 'alert alert-danger text-center';

   //Add classname
   errorDiv.className = classname;

   //Create text node
   errorDiv.appendChild(document.createTextNode(error));

   cont.insertBefore(errorDiv,head);

   setTimeout(errorRemove,2000);
}

function errorRemove(){
    document.querySelector('.alert').remove();
}

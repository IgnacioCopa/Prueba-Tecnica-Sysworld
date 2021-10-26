let id_temp= "";
let clicks_country=0;
let infoArray,country,click_id,clicksAll;
let countryArray=[];
let z= 0;
let select;
let id;


let url_region = [
    "https://restcountries.com/v3.1/region/america",
    "https://restcountries.com/v3.1/region/africa",
    "https://restcountries.com/v3.1/region/asia",
    "https://restcountries.com/v3.1/region/europe",
    "https://restcountries.com/v3.1/region/oceania"
]


//eventos----------------------------------->
window.onload = () => {

    //API
    countryAPI(); 
    
}

//API--------------------------------->

const countryAPI = () => {

    let i= 0;
    url_region.forEach( e => {

        fetch(e)
        .then(response => response.json())
        .then(data => {

        data.forEach( country => {

            countryArray.push({ country, clicks: 0 });

            });

            //console.log(countryArray);
        
        })
        .then( async e =>{

            i++;
            if(i==url_region.length){

                //cargar
                loader();

                //ordenar
                orderby();

                //ecento click
                document.getElementById(`country`).addEventListener("click",showInfo);            

                i=0
            }

        })

        .catch(err => console.log(err));
    })
    


}

// (ID = dinamico)
const showInfo = (a) =>{

    let v = true;
    select.forEach( element => {
    
        element.addEventListener("click", elem => {
                    
            //console.log("primera vez")
            if(elem!=null){

                id = elem.target.getAttribute("id");

                if(v){
                    v=false;
                    OpenClose(id);
                }
                
            }           
                   
        });
     
    });


}


//abrir y cerrar desplegable----------------------------->

const OpenClose = async (id) =>{

    if(document.getElementById(`${id}a`).style.display=="none")
    {
        document.getElementById(`${id}a`).style.display="flex";
        write(id);      
        
    }
    else
    {
        write(id);
        document.getElementById(`${id}a`).style.display="none";
                       
    }
}


//actualizar inicio de PAGINA----------------------------------------------------------------------->
const loader = () =>{

    $.ajax({

        url:'countrySelect.php',
        type: 'GET',
        success:  function(res){

            if(res != ""){
                
                infoArray = JSON.parse(res);

                countryArray.forEach( async element => {

                await infoArray.forEach( infoEl => {

                        if(element.country.name.official ==  infoEl.country){

                            element.clicks= parseInt(infoEl.clicks);
                            //document.getElementById(`${infoEl.country}b`).innerText= parseInt(infoEl.clicks);
                            
                        }
                        else
                        {
                            if(z<infoArray.length){
                                z++;
                                    
                            }
                            else{
                                z=0;
                                
                            }                                                         
                        }
                                                                 
                    });                                                                          
                    
                });
                                   
            }
        
        }

    })

}

//cargar datos----------------------------------------------------------------------->

const write = (a)=>{
   
    country = document.getElementById(a).id; //nombre pais

    click_id = document.getElementById(`${a}b`);
  
    //enviar datos al servidor-----------------------

    let send_click = parseInt(click_id.innerText);
    
    const sendData={
        n_country: country,
        clicks: send_click,
    }
    
    $.post('countrySend.php',sendData, function(res){
    
        console.log(res);
        load();
    })
    

}

//recivirlos los datos------------------------------------------------->

const load = () =>{

    //mostrar datos del servidor---------------------
    $.ajax({

        url:'countrySelect.php',
        type: 'GET',             
        success: function(res){
                
            if(res != ""){  
                    
                infoArray = JSON.parse(res); //respuesta
    
                infoArray.forEach( elem =>{
                                                    
                    if(elem.country == country){
                        click_id.innerText = elem.clicks;
    
                        console.log(elem.clicks);
                    }
                    else{
                        clicks_country= 0;
                    }
                                                
                })
            }
                             
        },
    
        error: function(e){console.log(e)}
                
    })  
}


//ordenar datos--------------------------------------------------------->
const orderby = async () =>{

    countryArray.sort((a,b)=>{

        //ordenar por orden alfabetico
        if(a.country.name.official > b.country.name.official){
            return 1;
        }
        else if(a.country.name.official < b.country.name.official){
            return -1
        }

    })

    //espera 2 segundos
    await awaitTwoSeconds();
    
    //promesa para el tiempo de acomodamiento del array
    function awaitTwoSeconds() {

        return new Promise(resolve => {

            setTimeout(() => {
                
                resolve(print());
            }, 1000);

        });

    }
      
}

//imprimir por pantalla los resultados

const print = async () =>{

    //ordenar por clicks
    countryArray.sort((a,b)=>{
        
        if (a.clicks>b.clicks){
        
            return -1}
        
        else{
        
            return 1}
    })


    countryArray.forEach( country =>{

        id_temp = country.country.name.official;

        //INTERFACE---------------
            
        let country_name = document.getElementById("country");
    
        const div = document.createElement('div');
        div.setAttribute('class','my-2');
    
        div.innerHTML= `
        <div class="bg-light select row" style="height: 3em;">
            <p class="col-9" style= "align-self: end;" id="${id_temp}">${country.country.name.official}</p>
            <p class="col-1" style= "align-self: end;"> Clicks:</p> 
            <p class="col-1" style= "align-self: end;" id="${id_temp}b">${country.clicks}</p>
            <div class="col-1"> <img  src=${country.country.flags.png} style="height: 3em;"></img> </div>
        </div>
    
        <div class="get justify-content-between mb-3 mt-3 px-3" id="${id_temp}a" style="display: none;">
            <div>
                <p>Population</p>
                <p>${country.country.population}</p>
            </div>
            <div>
                <p>Area</p>
                <p>${country.country.area}s</p>
            </div>
            <div>
                <p>Region</p>
                <p>${country.country.region}</p>
            </div> 
        </div>
        `;
    
    country_name.appendChild(div);

    })

    //variables de clicks
    select = document.querySelectorAll(".col-9")
    document.getElementById(`country`).addEventListener("click",showInfo);
    
    //ejecutar clicks
    showInfo(select);
}

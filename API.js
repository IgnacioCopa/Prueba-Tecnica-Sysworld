let id_temp= "";
let change="";
let clicks_country=0;
let infoArray,country,click_id,clicksAll;
let countryArray=[];
let z= 0;
let info;
let asd;


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
    document.getElementById(`country`).addEventListener("click",showInfo);
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
        .then(e =>{

            i++;
            if(i==url_region.length){

                //cargar
                loader();
                orderby();
                i=0
            }

        })

        .catch(err => console.log(err));
    })
    


}

// (ID = dinamico)
const showInfo =  () =>{

    const select = document.querySelectorAll(".select")

    if (info==null){

        select.forEach(  element => {
    
            element.addEventListener("click", elem => {
                    
                //console.log("primera vez") 
                const id = elem.target.getAttribute("id");
                            
                if(id!=null)
                {
                    change= id; 
                    info= document.getElementById(`${change}a`);
                    
     
                }
                   
            });
     
        });

    }

    else{
        OpenClose();
    }

}


//abrir y cerrar desplegable----------------------------->

const OpenClose = () =>{

    if(info.style.display=="none")
    {
        info.style.display="flex";
        load(change);      
        
    }
    else
    {
        info.style.display="none";
        load(change); 
                       
    } 
}


//actualizar----------------------------------------------------------------------->
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

                            document.getElementById(`${infoEl.country}b`).innerText= infoEl.clicks;
                            element.clicks=infoEl.clicks;
                            
                            
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

//cargar datos y recivirlos ----------------------------------------------------------------------->

const load = (a)=>{

    country = document.getElementById(a).firstChild.nextSibling.innerText; //nombre pais

    click_id = document.getElementById(`${a}b`);

        //enviar datos al servidor-----------------------

        let send_click = parseInt(click_id.innerText);

        if(send_click==0){
            send_click=0
        }
    
        const sendData={
            n_country: country,
            clicks: send_click,
        }
    
        $.post('countrySend.php',sendData, function(res){
    
            console.log(res);
        })
    
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
const orderby = () =>{

    //ordenar
    countryArray.sort( (a,b) => {

        if(a.country.name.official > b.country.name.official){
            return 1;
        }
        else if(a.country.name.official < b.country.name.official){
            return -1
        }

    });

    //console.log(countryArray)

    countryArray.forEach( country =>{

        id_temp = country.country.name.official;

        //INTERFACE---------------
            
        let country_name = document.getElementById("country");
    
        const div = document.createElement('div');
    
        div.innerHTML= `
        <div class="select d-flex justify-content-between mb-3 mt-3 px-3" id="${id_temp}" style="height: 3em;">
            <p style= "align-self: end;">${country.country.name.official}</p>
            <p>Clicks:</p> <p style= "align-self: end;" id="${id_temp}b">${country.clicks}</p>
            <img src=${country.country.flags.png}></img>
        </div>
    
        <div class="get justify-content-between mb-3 mt-3 px-3" id="${id_temp}a" style="display: none; background: bisque;">
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
            
}

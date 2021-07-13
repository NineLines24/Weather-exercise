window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationtimezone = document.querySelector(".location-timezone");
    let temperaturesection = document.querySelector(".temperature");
    let temperaturespan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
                // eu consigo fazer isto com outros API???
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`
            
            
            //cenas muito sinistas de API
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                const {temperature, summary, icon} = data.currently;
                //Elementos do API call

                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationtimezone.textContent = data.timezone;

                //Transformar F em C
                let celsius = (temperature - 32) * (5/9);


                //icones
                seticons(icon, document.querySelector(".icon"));

                //Trocar para celsius
                temperaturesection.addEventListener('click', () => {
                    if(temperaturespan.textcontent === "F") {
                        temperaturespan.textContent = "C"; 
                        temperatureDegree.textcontent = math.floor(celsius);
                    } else {
                        temperaturespan.textContent = "F";
                        temperatureDegree.textcontent = temperature
                    }
                });
            });
        });
    }
//Como animar o icon
function seticons(icon, iconId){
const skycons = new Skycons({color: "white"});
const currenticon = icon.replace(/-/g, "_").toUpperCase();
skycons.play();
return skycons.set(iconId, Skycons[currenticon]);
}
});

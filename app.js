window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature-span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;
                    //srt DOM element from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //FORMULA FOR CELSIUS
                    let celsius = (temperature - 32) * (5 / 9);
                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    //change temperature to Celsius/Farenhiet
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });


    }

    function setIcons(icon, iconID) {
        const Skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        Skycons.play();
        return Skycons.set(iconID, Skycons[currentIcon]);

    }
});
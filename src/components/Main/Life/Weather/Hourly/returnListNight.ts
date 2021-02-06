import * as types  from 'store/types';

type Night = {
    date: number;
    indexStart:  number;
    indexEnd: number;
}

const returnListNight = (weatherOne: types.data.weather.WeatherOne): Night[] => {

    let listNightRaw = weatherOne.daily.map(day=>({sunrise: day.sunrise, sunset: day.sunset}) ) || [];

    const dtStart = weatherOne.hourly[0].dt;
    const dtEnd = weatherOne.hourly[47].dt;

    listNightRaw = listNightRaw.filter( night=> (dtEnd && night.sunrise <= dtEnd) && (dtStart && night.sunset >= dtStart) );
    let listNightRaw2 = listNightRaw.map(nightRaw => {
        return({
            date: new Date(nightRaw.sunrise * 1000).getDate(),
            hoursStart: new Date(nightRaw.sunrise * 1000).getHours(),
            hoursEnd: new Date(nightRaw.sunset * 1000).getHours(),
        })
    });

    let listNight = new Array(listNightRaw2.length).fill({
        indexStart: 0,
        indexEnd: 0,
    });

    // console.log(listNightRaw2)
    for (let iNight = 0; iNight < listNightRaw2.length; iNight++){
        const iHourStart = weatherOne.hourly.findIndex(hour=>(
            (hour.date === listNightRaw2[iNight].date) &&
            (hour.hour === listNightRaw2[iNight].hoursStart)
        ));
        const iHourEnd = weatherOne.hourly.findIndex(hour=>(
            (hour.date === listNightRaw2[iNight].date) &&
            (hour.hour === listNightRaw2[iNight].hoursEnd)
        ));        
        listNight[iNight] = {
            date: listNightRaw2[iNight].date,
            indexStart:  iHourStart,
            indexEnd: iHourEnd,
        }
    }

    return listNight
}

export default returnListNight;
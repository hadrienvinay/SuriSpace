// app/api/metals/route.js
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const API_KEY = process.env.WEATHER_API_KEY;
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city') || 'Paris';
  //const city = 'Paris';
  try {
   let data = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
    let weather = await data.json()
    let weather_temp = weather.current.temp_c
    let weather_icon = "https:" + weather.current.condition.icon
    

    console.log("Données météo récupérées avec succès");

    return NextResponse.json({
      city,
      temp: weather_temp,
      icon: weather_icon,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données météo' },
      { status: 500 }
    );
  }
   
}
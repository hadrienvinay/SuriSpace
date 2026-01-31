// app/api/metals/route.js
import { NextResponse } from 'next/server';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export async function GET() {
  const API_KEY = process.env.WEATHER_API_KEY;
  
  try {

    let subway_data = await fetch(
    'https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=STIF:StopPoint:Q:463137:',
    {
    method: 'GET',
    headers: {
        'apiKey': 'WfxAdqyUDcSKZQWkteHJJrCOUuOCfZXK'
      }
    })
  let subway_10 = await subway_data.json()
  let next_time = subway_10.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0].MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
  let next_time2 = subway_10.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[1].MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime

  let direction = subway_10.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0].MonitoredVehicleJourney.MonitoredCall.DestinationDisplay[0].value
  let direction2 = subway_10.Siri.ServiceDelivery.StopMonitoringDelivery[0].MonitoredStopVisit[0].MonitoredVehicleJourney.MonitoredCall.DestinationDisplay[0].value

  //let next_time2 = subway_10.Siri.ServiceDelivery.StopMonitoringDelivery.MonitoredStopVisit.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime
  const timeAgo = formatDistanceToNow(new Date(next_time), { 
    addSuffix: true,
    locale: fr 
  });
  const timeAgo2 = formatDistanceToNow(new Date(next_time2), { 
    addSuffix: true,
    locale: fr 
  });

    return NextResponse.json({
      next_time,
      next_time2,
      direction,
      direction2,
      timeAgo,
      timeAgo2
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données ratp' },
      { status: 500 }
    );
  }
   
  
}
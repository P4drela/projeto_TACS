
const NEWS_API_KEY = "bab48f6a1a1b46ffa6822ddb048ff20a";

const GEOAPIFY_API_KEY = "6838787d8c3e41bbb32dfa846be78948"; 

export const fetchUserLocation = async () => {
  try {
    const response = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${GEOAPIFY_API_KEY}`);

    const data = await response.json();

    return {
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      city: data.city.name,
    };
  } catch (error) {
    console.error("Error fetching user location:", error);
    
    return {
      latitude: 38.736946,
      longitude: -9.142685,
      city: "Lisboa",
    };
  }
};



export const fetchIncidents = async () => {
  try {
    const response = await fetch("https://api.fogos.pt/v2/incidents/active");
    const data = await response.json();

    const simulatedIncident = {
      id: "simulated-incident",
      title: "Incêndio Simulado",
      description: "Este é um incidente simulado para testes.",
      lat: 38.736946,
      lon: -9.142685,
    };

    const incidents = [
      ...data.map((incident) => ({
        id: incident.id,
        title: incident.name,
        description: incident.details,
        lat: incident.lat,
        lon: incident.lng,
      })),
    ];
    return incidents;
 

} catch (error) {
    console.error("Error fetching incidents:", error);
    
  }
}
;

export const fetchNews = async (city) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=incêndios ${city}&language=pt&apiKey=${NEWS_API_KEY}`
    );
    const { articles } = await response.json();
    return articles.map((article) => ({
      id: article.source.id || Math.random(),
      title: article.title,
      summary: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      city, 
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};


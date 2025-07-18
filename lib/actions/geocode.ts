interface GeocodeResult {
    country: string;
    formattedAddress: string;
  }
  
  export async function getCountryFromCoordinates(
    lat: number,
    lng: number
  ): Promise<GeocodeResult> {
    const apiKey = process.env.LOCATIONIQ_API_KEY!;
    const response = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${lat}&lon=${lng}&format=json`
    );
  
    if (!response.ok) {
      throw new Error(`LocationIQ API error: ${response.statusText}`);
    }
  
    const data = await response.json();
  
    return {
      country: data.address.country || "Unknown",
      formattedAddress: data.display_name || "Unknown location",
    };
  }
  
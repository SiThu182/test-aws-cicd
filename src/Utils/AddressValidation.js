export async function validateFullAddress(
  houseNo,
  street,
  city,
  district,
  postalCode,
  country,
  building = ""
) {
  // Create an address query based on provided parameters
  let addressQuery = `${houseNo || ""},${street || ""},${district || ""},${
    postalCode || ""
  },${city || ""},${country || ""}`;

  // Validate required components directly from function parameters
  const requiredComponents = [houseNo, street, city, postalCode, country];
  const validComponentCount = requiredComponents.filter(
    (component) => component && component.trim().length > 0
  ).length;

  if (validComponentCount === requiredComponents.length) {
    // Optionally, you can proceed to call the API if needed
    const apiKey = process.env.REACT_APP_GEOAPIFY_API_KEY; // Replace with your Geoapify API key
    const apiUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      addressQuery
    )}&apiKey=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Check if any features are returned
      if (!data.features || data.features.length === 0) {
        console.log("No address found.");
        return { valid: false, message: "No address found." };
      }

      console.log(data);
      // Log full address for reference
      console.log("Full Address:", data.features[0].properties.formatted);

      return { valid: true, message: "Address validated successfully." };
    } catch (error) {
      return { valid: false, message: "Error validating address." + error };
    }
  } else {
    // if (!houseNo) console.log(" - Missing house number.");
    // if (!street) console.log(" - Missing street.");
    // if (!city) console.log(" - Missing city.");
    // if (!postalCode) console.log(" - Missing postal code.");
    // if (!country) console.log(" - Missing country.");

    return {
      valid: false,
      message: "Invalid address, some address components are missing.",
    };
  }
}

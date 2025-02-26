import React, { useEffect, useRef, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Loader as GoogleAPILoader } from "@googlemaps/js-api-loader";

const AddressForm = ({ title, setAddressData, defaultAddress = null }) => {
  const [address, setAddress] = useState(
    defaultAddress === null ? "" : defaultAddress[0]?.address
  );
  const [houseNo, setHouseNo] = useState(
    defaultAddress === null ? "" : defaultAddress[0]?.house_number
  );
  const [building, setBuilding] = useState(
    defaultAddress === null ? "" : defaultAddress[0]?.building
  );

  const [street, setStreet] = useState(
    defaultAddress === null ? "" : defaultAddress[0]?.street
  );
  const [city, setCity] = useState(
    defaultAddress === null ? "" : defaultAddress[0]?.city
  );
  const [district, setDistrict] = useState(
    defaultAddress === null ? "" : defaultAddress[0]?.district
  );
  const [country, setCountry] = useState(
    defaultAddress === null ? "" : defaultAddress[0]?.country
  );
  const [postalCode, setPostalCode] = useState(
    defaultAddress === null ? "" : defaultAddress[0]?.postal_code
  );
  // const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  // const mapRef = useRef(null);
  // const markerRef = useRef(null);
  const apiKey = process.env.REACT_APP_MAP_API_KEY;

  useEffect(() => {
    const loader = new GoogleAPILoader({
      apiKey,
      libraries: ["places"],
    });

    loader
      .load()
      .then(() => {
        const input = inputRef.current;
        if (input) {
          const autocomplete = new window.google.maps.places.Autocomplete(
            input,
            {
              fields: ["address_components", "geometry", "formatted_address"],
              types: ["address"],
            }
          );

          const handlePlaceChanged = () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
              return;
            }

            const addressComponents = place.address_components;
            setAddress(place.formatted_address);

            // Extract postal code
            const postalCodeComponent = addressComponents.find((component) =>
              component.types.includes("postal_code")
            );
            setPostalCode(
              postalCodeComponent ? postalCodeComponent.long_name : ""
            );

            // Extract street address (combination of street number and route)
            const streetNumberComponent = addressComponents.find((component) =>
              component.types.includes("street_number")
            );
            const routeComponent = addressComponents.find((component) =>
              component.types.includes("route")
            );
            const street = `${
              streetNumberComponent ? streetNumberComponent.long_name : ""
            } ${routeComponent ? routeComponent.long_name : ""}`.trim();
            setStreet(street);

            // Extract city (locality) and sub-district (sublocality)
            const cityComponent =
              addressComponents.find((component) =>
                component.types.includes("locality")
              ) ||
              addressComponents.find((component) =>
                component.types.includes("administrative_area_level_1")
              );

            const districtComponent = addressComponents.find(
              (component) =>
                component.types.includes("sublocality") || // Sub-district
                component.types.includes("sublocality_level_1") // Specific level of sub-district
            );

            // Set city and district
            setCity(cityComponent ? cityComponent.long_name : "");
            setDistrict(districtComponent ? districtComponent.long_name : "");

            // Extract country
            const countryComponent = addressComponents.find((component) =>
              component.types.includes("country")
            );
            setCountry(countryComponent ? countryComponent.long_name : "");

            // Extract house number
            if (streetNumberComponent) {
              setHouseNo(streetNumberComponent.long_name);
            }

            // Extract building name
            const buildingComponent = addressComponents.find((component) =>
              component.types.includes("premise")
            );
            if (buildingComponent) {
              setBuilding(buildingComponent.long_name);
            }
          };

          // Listen for place changes
          autocomplete.addListener("place_changed", handlePlaceChanged);

          // Clean up listener on unmount
          return () => {
            window.google.maps.event.clearInstanceListeners(autocomplete);
          };
        }
      })
      .catch((error) => {
        console.error("Error loading Google Maps API:", error);
      });
  }, [apiKey]);

  // useEffect(() => {
  //   const loader = new GoogleAPILoader({
  //     apiKey,
  //     libraries: ["places"],
  //   });

  //   loader.load().then((google) => {
  //     const input = inputRef.current;
  //     if (input) {
  //       const autocomplete = new google.maps.places.Autocomplete(input, {
  //         fields: ["address_components", "geometry", "formatted_address"],
  //         types: ["address"],
  //       });
  //       const mapOptions = {
  //         center: { lat: 37.4221, lng: -122.0841 },
  //         zoom: 11,
  //         mapTypeControl: false,
  //         streetViewControl: true,
  //         zoomControl: true,
  //         fullscreenControl: true,
  //       };
  //       const map = new window.google.maps.Map(mapRef.current, mapOptions);
  //       const marker = new window.google.maps.Marker({
  //         map,
  //       });
  //       mapRef.current = map;
  //       markerRef.current = marker;

  //       autocomplete.addListener("place_changed", () => {
  //         const place = autocomplete.getPlace();
  //         renderAddress(place);
  //         if (!place.geometry) {
  //           alert(`No details available for input: '${place.name}'`);
  //           return;
  //         }

  //         setAddress(place.formatted_address);
  //         const addressComponents = place.address_components;
  //         const postalCodeComponent = place.address_components.find(
  //           (component) => component.types.includes("postal_code")
  //         );
  //         setPostalCode(
  //           postalCodeComponent ? postalCodeComponent.long_name : ""
  //         );
  //         const streetNumberComponent = addressComponents.find((component) =>
  //           component.types.includes("street_number")
  //         );

  //         const routeComponent = addressComponents.find((component) =>
  //           component.types.includes("route")
  //         );
  //         const street = `${
  //           streetNumberComponent ? streetNumberComponent.long_name : ""
  //         } ${routeComponent ? routeComponent.long_name : ""}`.trim();
  //         setStreet(street);

  //         const cityComponent = addressComponents.find((component) =>
  //           component.types.includes("locality")
  //         );
  //         setCity(cityComponent ? cityComponent.long_name : "");

  //         // Extract state
  //         const stateComponent = addressComponents.find((component) =>
  //           component.types.includes("administrative_area_level_1")
  //         );

  //         setState(stateComponent ? stateComponent.long_name : "");

  //         // Extract country
  //         const countryComponent = addressComponents.find((component) =>
  //           component.types.includes("country")
  //         );
  //         setCountry(countryComponent ? countryComponent.long_name : "");

  //       });

  //       autocompleteRef.current = autocomplete;
  //     }
  //   });
  // }, [inputRef, apiKey]);

  useEffect(() => {
    setAddressData({
      address: address,
      postal_code: postalCode,
      district: district,
      city: city,
      house_number: houseNo,
      street: street,
      building: building,
      country: country,
    });
  }, [
    address,
    city,
    postalCode,
    district,
    street,
    country,

    setAddressData,
    houseNo,
    building,
  ]);

  // const renderAddress = (place) => {
  //   if (place.geometry && place.geometry.location) {
  //     const location = place.geometry.location;

  //     mapRef.current.setCenter(location);
  //     markerRef.current.setPosition(location);
  //   } else {
  //     markerRef.current.setPosition(null);
  //   }
  // };

  return (
    <Box sx={{ padding: 2, maxWidth: "100%", margin: "auto" }}>
      <Typography variant="h5">{title}</Typography>
      <TextField
        inputRef={inputRef}
        label="Enter your address"
        variant="outlined"
        sx={{ my: 2 }}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        defaultValue={
          defaultAddress === null ? null : defaultAddress[0]?.address
        }
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="House Number"
          variant="outlined"
          value={houseNo}
          onChange={(event) => {
            setHouseNo(event.target.value);
          }}
          sx={{ my: 2 }}
          fullWidth
        />
        <TextField
          label="Building (optional) "
          variant="outlined"
          value={building}
          onChange={(event) => {
            setBuilding(event.target.value);
          }}
          sx={{ my: 2 }}
          fullWidth
        />
        <TextField
          label="Street"
          variant="outlined"
          value={street}
          onChange={(event) => {
            setStreet(event.target.value);
          }}
          sx={{ my: 2 }}
          fullWidth
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Postal Code"
          variant="outlined"
          value={postalCode}
          onChange={(event) => {
            setPostalCode(event.target.value);
          }}
          sx={{ my: 2 }}
          fullWidth
        />
        <TextField
          value={district}
          onChange={(event) => {
            setDistrict(event.target.value);
          }}
          label="District"
          variant="outlined"
          sx={{ my: 2 }}
          fullWidth
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
          label="City/State"
          variant="outlined"
          sx={{ my: 2 }}
          fullWidth
        />
        <TextField
          value={country}
          label="Country"
          variant="outlined"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
          sx={{ my: 2 }}
          fullWidth
        />
      </Box>

      {address && (
        <Box sx={{ marginTop: 2 }}>
          <strong>Selected Address:</strong> {address}
        </Box>
      )}
      {/* <Box ref={mapRef} sx={{ height: 500, width: "100%" }}></Box> */}
    </Box>
  );
};

export default AddressForm;

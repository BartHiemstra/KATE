// Returns postal code and house number from a Google Places object.
export function GetPostalAndHouseNumber(place) {
        let postalCode = null
        let houseNumber = null
        
        // Extract postal code and street number from Google Place object. Remove any whitespace in postal code.
        place?.address_components?.forEach(entry => {
            if (entry.types?.[0] === "postal_code") {
                postalCode = entry.long_name.replace(/ /g, '');
            }
            if (entry.types?.[0] === "street_number") {
                houseNumber = entry.long_name;
            }
        })
        
        // If both address components are found, return them.
        if(postalCode && houseNumber) {
            return { postalCode, houseNumber };
        }

        // Otherwise, if any address component is null, that means Google Places doesn't recognize it. Try extracting postal code and housenumber from input manually.
        else {
            postalCode = null;
            houseNumber = null;

            // Get the full input-address from the Place object.
            let fullAddress = place.name;

            // Define regex strings for finding the postal code and house number in a string.
            let regexPostal = / *[0-9]{4} *[A-Z]{2}/;
            let regexNumber = / *[0-9]{1,5} */;

            // Search postal code and house number based on regex. Remove any whitespace.
            postalCode = fullAddress.match(regexPostal).toString().replace(/\s/g, '');
            houseNumber = fullAddress.match(regexNumber).toString().replace(/\s/g, '');

            // If input postal code and housenumber are found using RegularExpressions, call buildingInfo with them.
            if(postalCode && houseNumber) {
                return { postalCode, houseNumber };
            }
            // Otherwise, return null.
            else {
                console.log("Huisnummer / postcode niet gevonden.");
                return null;
            }
        }
 }
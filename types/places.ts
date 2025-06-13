// =================================================================
// Reusable Base Types
// =================================================================

/**
 * Represents a geographical point with latitude and longitude.
 */
type Point = {
   lat: number;
   lng: number;
 };

 /**
  * Represents a GeoJSON Polygon geometry.
  */
 type PolygonGeometry = {
   type: "Polygon";
   coordinates: number[][][];
 };

 /**
  * A common identifier structure for locations like city, county, or neighbourhood.
  */
 interface LocationIdentifier {
   id: string;
   name: string;
   slug: string;
 }

 // =================================================================
 // School Types
 // =================================================================

 /**
  * Represents the detailed features object within a School.
  * Note: Many properties can be a mix of types (e.g., number | string) to handle
  * cases where a value might be a number, an "n/a" string, or an empty string.
  */
 interface SchoolFeatures {
   Email: string;
   County: string;
   Status: string;
   Address: string;
   Language: string;
   Affiliation: string[];
   "Grade Level": string[];
   Orientation: string[];
   "School Code": string;
   "School Type": string[];
   "Phone Number": string;
   "Rating Trend": string | number;
   "School Board": string;
   "School Number": string;
   "SchoolQ Score": number | string;
   "Grades Offered": string[];
   "NCES School ID": string;
   "District Number": string;
   "School District": string;
   "Most Recent Rank": number | string;
   "School Authority": string;
   "Additional Details": string[];
   "Most Recent Rating": number | string;
   "School Board Number": string;
   "School District Number": string;
   "School Authority Number": string;
   "Rank in the Most Recent Five Years": number | string;
   "Fraser Institute School Details Webpage": string;
   "Rating Average in the Most Recent Five Years": number | string;
 }

 /**
  * Represents a single school entity.
  */
 interface School {
   id: string;
   name: string;
   slug: string;
   full_slug: string;
   description: string;
   url: string;
   features: SchoolFeatures;
   country: string;
   state_province: string;
   point: Point;
   geometry?: PolygonGeometry; // The catchment area is optional
   grade_level: string[];
   grades_offered: string[];
   additional_details: string[];
   language: string[];
   affiliation: string[];
   orientation: string[];
   school_board: string;
   type: string[];
   score: number | null;
   has_catchment: boolean;
   special_programs: string[];
   city: LocationIdentifier;
   county: LocationIdentifier;
   neighbourhood: LocationIdentifier;
   neighbourhoods_served: LocationIdentifier[];
   place_type: "schools";
   distance: number;
 }

 // =================================================================
 // Park Types
 // =================================================================

 /**
  * Represents the detailed features object within a Park.
  */
 interface ParkFeatures {
   Address: string;
   Activities: string[];
   Facilities: string[];
   "Phone Number": string;
   "Park ID"?: number; // Optional, as not all parks have it
 }

 /**
  * Represents a single park entity.
  */
 interface Park {
   id: string;
   name: string;
   slug: string;
   full_slug: string;
   description: string;
   url: string;
   features: ParkFeatures;
   country: string;
   state_province: string;
   point: Point;
   geometry?: PolygonGeometry; // Optional
   city: LocationIdentifier;
   county: LocationIdentifier;
   major_park: boolean;
   facilities: string[];
   phone_number: string;
   neighbourhood: LocationIdentifier;
   place_type: "parks";
   distance: number;
 }

 // =================================================================
 // Transit Stop Types
 // =================================================================

 /**
  * Represents the features object within a TransitStop.
  */
 interface TransitStopFeatures {
   Address: string | null;
 }

 /**
  * Represents a single transit stop.
  */
 interface TransitStop {
   id: string;
   name: string;
   slug: string;
   full_slug: string;
   description: string;
   url: string;
   features: TransitStopFeatures;
   country: string;
   state_province: string;
   point: Point;
   type: "street-level-transit" | "rail-transit";
   city: LocationIdentifier;
   county: LocationIdentifier;
   place_type: "transitstops";
   distance: number;
   walking_time?: number; // Optional, as it's not present on rail stops
 }

 // =================================================================
 // Safety Place Types (Using a Discriminated Union)
 // =================================================================

 /**
  * A base interface containing properties common to all safety places.
  */
 interface BaseSafetyPlace {
   id: string;
   name: string;
   slug: string;
   full_slug: string;
   description: string | null;
   url: string;
   country: string;
   state_province: string;
   point: Point;
   city: LocationIdentifier;
   county: LocationIdentifier;
   place_type: "safetyplaces";
   distance: number;
 }

 /**
  * Represents a police station or community policing center.
  */
 interface PolicePlace extends BaseSafetyPlace {
   type: "police";
   features: {
     Address: string;
   };
 }

 /**
  * Represents a fire station.
  */
 interface FireStationPlace extends BaseSafetyPlace {
   type: "fire-stations";
   features: {
     Address: string;
   };
 }

 /**
  * Represents a health care facility like a hospital.
  */
 interface HealthCarePlace extends BaseSafetyPlace {
   type: "health-care";
   features: {
     Type: string[];
     Status: string;
     Address: string;
     Contact: string;
     "Fax Number": string;
     "Phone Number": string;
     "Email Address": string;
   };
 }

 /**
  * A discriminated union of all possible SafetyPlace types. This allows for
  * type-safe access to the `features` object based on the `type` property.
  */
 type SafetyPlace = PolicePlace | FireStationPlace | HealthCarePlace;

 // =================================================================
 // Main API Response Type
 // =================================================================

 /**
  * Represents the entire API response structure.
  */
 export interface ApiResponse {
   schools: School[];
   parks: Park[];
   transit_stops: TransitStop[];
   safety_places: SafetyPlace[];
 }
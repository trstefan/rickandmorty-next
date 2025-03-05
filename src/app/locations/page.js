"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Loader2 } from "lucide-react";
import InputGroup from "../../components/Filter/Category/InputGroup";
import CharsGrid from "../../components/CharsGrid";

export default function Locations() {
  const [characters, setCharacters] = useState([]);
  const [locationInfo, setLocationInfo] = useState(null);
  const [locationId, setLocationId] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/location/${locationId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }

        const data = await response.json();
        setLocationInfo(data);

        if (data.residents.length > 0) {
          const characterData = await Promise.all(
            data.residents.map((url) => fetch(url).then((res) => res.json()))
          );
          setCharacters(characterData);
        } else {
          setCharacters([]);
        }
      } catch (err) {
        setError(err.message || "An unknown error occurred");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationData();
  }, [locationId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Location Explorer
                </CardTitle>
                <CardDescription>
                  Browse locations from the Rick and Morty universe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InputGroup
                  name="Location"
                  changeID={setLocationId}
                  total={126}
                  currentValue={locationId}
                />
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-2/3">
            {isLoading ? (
              <LocationSkeleton />
            ) : error ? (
              <Card className="border-destructive">
                <CardContent className="pt-6">
                  <p className="text-destructive">{error}</p>
                </CardContent>
              </Card>
            ) : locationInfo ? (
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <CardTitle className="text-3xl font-bold">
                      {locationInfo.name}
                    </CardTitle>
                    <Badge variant="outline" className="w-fit">
                      ID: {locationInfo.id}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Type:</span>
                        <span className="text-sm">
                          {locationInfo.type || "Unknown"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Residents:</span>
                        <span className="text-sm">
                          {locationInfo.residents.length}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Dimension</h3>
                      <p className="text-muted-foreground">
                        {locationInfo.dimension || "Unknown Dimension"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Residents</h2>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : characters.length > 0 ? (
            <CharsGrid chars={characters} />
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">
                  No residents found for this location
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function LocationSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-8 w-3/4" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

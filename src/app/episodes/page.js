"use client";
import React, { useEffect, useState } from "react";
import CharsGrid from "../../components/CharsGrid";
import InputGroup from "../../components/Filter/Category/InputGroup";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function Episodes() {
  const [characters, setCharacters] = useState([]);
  const [episodeInfo, setEpisodeInfo] = useState(null);
  const [episodeId, setEpisodeId] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch episode data");
        }

        const data = await response.json();
        setEpisodeInfo(data);

        if (data.characters.length > 0) {
          const characterData = await Promise.all(
            data.characters.map((url) => fetch(url).then((res) => res.json()))
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

    fetchEpisodeData();
  }, [episodeId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8">
        {/* Episode Information */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Episode Explorer
                </CardTitle>
                <CardDescription>
                  Browse episodes from the Rick and Morty universe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InputGroup
                  name="Episode"
                  changeID={setEpisodeId}
                  total={51}
                  currentValue={episodeId}
                />
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-2/3">
            {isLoading ? (
              <EpisodeSkeleton />
            ) : error ? (
              <Card className="border-destructive">
                <CardContent className="pt-6">
                  <p className="text-destructive">{error}</p>
                </CardContent>
              </Card>
            ) : episodeInfo ? (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-3xl font-bold">
                    {episodeInfo.name}
                  </CardTitle>
                  <CardDescription>
                    {episodeInfo.episode} - {episodeInfo.air_date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Character Count
                      </h3>
                      <p className="text-muted-foreground">
                        {episodeInfo.characters.length} characters
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>

        {/* Characters Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Characters</h2>
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
                  No characters found for this episode
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodeSkeleton() {
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

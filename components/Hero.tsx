"use client";
import { useState } from "react";
import { responseProps } from "./types";
import moment from "moment";
import Image from "next/image";

const Hero = () => {
  const [cityName, setCityName] = useState<string>("");
  const [cityDetail, setCityDetail] = useState<responseProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const city = cityName.replace(" ", "%20");
    console.log(city);

    try {
      setIsLoading(true);
      const res = await fetch(`/api/weatherapi?q=${city}`);
      if (res.ok) {
        const result = await res.json();
        setCityDetail(result);
        setCityName("");
        setIsLoading(false);
      } else {
        const { error } = await res.json();
        alert(`${error}`);
        setIsLoading(false);
      }
    } catch (error) {
      alert("failed to send data");
    }
  };
  return (
    <section className="max-w-screen-md m-auto pt-10">
      <h1 className="mt-16 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center">
        Weather App Using <br className="max-md:hidden" />
        <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent capitalize">
          open weather map api
        </span>
      </h1>

      <div className="mt-10">
        <form onSubmit={onSubmit} className="relative">
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter City Name"
            className="block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-10 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-amber-500 focus:outline-none focus:ring-0"
            required
          />
          <button
            type="submit"
            className="hover:border-amber-500 hover:text-amber-400 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-20 items-center justify-center rounded border border-gray-200 font-sans text-sm font-medium text-gray-400 peer-focus:border-gray-700 peer-focus:text-gray-700 "
          >
            Search
          </button>
        </form>
      </div>
      {isLoading ? (
        <div className="m-auto">
          <img
            src="/loader.svg"
            alt="loading"
            className="w-20 h-20 object-contain"
          />
        </div>
      ) : (
        <div className="mt-10 px-8">
          <div className="div">
            <p>
              Temp <span>{cityDetail?.main.temp.toFixed(0)}&deg;C</span>
            </p>
            <p>
              Max-Temp <span>{cityDetail?.main.temp.toFixed(0)}&deg;C</span>
            </p>
            <p>
              Min-Temp <span>{cityDetail?.main.temp.toFixed(0)}&deg;C</span>
            </p>
          </div>

          <div className="div ">
            {cityDetail?.weather?.map((currElem) => (
              <div
                key={currElem.id}
                className="flex flex-row-reverse justify-center items-center"
              >
                <Image
                  src={`https://openweathermap.org/img/wn/${currElem.icon}@2x.png`}
                  alt="weather icon"
                  width={100}
                  height={100}
                />

                <h2>weather condition {currElem.main}</h2>
                <h2>{currElem.description}</h2>
              </div>
            ))}
          </div>

          <div className="div">
            <h3> City {cityDetail?.name}</h3>
            <span>Country {cityDetail?.sys.country}</span>
          </div>

          <div className="div">
            <p>
              Sunrise{" "}
              <span>{moment.unix(cityDetail?.sys.sunrise).format("LT")}</span>
            </p>
            <p>
              Sunset{" "}
              <span>{moment.unix(cityDetail?.sys.sunset).format("LT")}</span>
            </p>
          </div>

          <div className="div">
            <h4> Latitute = {cityDetail?.coord?.lat}</h4>
            <h1> Longitute = {cityDetail?.coord?.lon}</h1>
          </div>

          <h1> city timezone = {cityDetail?.timezone}</h1>
          <h1> city visibility = {cityDetail?.visibility}</h1>
          <h1> city base = {cityDetail?.base}</h1>
          <h1> city code = {cityDetail?.code || "N/A"}</h1>
          <h1> city dt = {cityDetail?.dt}</h1>
          <h1> city id = {cityDetail?.id}</h1>
          <h1> city pressure = {cityDetail?.main?.pressure}</h1>
          <h1> city feels_like = {cityDetail?.main?.feels_like}</h1>
          <h1> city humidity = {cityDetail?.main?.humidity}</h1>
          <h1> city wind speed = {cityDetail?.wind?.speed}</h1>
        </div>
      )}
    </section>
  );
};

export default Hero;

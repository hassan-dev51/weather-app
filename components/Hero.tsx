"use client";
import { useState } from "react";
import { responseProps } from "./types";
import moment from "moment-timezone";
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

      <div className="mt-10 px-4">
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
              City <span className="name"> {cityDetail?.name}</span>
            </p>
            <p>
              Country
              <span className="name"> {cityDetail?.sys.country}</span>
            </p>
          </div>

          <div className="div flex-row">
            {cityDetail?.weather?.map((currElem) => (
              <div
                key={currElem.id}
                className="flex justify-between items-center"
              >
                <h2 className="name capitalize">{currElem.description}</h2>
                <Image
                  src={`https://openweathermap.org/img/wn/${currElem.icon}@2x.png`}
                  alt="weather icon"
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>

          <div className="div">
            <p>
              Temp{" "}
              <span className="text-blue-400">
                {cityDetail?.main.temp.toFixed(0)}&deg;C
              </span>
            </p>
            <p>
              Max-Temp{" "}
              <span className="text-red-400">
                {cityDetail?.main.temp.toFixed(0)}&deg;C
              </span>
            </p>
            <p>
              Min-Temp{" "}
              <span className="text-green-400">
                {cityDetail?.main.temp.toFixed(0)}&deg;C
              </span>
            </p>
          </div>

          <div className="div">
            <p>
              city feels_like <br />
              <span> {cityDetail?.main?.feels_like} </span>
            </p>
            <p>
              city humidity <br />
              <span>{cityDetail?.main?.humidity}%</span>
            </p>
            <p>
              city wind speed <br />
              <span>{cityDetail?.wind?.speed} m/s </span>
            </p>
          </div>

          <div className="div">
            <p>
              Sunrise{" "}
              <span>
                {cityDetail &&
                  moment.unix(cityDetail?.sys?.sunrise).format("LT")}
              </span>
            </p>
            <p>
              Sunset{" "}
              <span>
                {cityDetail &&
                  moment.unix(cityDetail?.sys?.sunset).format("LT")}
              </span>
            </p>
          </div>

          <div className="div">
            <h4> Latitute = {cityDetail?.coord?.lat}</h4>
            <h1> Longitute = {cityDetail?.coord?.lon}</h1>
          </div>

          <div className="div">
            <h1>
              city visibility = {cityDetail && cityDetail?.visibility / 1000}km
            </h1>{" "}
            <h1> city pressure = {cityDetail?.main?.pressure}</h1>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

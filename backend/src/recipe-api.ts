import { url } from "inspector";

const apikey = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page: number) => {
  if (!apikey) {
    throw new Error("No API key provided");
  }

  const url = new URL(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&query=${searchTerm}&number=10&page=${page}`
  );

  const queryParams = {
    apikey,
    query: searchTerm,
    number: "10", // Convert number to string
    offset: (page * 10).toString(),
  };

  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url);
    const result = await searchResponse.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

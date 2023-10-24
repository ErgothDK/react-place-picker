import customError from "../exceptions/custom-error.js";

export async function fetchData(appContext) {
  const response = await fetch(appContext.END_POINTS.GET_PLACES);
  const responseData = await response.json();

  if (!response.ok)
    throw new customError({
      title: "An Error Ocurred!",
      message: "Failed to fetch places",
    });

  return responseData.places;
}

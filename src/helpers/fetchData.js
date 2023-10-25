import customError from "../exceptions/custom-error.js";

export async function getPlaces(appContext) {
  const response = await fetch(appContext.END_POINTS.GET_PLACES);
  const responseData = await response.json();

  if (!response.ok)
    throw new customError({
      title: "An Error Ocurred!",
      message: "Failed to fetch places",
    });

  return responseData.places;
}

export async function getUserPlaces(appContext, userPlaces) {
  const response = await fetch(appContext.END_POINTS.GET_USER_PLACES);
  const responseData = await response.json();

  if (!response.ok)
    throw new customError({
      title: "An Error Ocurred!",
      message: "Failed to fetch user places",
    });

  return responseData.places;
}

export async function updateUserPlaces(appContext, userPlaces) {
  const response = await fetch(appContext.END_POINTS.PUT_USER_PLACES, {
    method: "PUT",
    body: JSON.stringify({ places: userPlaces }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();

  if (!response.ok)
    throw new customError({
      title: "An Error Ocurred!",
      message: "Failed to update user places",
    });

  return responseData.message;
}

async function init() {
  const data = await fetch("https://api.cutebear.in.th/api/icon/all");
  const categoriesData = await fetch(
    "https://api.cutebear.in.th/api/icon/categories"
  );
  if (!data.ok || !categoriesData.ok) {
    throw new Error("Network response was not ok");
  }

  const imageArray = (await data.json()).data;
  const categoriesArray = await categoriesData.json();
  const container = document.getElementById("container");

  const categories = categoriesArray.data;

  container.innerHTML = categories
    .map((category) => {
      const images = imageArray
        .filter((image) => image.category === category)
        .map((image) => {
          return `<img src="https://api.cutebear.in.th${
            image.path
          }" class="icon" alt="${image.name}" title="${formatSnakeToTitleCase(
            image.name
          )}" />`;
        })
        .join("");

      return `<div class="category"><h2>${formatString(
        category
      )}</h2><div class="image-container">${images}</div></div>`;
    })
    .join("");
}

(async () => await init())();

function formatString(str) {
  return `${str.charAt(0).toUpperCase()}${str.toLowerCase().slice(1)}`;
}

function formatSnakeToTitleCase(input) {
  return input
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

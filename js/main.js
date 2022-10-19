import data from "../data.json";

(function init() {
  const datalist = document.getElementById("techs");
  const searchInput = document.getElementById("search-input");
  const results = document.getElementById("result");

  data.forEach((file) => {
    const option = document.createElement("option");
    option.value = file.name;
    datalist.appendChild(option);
  });

  searchInput.addEventListener("change", (event) => {
    const searchValue = event.target.value;
    const filteredData = data.filter((file) => {
      return file.name === searchValue;
    });

    if (filteredData.length) {
      results.innerHTML = "";
      searchInput.value = "";

      const { name, content } = filteredData[0];
      const h2 = document.createElement("h2");
      const pre = document.createElement("pre");

      h2.textContent = name;
      h2.id = "filename";
      results.appendChild(h2);

      pre.textContent = content;
      results.appendChild(pre);
    }
  });
})();

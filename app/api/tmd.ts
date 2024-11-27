const getMovieList = async (page: number = 1) => {
  const url = "https://api.themoviedb.org/3/account/1/lists?page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTRjODNiNTJmZmNiY2Q4NzI2ZmM5ZWQ1ZGQ5MTFkYSIsIm5iZiI6MTczMjYyMTY5Ny43ODg1MjMyLCJzdWIiOiI2NzQ1YjQ0OTZlZWY1YjQzYTVmYzlkOTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WVeOfp9O1oFSyrDRwV_gpQ9lbA9R1KdlpHKWV-MGJpY",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
};

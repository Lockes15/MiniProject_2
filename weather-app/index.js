//connecting to the client side 
const express = require("express");

const app = express();
app.use(express.json());

const PORT = 5000;

// weather data 
const weatherData = [];

// A GET route at /weather that responds with the current weather data.
app.get("/weather", (req, res) => {
  res.json(weatherData);
});

//A POST route at /weather that allows us to add new weather data. The new data is pushed into our weatherData array, and we respond with the added data.
app.post("/weather", (req, res) => {
  const newWeather = req.body;
  weatherData.push(newWeather);
  res.status(201).json(newWeather);
});
//A PUT route at /weather/:id that updates existing weather data based on the provided ID. If the data is found, it's updated; otherwise, we respond with a 404 error.
app.put("/weather/:id", (req, res) => {
  const { id } = req.params;
  const updatedWeather = req.body;
  const index = weatherData.findIndex((w) => w.id === id);
  if (index !== -1) {
    weatherData[index] = updatedWeather;
    res.json(updatedWeather);
  } else {
    res.status(404).json({ message: "Weather data not found" });
  }
});
//A DELETE route at /weather/:id that deletes weather data based on the provided ID. If the data is found, it's removed; otherwise, we respond with a 404 error.
app.delete("/weather/:id", (req, res) => {
  const { id } = req.params;
  const index = weatherData.findIndex((w) => w.id === id);
  if (index !== -1) {
    weatherData.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Weather data not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
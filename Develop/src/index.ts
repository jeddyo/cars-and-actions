import Car from "./classes/Car.js";
import Truck from "./classes/Truck.js";
import Motorbike from "./classes/Motorbike.js";
import Cli from "./classes/Cli.js";

const vehicles = [
  new Car("12345", "Toyota", "Camry", 3000),
  new Truck("54321", "Ford", "F-150", 5000, 10000),
  new Motorbike("67890", "Harley Davidson", "Sportster", 500),
];

const cli = new Cli(vehicles);
cli.startCli();
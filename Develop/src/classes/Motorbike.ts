import Vehicle from "./Vehicle.js";

class Motorbike extends Vehicle {
  constructor(vin: string, make: string, model: string, weight: number) {
    super();
    this.vin = vin;
    this.make = make;
    this.model = model;
    this.weight = weight;
  }

  wheelie(): void {
    console.log(`${this.make} ${this.model} is doing a wheelie!`);
  }

  override printDetails(): void {
    console.log(`Motorbike - VIN: ${this.vin}, Make: ${this.make}, Model: ${this.model}, Weight: ${this.weight} lbs`);
  }
}

export default Motorbike;

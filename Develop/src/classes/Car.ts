import Vehicle from "./Vehicle.js";

class Car extends Vehicle {
  constructor(vin: string, make: string, model: string, weight: number) {
    super();
    this.vin = vin;
    this.make = make;
    this.model = model;
    this.weight = weight;
  }

  override printDetails(): void {
    console.log(`Car - VIN: ${this.vin}, Make: ${this.make}, Model: ${this.model}, Weight: ${this.weight} lbs`);
  }
}

export default Car;

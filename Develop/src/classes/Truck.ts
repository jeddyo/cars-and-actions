import Vehicle from "./Vehicle.js";

class Truck extends Vehicle {
  towingCapacity: number;

  constructor(vin: string, make: string, model: string, weight: number, towingCapacity: number) {
    super();
    this.vin = vin;
    this.make = make;
    this.model = model;
    this.weight = weight;
    this.towingCapacity = towingCapacity;
  }

  tow(vehicle: Vehicle): void {
    if (vehicle === this) {
      console.log("A truck cannot tow itself.");
    } else if (vehicle.weight <= this.towingCapacity) {
      console.log(`Towing ${vehicle.make} ${vehicle.model} weighing ${vehicle.weight} lbs.`);
    } else {
      console.log(`${vehicle.make} ${vehicle.model} is too heavy to tow.`);
    }
  }

  override printDetails(): void {
    console.log(
      `Truck - VIN: ${this.vin}, Make: ${this.make}, Model: ${this.model}, Weight: ${this.weight} lbs, Towing Capacity: ${this.towingCapacity} lbs`
    );
  }
}

export default Truck;

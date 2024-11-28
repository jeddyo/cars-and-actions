import inquirer from "inquirer";
import Car from "./Car.js";
import Truck from "./Truck.js";
import Motorbike from "./Motorbike.js";
import Vehicle from "./Vehicle.js";

class Cli {
  vehicles: Vehicle[];
  selectedVehicleVin: string | undefined;

  constructor(vehicles: Vehicle[]) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action", // Ensure this name matches how it's accessed in answers
          message:
            "Would you like to create a new vehicle or select an existing vehicle?",
          choices: ["Create a new vehicle", "Select an existing vehicle", "Exit"],
        },
      ])
      .then((answers) => {
        console.log("Prompt Result:", answers); // Debugging: log the answers object
        if (answers.action === "Create a new vehicle") {
          this.createVehicle();
        } else if (answers.action === "Select an existing vehicle") {
          this.chooseVehicle();
        } else {
          console.log("Goodbye!");
        }
      })
      .catch((error) => {
        console.error("Error during prompt:", error); // Catch and log any errors
      });
  }

  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "What type of vehicle would you like to create?",
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === "Car") {
          this.createCar();
        } else if (answers.vehicleType === "Truck") {
          this.createTruck();
        } else if (answers.vehicleType === "Motorbike") {
          this.createMotorbike();
        }
      })
      .catch((error) => {
        console.error("Error during vehicle creation:", error); // Catch and log any errors
      });
  }

  createCar(): void {
    inquirer
      .prompt([
        { type: "input", name: "make", message: "Enter the car's make:" },
        { type: "input", name: "model", message: "Enter the car's model:" },
        { type: "input", name: "weight", message: "Enter the car's weight (lbs):" },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.make,
          answers.model,
          parseInt(answers.weight)
        );
        this.vehicles.push(car);
        console.log("Car created successfully!");
        this.startCli();
      })
      .catch((error) => {
        console.error("Error during car creation:", error); // Catch and log any errors
      });
  }

  createTruck(): void {
    inquirer
      .prompt([
        { type: "input", name: "make", message: "Enter the truck's make:" },
        { type: "input", name: "model", message: "Enter the truck's model:" },
        { type: "input", name: "weight", message: "Enter the truck's weight (lbs):" },
        { type: "input", name: "towingCapacity", message: "Enter the towing capacity (lbs):" },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.make,
          answers.model,
          parseInt(answers.weight),
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        console.log("Truck created successfully!");
        this.startCli();
      })
      .catch((error) => {
        console.error("Error during truck creation:", error); // Catch and log any errors
      });
  }

  createMotorbike(): void {
    inquirer
      .prompt([
        { type: "input", name: "make", message: "Enter the motorbike's make:" },
        { type: "input", name: "model", message: "Enter the motorbike's model:" },
        { type: "input", name: "weight", message: "Enter the motorbike's weight (lbs):" },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.make,
          answers.model,
          parseInt(answers.weight)
        );
        this.vehicles.push(motorbike);
        console.log("Motorbike created successfully!");
        this.startCli();
      })
      .catch((error) => {
        console.error("Error during motorbike creation:", error); // Catch and log any errors
      });
  }

  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on:",
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      })
      .catch((error) => {
        console.error("Error during vehicle selection:", error); // Catch and log any errors
      });
  }

  performActions(): void {
    const selectedVehicle = this.vehicles.find(
      (vehicle) => vehicle.vin === this.selectedVehicleVin
    );

    if (!selectedVehicle) {
      console.log("No vehicle selected.");
      this.startCli();
      return;
    }

    const actions = [
      "Print details",
      "Start vehicle",
      "Accelerate 5 MPH",
      "Decelerate 5 MPH",
      "Stop vehicle",
      "Turn right",
      "Turn left",
      "Reverse",
      "Return to main menu",
      "Exit",
    ];

    if (selectedVehicle instanceof Truck) {
      actions.splice(7, 0, "Tow a vehicle (Truck only)");
    } else if (selectedVehicle instanceof Motorbike) {
      actions.splice(7, 0, "Do a wheelie (Motorbike only)");
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "What would you like to do?",
          choices: actions,
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          case "Print details":
            selectedVehicle.printDetails();
            break;
          case "Start vehicle":
            selectedVehicle.start();
            break;
          case "Accelerate 5 MPH":
            selectedVehicle.accelerate(5);
            break;
          case "Decelerate 5 MPH":
            selectedVehicle.decelerate(5);
            break;
          case "Stop vehicle":
            selectedVehicle.stop();
            break;
          case "Turn right":
            selectedVehicle.turn("right");
            break;
          case "Turn left":
            selectedVehicle.turn("left");
            break;
          case "Reverse":
            selectedVehicle.reverse();
            break;
          case "Tow a vehicle (Truck only)":
            if (selectedVehicle instanceof Truck) {
              this.findVehicleToTow(selectedVehicle);
              return; // Prevents re-prompting the action menu immediately
            } else {
              console.log("This action is only available for trucks.");
            }
            break;
          case "Do a wheelie (Motorbike only)":
            if (selectedVehicle instanceof Motorbike) {
              selectedVehicle.wheelie();
            } else {
              console.log("This action is only available for motorbikes.");
            }
            break;
          case "Return to main menu":
            this.startCli();
            return;
          case "Exit":
            console.log("Exiting the program. Goodbye!");
            return;
        }

        this.performActions();
      })
      .catch((error) => {
        console.error("Error during action selection:", error); // Catch and log any errors
      });
  }

  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTow",
          message: "Select a vehicle to tow:",
          choices: this.vehicles
            .filter((vehicle) => vehicle.vin !== truck.vin) // Exclude the truck itself
            .map((vehicle) => ({
              name: `${vehicle.make} ${vehicle.model} (${vehicle.weight} lbs)`,
              value: vehicle.vin,
            })),
        },
      ])
      .then((answers) => {
        const vehicleToTow = this.vehicles.find(
          (vehicle) => vehicle.vin === answers.vehicleToTow
        );

        if (!vehicleToTow) {
          console.log("No vehicle selected.");
        } else if (vehicleToTow.weight <= truck.towingCapacity) {
          console.log(
            `Towing ${vehicleToTow.make} ${vehicleToTow.model} weighing ${vehicleToTow.weight} lbs.`
          );
        } else {
          console.log(
            `${vehicleToTow.make} ${vehicleToTow.model} is too heavy to tow.`
          );
        }

        this.performActions();
      })
      .catch((error) => {
        console.error("Error during towing:", error); // Catch and log any errors
      });
  }
}

export default Cli;

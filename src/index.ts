import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { fetchSolarSystemBodiesStateVectors } from "src/cli/horizons";

export const main = async (args: string[] = process.argv) => {
  const argv = yargs(hideBin(args))
    .option("body_ids", {
      describe:
        "Comma separated list of the celestial bodies you want to fetch state vectors for.",
      type: "string",
      demandOption: true,
    })
    .option("center", {
      describe: "The origin of the coordinate system.",
      type: "string",
      demandOption: true,
    })
    .option("start_time", {
      describe: "Specifies ephemeris start time",
      type: "string",
      demandOption: true,
    })
    .option("stop_time", {
      describe: "Specifies ephemeris stop time",
      type: "string",
      demandOption: true,
    })
    .option("step_size", {
      describe:
        "Ephemeris output print step. Can be fixed time, uniform interval (unitless), calendar steps, or plane-of-sky angular change steps.",
      type: "string",
      demandOption: true,
    })
    .option("output_units", {
      describe:
        "Selects output units for distance and time; for example, AU-D selects astronomical units (au) and days (d)",
      type: "string",
      demandOption: true,
    })
    .parseSync();

  await fetchSolarSystemBodiesStateVectors({
    bodyIds: argv.body_ids,
    center: argv.center,
    startTime: argv.start_time,
    stopTime: argv.stop_time,
    stepSize: argv.step_size,
    outputUnits: argv.output_units,
  });
};

if (require.main === module) {
  main();
}

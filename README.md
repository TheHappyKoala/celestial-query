# celestial-query

Query the state vectors of solar system bodies using NASA's Horizons API.

## Installation

```bash
npm install celestial-query
```

## Usage

### CLI

```bash
celestial-query \
  --body_ids "399" \
  --center "500@0" \
  --start_time "2006-01-01" \
  --stop_time "2006-01-20" \
  --step_size "1d" \
  --output_units "AU-D"
```

**Options:**

- `--body_ids` - **Target object(s).** Comma-separated list of celestial body IDs or search strings. Major bodies use numeric codes (399=Earth, 499=Mars, 599=Jupiter). Small bodies (asteroids/comets) can be specified by number (e.g., "433" for Eros), designation (e.g., "2015 HM10"), or name (e.g., "Halley"). See [major body codes](https://ssd.jpl.nasa.gov/horizons/manual.html#select) for reference.

- `--center` - **Coordinate system origin** (the observer location). Specify where you're observing from:
  - Barycenters: `0` or `ssb` (solar system barycenter), `3` (Earth-Moon barycenter)
  - Body centers: `10` or `sun` (Sun), `399` (Earth center), `500@0` (solar system barycenter)
- `--start_time` - **Ephemeris start time.** Accepts multiple formats:

  - Calendar: `2006-Jan-01`, `2027-May-5 12:30:23.334`
  - Julian Day: `JD 2451545.0`
  - Day-of-year: `2022-117//11:15`
  - Ancient dates: `278bc-jan-12 12:34`

- `--stop_time` - **Ephemeris stop time.** Same format options as start_time.

- `--step_size` - **Output time interval.** Determines spacing between ephemeris entries:

  - Fixed steps: `1d` (1 day), `2h` (2 hours), `30 min` (30 minutes)
  - Calendar steps: `1 month`, `1 year` (follows calendar dates)
  - Unitless integer: divides time span into N equal parts (e.g., `100` for 100 intervals)

- `--output_units` - **Distance and time units** for output:
  - `AU-D` - Astronomical Units and Days (default for planetary work)
  - `KM-S` - Kilometers and Seconds
  - `KM-D` - Kilometers and Days

**Example - Multiple Bodies:**

```bash
celestial-query \
  --body_ids "399,499,599" \
  --center "500@0" \
  --start_time "2025-01-01" \
  --stop_time "2025-01-31" \
  --step_size "1d" \
  --output_units "AU-D"
```

**Common Body IDs:**

| Code | Body    | Code | Body    |
| ---- | ------- | ---- | ------- |
| 10   | Sun     | 399  | Earth   |
| 199  | Mercury | 499  | Mars    |
| 299  | Venus   | 599  | Jupiter |
| 301  | Moon    | 699  | Saturn  |

For a complete list, see the [Horizons documentation](https://ssd.jpl.nasa.gov/horizons/manual.html#select).

## Output Format

The tool returns state vectors in JSON format:

```json
{
  "name": "Earth",
  "stateVectors": [
    {
      "date": "2006-Jan-01",
      "time": "00:00:00.0000",
      "position": { "x": 1.0, "y": 2.0, "z": 3.0 },
      "velocity": { "x": 0.001, "y": 0.002, "z": 0.003 }
    }
  ]
}
```

## License

GNU General Public License v3.0

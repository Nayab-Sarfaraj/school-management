import pool from "../db/pool.js";

function haversine(lat1, lon1, lat2, lon2) {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export const getSchools = async (req, res) => {
  try {
    const latitude = parseFloat(req.query.latitude);
    const longitude = parseFloat(req.query.longitude);

    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        success: false,
        message: "Valid latitude and longitude are required.",
      });
    }

    const [rows] = await pool.query("SELECT * FROM schools");

    rows.forEach((school) => {
      school.distance = haversine(
        latitude,
        longitude,
        school.latitude,
        school.longitude
      );
    });

    rows.sort((a, b) => a.distance - b.distance);

    return res.status(200).json({
      success: true,
      message: "Fetched successfully",
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || latitude == null || longitude == null) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (name, address, latitude, longitude) are required.",
      });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (!isFinite(lat) || !isFinite(lon)) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude must be valid floating point numbers.",
      });
    }

    const query =
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    await pool.query(query, [name, address, lat, lon]);

    return res.status(201).json({
      success: true,
      message: "School added successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

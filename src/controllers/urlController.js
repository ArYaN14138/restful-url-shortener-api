const shortid = require("shortid");
const Url = require("../models/Url");

const shortenUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        message: "URL is required",
      });
    }

    const shortCode = shortid.generate();

    const newUrl = await Url.create({
      originalUrl: url,
      shortCode,
    });

    res.status(201).json({
      success: true,
      shortCode,
      shortUrl: `http://localhost:5000/${shortCode}`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const { code } = req.params;

    const url = await Url.findOne({ shortCode: code });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    url.clicks += 1;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
};
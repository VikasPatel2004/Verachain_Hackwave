import cors = require('cors');
import mongoose = require('mongoose');
import jwt = require('jsonwebtoken');
import { UserModel } from './Models/db';
import * as dotenv from 'dotenv';
import express,{Request,Response} from "express";
import Sentiment from "sentiment";



// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/verachain';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error: any) => console.error('MongoDB connection error:', error));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Validate environment variables
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  console.error(
    "Missing required environment variables: MONGODB_URI or JWT_SECRET"
  );
  process.exit(1);
}

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// interface SeaAssessRequest {
//   placeName: string; // country name from frontend
// }

// Function to get coordinates from country name
// async function getCoordinatesByPlace(placeName: string): Promise<{ lat: number; lon: number }> {
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
//       placeName
//     )}&appid=${OPENWEATHER_API_KEY}`;

//   const response = await fetch(url, {
//     headers: {
//       "User-Agent": "VeraChain/1.0 (drishtishrivastava2627@gmail.com)" // Required by Nominatim usage policy
//     }
//   });

//   if (!response.ok) throw new Error("Failed to fetch geocoding data");

//   const data = await response.json();

//   console.log(data);

//   if (data.length === 0) throw new Error("Place not found");

//   return {
//     lat: parseFloat(data[0].lat),
//     lon: parseFloat(data[0].lon),
//   };
// }


interface SeaAssessRequest {
  placeName: string; // Place name from frontend
}

app.post("/sea/assess", async (req: Request, res: Response) => {
  try {
    const { placeName } = req.body as SeaAssessRequest;

    if (!placeName || typeof placeName !== "string") {
      return res.status(400).json({ error: "Place name is required and must be a string" });
    }

    // 1. Fetch weather data from OpenWeatherAPI
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      placeName
    )}&appid=${OPENWEATHER_API_KEY}`;
    const weatherResp = await fetch(weatherUrl);

    if (!weatherResp.ok) throw new Error("Error fetching weather data");
    const weatherData = await weatherResp.json();

    console.log("Weather Data:", weatherData);

    // 2. Send weather data to Gemini for risk assessment
    const geminiPayload = {
      contents: [
        {
          parts: [
            {
              text: `Analyze this forecast for risks and disruptions and give us 4-5 crisp points summarising the result of the prompt. Do not be vague, be very specific. Also at the end recommend whether we should send our package or not. Additionally, provide a risk score between -10 to 10 and a corresponding color code for the risk level: ${JSON.stringify(
                weatherData
              )}`,
            },
          ],
        },
      ],
    };

    const geminiResp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(geminiPayload),
      }
    );

    const geminiData = await geminiResp.json();
    console.log("Gemini Response:", geminiData);

    if (!geminiResp.ok) {
      throw new Error(`Gemini API Error: ${geminiData.error?.message || "Unknown error"}`);
    }

    // 3. Extract Gemini AI analysis text, risk score, and assign color code based on risk level
    const geminiAssessment =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "No assessment received";
    const riskScore = geminiData?.candidates?.[0]?.content?.parts?.[0]?.riskScore || 0; // Default to 0 if not provided

    // Assign color code based on risk score
    let colorCode = "gray"; // Default color
    if (riskScore <= -5) {
      colorCode = "green"; // Least risk
    } else if (riskScore > -5 && riskScore <= 5) {
      colorCode = "yellow"; // Mid risk
    } else if (riskScore > 5) {
      colorCode = "red"; // High risk
    }

    // 4. Return the response with risk level and color code
    res.json({
      placeName,
      weatherData,
      geminiAssessment: JSON.stringify(geminiAssessment),
      riskScore, // Risk score provided by Gemini
      colorCode, // Color code based on risk score
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message || "Internal server error" });
  }
});


app.post("/suppliers/risk-analysis", async (req: Request, res: Response) => {
  try {
    const { locationA, locationB } = req.body as {
      
      locationA: string;
      locationB: string;
    };

    if (!locationA || !locationB) {
      return res.status(400).json({ error: "Both locationA and locationB are required." });
    }

    const results = await Promise.all(
      suppliers.map(async (supplier) => {
        // Fetch weather data for the supplier's location
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          supplier.location
        )}&appid=${OPENWEATHER_API_KEY}`;
        const weatherResp = await fetch(weatherUrl);

        if (!weatherResp.ok) throw new Error(`Error fetching weather data for ${supplier.location}`);
        const weatherData = await weatherResp.json();

        // Send weather data to Gemini for risk assessment
        const geminiPayload = {
          contents: [
            {
              parts: [
                {
                  text: `Analyze the following supplier's details and weather data to calculate the risk percentage for transporting goods from ${locationA} to ${locationB}. Supplier details: ${JSON.stringify(
                    supplier
                  )}, Weather data: ${JSON.stringify(weatherData)}`,
                },
              ],
            },
          ],
        };

        const geminiResp = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(geminiPayload),
          }
        );

        if (!geminiResp.ok) {
          throw new Error(`Error fetching analysis from Gemini for ${supplier.name}`);
        }

        const geminiData = await geminiResp.json();
        const riskPercentage = geminiData?.candidates?.[0]?.content?.parts?.[0]?.riskPercentage || 100; // Default to 100% if not provided

        return {
          ...supplier,
          riskPercentage,
        };
      })
    );

    // Find the supplier with the least risk percentage
    const bestSupplier = results.reduce((best, current) => {
      return current.riskPercentage < (best as any).riskPercentage ? current : best;
    }, results[0]);

    res.json({
      suppliers: results,
      bestSupplier,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message || "Internal server error" });
  }
});
interface SupplierInterface {
  name: string;
  cost: number;
  ratings: number;
  reviews: number;
  location: string;
}

interface SupplierAnalysisResult {
  supplier: string;
  cost: string;
  ratings: number;
  reviews: number;
  riskPercentage: number;
  score: number;
  analysis: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

const suppliers: SupplierInterface[] = [
  {
    name: "Reliable Transports",
    cost: 50000,
    ratings: 1.0,
    reviews: 5,
    location: "Delhi",
  },
  {
    name: "Speedy Logistics",
    cost: 55000,
    ratings: 3.0,
    reviews: 1,
    location: "Mumbai",
  },
  {
    name: "Quick Haulers",
    cost: 48000,
    ratings: 4.2, // fixed (was 7.0)
    reviews: 3,
    location: "Bangalore",
  },
  {
    name: "Safe Cargo Movers",
    cost: 52000,
    ratings: 4.8, // fixed (was 9.0)
    reviews: 2,
    location: "Chennai",
  },
];


// Calculate risk percentage based on cost, ratings, and reviews
// function calculateRiskPercentage(
//   supplier: SupplierInterface
// ): SupplierAnalysisResult {
//   const costValue = supplier.cost; // Directly use the cost as a number
//   const ratings = supplier.ratings;
//   const reviews = supplier.reviews;

//   if (ratings < 0 || ratings > 10) {
//     throw new Error(
//       `Invalid rating value: ${ratings}. Must be between 0 and 10`
//     );
//   }

//   if (reviews < 0) {
//     throw new Error(`Invalid review count: ${reviews}. Must be non-negative`);
//   }

//   const costWeight = 0.5;
//   const ratingWeight = 0.3;
//   const reviewWeight = 0.2;

//   const minCost = 40000;
//   const maxCost = 60000;
//   const normalizedCost = Math.max(
//     0,
//     Math.min(100, ((costValue - minCost) / (maxCost - minCost)) * 100)
//   );
//   const normalizedRating = (10 - ratings) * 10;
//   const normalizedReviews =
//     reviews === 0 ? 100 : Math.max(0, Math.min(100, (1 / (reviews + 1)) * 100));

//   const weightedRiskScore =
//     costWeight * normalizedCost +
//     ratingWeight * normalizedRating +
//     reviewWeight * normalizedReviews;

//   const overallScore = 100 - weightedRiskScore;
//   const riskPercentage = weightedRiskScore;

//   let analysis: string;
//   if (riskPercentage < 30) {
//     analysis =
//       "Low risk - Excellent choice with good balance of cost and quality";
//   } else if (riskPercentage < 60) {
//     analysis = "Medium risk - Reasonable option with some trade-offs";
//   } else {
//     analysis = "High risk - Consider alternatives or negotiate better terms";
//   }

//   analysis += `. Cost: ₹${costValue.toLocaleString()}, Rating: ${ratings}/10, Reviews: ${reviews}`;

//   return {
//     supplier: supplier.name,
//     cost: costValue.toLocaleString(), // Convert number to string for display
//     ratings: supplier.ratings,
//     reviews: supplier.reviews,
//     riskPercentage: Math.round(riskPercentage * 100) / 100,
//     score: Math.round(overallScore * 100) / 100,
//     analysis: analysis,
//   };
// }

// // Route to analyze suppliers using basic maths and logic
// app.post(
//   "/api/analyze-suppliers",
//   async (req: any, res: any): Promise<void> => {
//     try {
//       const analysisResults: SupplierAnalysisResult[] = Suppliers.map(
//         (supplier) => calculateRiskPercentage(supplier)
//       );

//       // Sort by risk percentage (ascending - lower risk is better)
//       analysisResults.sort((a, b) => a.riskPercentage - b.riskPercentage);

//       // Find the best supplier (lowest risk percentage)
//       const bestSupplier = analysisResults[0];

//       const response: ApiResponse = {
//         success: true,
//         data: {
//           allSuppliers: analysisResults,
//           bestSupplier: bestSupplier,
//           analysisDate: new Date().toISOString(),
//           analysisMethod:
//             "Basic mathematical risk assessment using cost, ratings, and reviews",
//         },
//       };

//       res.json(response);
//     } catch (error: unknown) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Unknown error occurred";
//       console.error("Error in supplier analysis:", errorMessage);

//       const response: ApiResponse = {
//         success: false,
//         message: "Failed to analyze suppliers",
//         error: errorMessage,
//       };

//       res.status(500).json(response);
//     }
//   }
// );

// // Get supplier analysis with detailed breakdown
// app.get(
//   "/api/supplier-analysis",
//   async (req: any, res: any): Promise<void> => {
//     try {
//       const analysisResults: SupplierAnalysisResult[] = Suppliers.map(
//         (supplier) => calculateRiskPercentage(supplier)
//       );

//       // Sort by risk percentage (ascending - lower risk is better)
//       analysisResults.sort((a, b) => a.riskPercentage - b.riskPercentage);

//       // Fetch risk factor from OpenWeatherAPI
//       const weatherApiKey = process.env.OPENWEATHER_API_KEY;
//       if (!weatherApiKey) {
//         throw new Error("Missing OpenWeatherAPI key in environment variables");
//       }

      // const weatherResponse = await axios.get(
      //   `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${weatherApiKey}`
      // );

      // const weatherRiskFactor = weatherResponse.data.main.temp / 100; // Example calculation based on temperature

      // // Fetch news data from News API
      // const newsApiKey = process.env.NEWS_API_KEY;
      // if (!newsApiKey) {
      //   throw new Error("Missing News API key in environment variables");
      // }

      // const newsResponse = await axios.get(
      //   `https://newsapi.org/v2/everything?q=logistics&apiKey=${newsApiKey}`
      // );

      // const articles = newsResponse.data.articles;
      // const sentiment = new Sentiment();

      // Calculate average sentiment score for the articles
      // const sentimentScores = articles.map((article: any) => {
      //   const analysis = sentiment.analyze(
      //     article.title + " " + article.description
      //   );
      //   return analysis.score;
      // });

      // const averageSentimentScore =
      //   sentimentScores.length > 0
      //     ? sentimentScores.reduce(
      //         (sum: number, score: number) => sum + score,
      //         0
      //       ) / sentimentScores.length
      //     : 0;

      // const sentimentRiskFactor = 1 + averageSentimentScore / 10; // Adjust risk factor based on sentiment

      // Adjust risk scores based on weather and sentiment risk factors
      // const adjustedResults = analysisResults.map((result) => {
      //   const adjustedRiskPercentage =
      //     result.riskPercentage * weatherRiskFactor * sentimentRiskFactor;
      //   return {
      //     ...result,
      //     riskPercentage: Math.round(adjustedRiskPercentage * 100) / 100,
      //     analysis: `${result.analysis} Adjusted for weather risk factor: ${weatherRiskFactor.toFixed(
      //       2
      //     )}, sentiment risk factor: ${sentimentRiskFactor.toFixed(2)}`,
      //   };
      // });

      // // Ensure adjustedResults is not empty before finding the best supplier
      // if (adjustedResults.length === 0) {
      //   throw new Error("No suppliers available for analysis");
      // }

      // Find the best supplier (lowest risk percentage)
    //   const bestSupplier = adjustedResults.reduce((best, current) => {
    //     return current.riskPercentage < best.riskPercentage ? current : best;
    //   }, adjustedResults[0] as SupplierAnalysisResult);

    //   const response: ApiResponse = {
    //     success: true,
    //     data: {
    //       suppliers: adjustedResults,
    //       totalSuppliers: adjustedResults.length,
    //       bestSupplier: bestSupplier,
    //       weatherRiskFactor: weatherRiskFactor.toFixed(2),
    //       sentimentRiskFactor: sentimentRiskFactor.toFixed(2),
    //       analysisDate: new Date().toISOString(),
    //     },
    //   };

    //   res.json(response);
    // } catch (error: unknown) {
    //   const errorMessage =
    //     error instanceof Error ? error.message : "Unknown error occurred";
    //   console.error("Error getting supplier analysis:", errorMessage);

//       const response: ApiResponse = {
//         success: false,
//         message: "Failed to get supplier analysis",
//         error: errorMessage,
//       };

//       res.status(500).json(response);
//     }
//   }
// );

// Get analysis for a specific supplier

/*
app.get(
  "/api/analyze-supplier/:name",
  async (req: any, res: any): Promise<void> => {
    try {
      const supplierName = req.params.name || "";
      const supplier = Suppliers.find(
        (s) => s.name.toLowerCase() === supplierName.toLowerCase()
      );

      if (!supplier) {
        const response: ApiResponse = {
          success: false,
          message: "Supplier not found",
        };
        res.status(404).json(response);
        return;
      }

      const analysis = calculateRiskPercentage(supplier);

      const response: ApiResponse = {
        success: true,
        data: analysis,
      };

      res.json(response);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Error analyzing specific supplier:", errorMessage);

      const response: ApiResponse = {
        success: false,
        message: "Failed to analyze supplier",
        error: errorMessage,
      };

      res.status(500).json(response);
    }
  }
);

// Get all suppliers (for reference)
app.get("/api/suppliers", async (req: any, res: any): Promise<void> => {
  try {
    const response: ApiResponse = {
      success: true,
      data: Suppliers,
    };

    res.json(response);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error getting suppliers:", errorMessage);

    const response: ApiResponse = {
      success: false,
      message: "Failed to get suppliers",
      error: errorMessage,
    };

    res.status(500).json(response);
  }
});
*/

// Authentication Routes

// Register endpoint
app.post('/api/auth/register', async (req: any, res: any) => {
  try {
    const { email, username, password, role } = req.body;

    // Validate input
    if (!email || !username || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!['consumer', 'supplier'].includes(role)) {
      return res.status(400).json({ message: 'Role must be either consumer or supplier' });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email or username' });
    }

    // Create new user
    const user = new UserModel({ email, username, password, role });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find user by username or email
    const user = await UserModel.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!user) {
      const errorResponse = { 
        success: false,
        message: 'Invalid credentials',
        error: 'Invalid username or password'
      };
      console.log('Login failed - user not found:', errorResponse);
      return res.status(401).json(errorResponse);
    }

    // Check password
    const isPasswordValid = await (user as any).comparePassword(password);
    if (!isPasswordValid) {
      const errorResponse = { 
        success: false,
        message: 'Invalid credentials',
        error: 'Invalid username or password'
      };
      console.log('Login failed - invalid password:', errorResponse);
      return res.status(401).json(errorResponse);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Temporary endpoint to fetch all users for debugging
app.get('/api/users', async (req: any, res: any) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Get current user endpoint
app.get('/api/auth/me', async (req: any, res: any) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = await UserModel.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Health check endpoint
// app.get('/api/health', (req: any, res: any) => {
//   res.json({ status: 'OK', message: 'Server is running' });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

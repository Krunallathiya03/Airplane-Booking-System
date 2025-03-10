const bookingModel = require("../Models/bookingModel");
const flightModel = require("../Models/flightModel");
const userModel = require("../Models/userModel");

const getAnalyticsController = async(req,res) => {
    try{
      // ---------------------------Total Revenue-------------------------------

        const totalRevenue = await bookingModel.aggregate([
            {
                $match: {
                  status: "Booked"
                }
              },
              {
                $group: {
                  _id: null,
                  total: {
                    $sum: "$totalAmount"
                  }
                }
              }
        ]);

        // -------------------------------Total Booking--------------------------------

        const totalBooking = await bookingModel.countDocuments();

        // -----------------------------------Total Users--------------------------------------

        const totalUsers = await userModel.countDocuments();

        // ---------------------------------Most Booked Flights-------------------------------------

        const mostbookedflight = await bookingModel.aggregate([
          [
            {
              $group: {
                _id: "$flight",
                count: { $sum: 1 }
              }
            },
            {
              $sort: {
                count: -1
              }
            },
            {
              $limit: 5
            },
            {
              $lookup: {
                from: "flights",
                localField: "_id",
                foreignField: "_id",
                as: "flight"
              }
            },
            {
              $unwind: "$flight"
            }
          ]
        ])





        res.status(200).json({
            totalRevenue,
            totalBooking,
            totalUsers,
            mostbookedflight
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Error In Get Analytics Api.....",error});
    }
}

module.exports = {getAnalyticsController}
import * as validation from '../validation.mjs';
import * as util from '../utils.mjs';
import * as globals from '../globals.mjs';

// db is an argument to this function so
// that we can make db queries inside
export default function initTripsController(db) {
  const index = (request, response) => {
    db.Trip.findAll()
      .then((trips) => {
        response.send({ trips });
      })
      .catch((error) => console.log(error));
  };

  const create = async (request, response) => {
    const tripInfo = request.body;
    const validatedTripInfo = validation.validateTripInfo(tripInfo);
    const invalidRequests = util.getInvalidFormRequests(validatedTripInfo);
    try {
      if (invalidRequests.length > 0) {
        throw new Error(globals.INVALID_TRIP_REQUEST_MESSAGE);
      }
      // get the hashed password as output from the SHA object
      const trip = await db.Trip.findOne({
        where: {
          name: validatedTripInfo.name,
        },
      });

      if (trip) {
        throw new Error(globals.TRIP_EXISTS_ERROR_MESSAGE);
      }
      const newTrip = await db.Trip.create({
        name: validatedTripInfo.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const successMessage = 'You have created a trip successfully!';
      response.send({
        id: newTrip.id,
        message: successMessage,
        name: newTrip.name,
      });
    } catch (error) {
      const errorMessage = error.message;

      const resObj = {
        error: errorMessage,
        message: errorMessage,
        ...validatedTripInfo,
      };
      response.send(resObj);
    }
  };

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    index,
    create,
  };
}

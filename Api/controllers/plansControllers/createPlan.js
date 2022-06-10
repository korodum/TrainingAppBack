const { createPlanQuery } = require('../../db/planQueries/createPlanQuery');

const { generateError } = require('../../helpers');

const createPlan = async (req, res, next) => {
  try {
    const { name, muscleGroup, trainerId, userId } = req.body;

    if(!name || !muscleGroup || !trainerId || !userId) throw generateError('Fill all fields',400);

    await createPlanQuery( name, muscleGroup, trainerId, userId );
    res.send({
      status: 'ok',
      message:`the plan ${name} has been created`
    })
  } catch (error) {
    next(error);
  }
}

module.exports = {createPlan}
const getAllOpportunities = require('../queries/opportunity/get_all_opportunities');
const getOpportunity = require('../queries/opportunity/get_opportunity');
const createOpportunity = require('../queries/opportunity/create_opportunity');
const removeOpportunity = require('../queries/opportunity/remove_opportunity');
const updateOpportunity = require('../queries/opportunity/update_opportunity');
const getMyOpportunities = require('../queries/opportunity/get_my_opportunities');
const getIsCreator = require('../queries/opportunity/get_is_creator');

// /opportunities/ => return all users opportunities
const index = (req, res, next) => {
  getAllOpportunities()
    .then((opportunities) => res.json(opportunities))
    .catch(next);
}

// /opportunities/:id => return individual opportunity
const show = (req, res, next) => {
  const { id } = req.params
  getOpportunity(id)
    .then(o => {
      if(o === null) return res.status(404).send({error: 'Record not found'});
      res.json(o);
    })
    .catch(next);
}

// /opportunities => create a opportunity
const create = (req, res, next) => {
  const currentUser = req.user;
  const opportunity = req.body;

  createOpportunity(currentUser, opportunity)
    .then(o => res.json(o))
    .catch(next);
}

// /opportunities/:id => remove a opportunity
const remove = (req, res, next) => {
  const currentUser = req.user;
  const id = req.params.id;

  removeOpportunity(currentUser, id)
    .then(data => res.json(data))
    .catch(next);
}

// /opportunities/:id => update a opportunity
const update = (req, res, next) => {
  const currentUser = req.user;
  const opportunity = req.body.opportunity;
  const _id = req.body._id;

  updateOpportunity(currentUser, opportunity, _id)
    .then(data => res.json(data))
    .catch(next);
}

const myOpportunities = (req, res, next) => {
  const currentUser = req.user;
  getMyOpportunities(currentUser)
    .then(data => res.json(data.opportunities))
    .catch(next);
}

const isCreator = (req, res, next) => {
  const currentUser = req.user;
  const id = req.params.id;

  getIsCreator(currentUser, id)
    .then(data => res.json(data))
    .catch(next);
}

module.exports = {
  index,
  show,
  create,
  remove,
  update,
  myOpportunities,
  isCreator
};

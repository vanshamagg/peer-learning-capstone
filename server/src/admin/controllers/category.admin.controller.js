/**
 *      controllers for /admin/category
 */

import { Category } from '../../models';
/**
 * add a new category
 */
async function add(req, res) {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.json(category);
    console.log(Object.keys(category.__proto__));
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}

/**
 *  to remove a category
 */
async function remove(req, res) {
  try {
    const cid = req.params.id;
    const category = await Category.findByPk(cid);
    await category.destroy();
    return res.json({ message: `category id ${category.id} ${category.name} has been destroyed!` });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
}
/**
 * update a category
 */
async function update(req, res) {
  try {
    const { name, description } = req.body;
    const cid = req.params.id;

    // update
    await Category.update(
      {
        name,
        description,
      },
      {
        where: {
          id: cid,
        },
      },
    );
    return res.json({ message: 'category updated' });
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
}

/**
 * get all the categories from the database
 */
async function getAll(req, res) {
  try {
    const list = await Category.findAll({
      attributes: ['id', 'name', 'description'],
    });
    res.send(list);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
}
/**
//  * search for a category from title
//  */
// async function search(req, res) {
//     try {
//         const query = req.query.q;

//     } catch (error) {

//     }
// }
const controllers = {};

controllers.add = add;
controllers.update  = update
controllers.remove = remove;
controllers.getAll = getAll;

export default controllers;

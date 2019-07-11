const { check, validationResult, param, query } = require('express-validator');

class Helper {

  isValidQuery() {
      return [check("term").isLength({
            min: 3
          }).withMessage("Terms must be 3 characters or more"),
          check("definition").isLength({
            min: 10
          }).withMessage("Definitions must be 10 characters or more"),
          check('topic').isLength({
            min: 3
          }).withMessage('Topic must be 3 characters or more'),
          check("code_example").isURL().withMessage("Must be valid URL"),
          check("resources.*").isURL().withMessage('Must be valid URL'),
          check('related_terms.*').isLength({
            min: 3
          }).withMessage('Related terms must be atleast 3 characters long')]
    }

    isValidHex() {
        return [check('id').custom(id => {
            if (!this.checkHex(id)) {
                throw new Error('Invalid Hex')
            } else {
                return true
            }
        })]
    }

    checkHex(id) {
        var regex = new RegExp("^[0-9a-fA-F]{24}$");
        return regex.test(id)
    }


    // some sort of search object constructor?
    generateSearchObject(query, request) {
        const searchObject = {};

        query.map(key => {
            searchObject[key] = request.body[key];
        })
        return searchObject
    }

    isObjectEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

}

module.exports = { Helper };

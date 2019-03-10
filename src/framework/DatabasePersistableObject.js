import databaseHelper from '~/app/databaseHelper';

let promiseRejectionHandler = (error) => {
  console.warn(error.message);
}

let promiseReject = (reason) =>
{
  console.warn(JSON.stringify(reason));
}

class DatabasePersistableObject
{
    async save(){
      let values = this.getClassPersistentValues();
      let keys = this.getClassColumns();
      let insertString = this.createInsertString(keys, this.constructor.getTableName());
      return await databaseHelper.tryQuery(insertString, values.concat(values));
    }

    getClassPersistentValues(){
      return Object.keys(this).map((currentValue) => {
        return this[currentValue];
      });
    }

    getClassColumns(){
      // return Object.keys(this).map((currentValue) => {
      //   return this.getTablePrefix() + currentValue;
      // });
      return Object.keys(this);
    }

    static getTablePrefix()
    {
      return this.getTableName() + "_";
    }

    createInsertString(keys, table)
    {
      let insertString = "";
      let updateString = "";

      keys.forEach((currentValue, index) => {
        updateString += currentValue + " = ?";
        insertString += "?"
        if(index + 1 != keys.length)
        {
          insertString += ","
          updateString += ",";
        }
      });

      return `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${insertString})
                             ON DUPLICATE KEY
                              UPDATE
                                ${updateString};`;
    }

    static getTableName()
    {
      throw {name: "NoTableNameException", message: "The getTableName() function was not overriden in a class that was saved to the database."};
    }

    static async getDistinct(column)
    {
      try
      {
        let results = await databaseHelper.tryQuery(`SELECT DISTINCT ?? FROM ?? ;`, [column, this.getTableName()]);
        results = this.pickPropertyFromResults(results, column);
        return results;
      }
      catch(error)
      {
        promiseRejectionHandler(error);
      }
    }

    static async getObjectsWhere(whereClause, limit)
    {
      let queryString = `SELECT * FROM ${this.getTableName()} WHERE ${whereClause}` + (limit ? `LIMIT ${limit}`: ``) + ";";
      try
      {
        let results = await databaseHelper.tryQuery(queryString, null);
        return this.castResults(results);
      }
      catch(error)
      {
        promiseRejectionHandler(error);
      }
    }

    static createObjects(objectsArray)
    {
      return objectsArray.map((currentValue) => {
        return new this(currentValue);
      });
    }

    static async saveObjects(objects)
    {
      objects.forEach((currentValue) => {
         currentValue.save();
      });
    }

    static createAndSaveObjects(objectsArray)
    {
      let objects = this.createObjects(objectsArray);
      this.saveObjects(objects);
      return objects;
    }

    static async getObjectWhere(whereClause)
    {
      try 
      {
        let results = await this.getObjectsWhere(whereClause, 1);
        return results[0];
      }
      catch(error)
      {
        promiseRejectionHandler(error);
      }
    }

    static async getAllObjects()
    {
      try
      {
        return await this.getObjectsWhere(true);
      }
      catch(error)
      {
        promiseRejectionHandler(error);
      }
    }

    static castResults(results)
    {
      return results.map((currentValue) => {
        return new this(currentValue);
      });
    }

    static pickPropertyFromResults(results, property)
    {
      return results.map((currentValue) => {
        return currentValue[property];
      });
    }

    static getGroupedBy(groupByValues, fields, whereClause = true)
    {
      let queryString = `SELECT ${fields ? fields.join(', ') : '*'} FROM ${this.getTableName()} WHERE ${whereClause} GROUP BY ${groupByValues.join(', ')}`;
      console.log("Running getGroupedBy. Query String: " + queryString);
      return databaseHelper.tryQuery(queryString);
    }
}

export default DatabasePersistableObject;

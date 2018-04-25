import DatabasePersistableObject from '../DatabasePersistableObject';

let promiseRejectionHandler = (error) => {
  console.warn(error.message);
}

class Source extends DatabasePersistableObject{
  constructor(sourceObject){
    super();
    if(sourceObject)
    {
      this.id = sourceObject.id;
      this.name = sourceObject.name;
      this.country = sourceObject.country;
      this.description = sourceObject.description;
      this.category = sourceObject.category;
      this.titleSentiment = sourceObject.titleSentiment;
      this.descriptionSentiment = sourceObject.descriptionSentiment;
    }
  }

  static getTableName(){
    return "source";
  }

  static async getCountries()
  {
    try
    {
      let countries = await this.getDistinct('country');
      return countries;
    }
    catch(error)
    {
      promiseRejectionHandler(error);
    }
  }

  static async getCategories()
  {
    try
    {
      let categories = await this.getDistinct('category');
      return categories;
    }
    catch(error)
    {
      promiseRejectionHandler(error);
    }
  }

}

export default Source;

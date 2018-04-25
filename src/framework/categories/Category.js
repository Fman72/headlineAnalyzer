import DatabasePersistableObject from '../DatabasePersistableObject';

class Category extends DatabasePersistableObject{
  constructor(sourceObject){
    super();
    if(sourceObject)
    {
      this.id = sourceObject.id;
      this.name = sourceObject.name;
      this.sentiment = sourceObject.sentiment;
    }
  }

  static getTableName(){
    return "category";
  }

}

export default Category;

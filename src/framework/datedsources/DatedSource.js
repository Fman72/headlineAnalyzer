import DatabasePersistableObject from '../DatabasePersistableObject';

let promiseRejectionHandler = (error) => {
  console.warn(error.message);
}

import Article from '~/framework/articles/Article';

class DatedSource extends DatabasePersistableObject{
  constructor(sourceObject){
    super();
    if(sourceObject)
    {
      this.source = sourceObject.source;
      this.date = sourceObject.date;
      this.titleSentiment = sourceObject.titleSentiment;
      this.descriptionSentiment = sourceObject.descriptionSentiment;
      this.category = sourceObject.category;
    }
  }

  static getTableName(){
    return "datedsource";
  }

  static async getCategories()
  {
    try
    {
      let categories = await this.getDistinct('category');
      return categories.filter(item => item != null);
    }
    catch(error)
    {
      promiseRejectionHandler(error);
    }
  }

  static async generateDatedSources(after, before)
  {
    let whereClause = [];
    if(before)
    {
      whereClause.push(`UNIX_TIMESTAMP(publishedAt) < ${before}`);
    }
    if(after)
    {
      whereClause.push(`UNIX_TIMESTAMP(publishedAt) > ${after}`);
    }

    if(whereClause.length == 0){
      whereClause = "true";
    }
    else{
      whereClause = whereClause.join(' AND ');
    }
    
    console.log("Generating dated sources. Where clause: " + whereClause);

    try
    {
      let datedSources = await Article.getGroupedBy(['source', 'DATE(publishedAt)', 'category'], ['source', 'DATE(publishedAt) as date', 'category', 'AVG(titleSentiment) as titleSentiment', 'AVG(descriptionSentiment) as descriptionSentiment'], whereClause);
      datedSources.forEach((currentValue) => {
          let datedSource = new this(currentValue);
          datedSource.save();
      });
    }
    catch(error)
    {
      promiseRejectionHandler(error);
    }
  }

}

export default DatedSource;
